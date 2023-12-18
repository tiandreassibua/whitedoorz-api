import {
  createTransactionValidation,
  getTransactionValidation,
} from "../validation/transaction-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (userId, request) => {
  userId = validate(getUserValidation, userId);
  request = validate(createTransactionValidation, request);

  if (request.transactionRooms.length === 0) {
    throw new ResponseError(400, "transaction rooms cannot be empty");
  }

  if (
    new Date(request.transaction.checkIn) >=
    new Date(request.transaction.checkOut)
  ) {
    throw new ResponseError(400, "checkIn must be less than checkOut baris 22");
  } else if (new Date(request.transaction.checkIn) < new Date()) {
    throw new ResponseError(400, "checkIn must be greater than today baris 24");
  } else if (new Date(request.transaction.checkOut) < new Date()) {
    throw new ResponseError(
      400,
      "checkOut must be greater than today baris 28"
    );
  } else if (
    new Date(request.transaction.checkOut) <
    new Date(request.transaction.checkIn)
  ) {
    throw new ResponseError(
      400,
      "checkOut must be greater than checkIn baris 36"
    );
  } else if (
    new Date(request.transaction.checkIn) >
    new Date(request.transaction.checkOut)
  ) {
    throw new ResponseError(400, "checkIn must be less than checkOut baris 42");
  }

  const rooms = await prismaClient.room.findMany({
    where: {
      id: {
        in: request.transactionRooms.map((room) => room.roomId),
      },
    },
    select: {
      id: true,
      name: true,
      price: true,
      available: true,
    },
  });

  const notAvailableRooms = [];
  request.transactionRooms.forEach((trxRoom) => {
    const room = rooms.find((room) => room.id === trxRoom.roomId);
    if (!room) {
      throw new ResponseError(400, "room is not found");
    }

    if (!room.available) {
      notAvailableRooms.push(room.name + " is not available");
    }
  });

  if (notAvailableRooms.length > 0) {
    throw new ResponseError(400, notAvailableRooms);
  }

  const totalPrice = rooms.reduce((total, room) => {
    const trxRoom = request.transactionRooms.find(
      (trxRoom) => trxRoom.roomId === room.id
    );

    if (!trxRoom) {
      throw new ResponseError(400, "transaction room is not found");
    }

    return total + room.price;
  }, 0);

  if (totalPrice !== request.transaction.totalPrice) {
    throw new ResponseError(
      400,
      "total price is not valid with sum of rooms price"
    );
  }

  const transaction = await prismaClient.transaction.create({
    data: {
      propertyId: request.transaction.propertyId,
      checkIn: request.transaction.checkIn,
      checkOut: request.transaction.checkOut,
      totalPrice: request.transaction.totalPrice,
      userId,
    },
  });

  await prismaClient.transactionRoom.createMany({
    data: request.transactionRooms.map((room) => ({
      transactionId: transaction.id,
      roomId: room.roomId,
    })),
  });

  return transaction;
};

const index = async (userId) => {
  userId = validate(getUserValidation, userId);

  const trx = await prismaClient.transaction.findMany({
    where: {
      userId,
    },
    include: {
      transactionRoom: {
        include: {
          room: true,
        },
      },
    },
  });

  return [
    ...trx.map((trx) => ({
      id: trx.id,
      userId: trx.userId,
      propertyId: trx.propertyId,
      checkIn: trx.checkIn,
      checkOut: trx.checkOut,
      totalPrice: trx.totalPrice,
      status: trx.status,
      redirect_url: trx.redirect_url,
      transactionRooms: trx.transactionRoom.map((trxRoom) => ({
        id: trxRoom.id,
        roomId: trxRoom.room.id,
        roomQty: trxRoom.roomQty,
        roomName: trxRoom.room.name,
        roomImg: trxRoom.room.image,
        roomPrice: trxRoom.room.price,
        roomMaxPeople: trxRoom.room.maxPeople,
        roomBedQty: trxRoom.room.bedQty,
      })),
    })),
  ];
};

const get = async (userId, transactionId) => {
  userId = validate(getUserValidation, userId);
  transactionId = validate(getTransactionValidation, transactionId);

  const trx = await prismaClient.transaction.findUnique({
    where: { id: transactionId, userId: userId },
    include: {
      transactionRoom: {
        include: {
          room: true,
        },
      },
      user: true,
    },
  });

  if (!trx) {
    throw new ResponseError(404, "transaction is not found");
  }

  return {
    id: trx.id,
    userId: trx.userId,
    propertyId: trx.propertyId,
    checkIn: trx.checkIn,
    checkOut: trx.checkOut,
    totalPrice: trx.totalPrice,
    status: trx.status,
    redirect_url: trx.redirect_url,
    transactionRooms: trx.transactionRoom.map((trxRoom) => ({
      id: trxRoom.id,
      roomId: trxRoom.room.id,
      roomQty: trxRoom.roomQty,
      roomName: trxRoom.room.name,
      roomImg: trxRoom.room.image,
      roomPrice: trxRoom.room.price,
      roomMaxPeople: trxRoom.room.maxPeople,
      roomBedQty: trxRoom.room.bedQty,
    })),
    user: {
      firstName: trx.user.firstName,
      lastName: trx.user.lastName,
      email: trx.user.email,
      phone: trx.user.phone,
    },
  };
};

export default { create, index, get };
