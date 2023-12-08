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
            roomQty: room.roomQty,
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
