import { validate } from "../validation/validation.js";
import {} from "../validation/payment-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { snap } from "../application/midtrans.js";
import { getUserValidation } from "../validation/user-validation.js";
import { getTransactionValidation } from "../validation/transaction-validation.js";
import transactionService from "./transaction-service.js";

const create = async (userId, transactionId) => {
  userId = validate(getUserValidation, userId);
  transactionId = validate(getTransactionValidation, transactionId);

  const cekTrxInDatabase = await prismaClient.transaction.count({
    where: {
      id: transactionId,
      userId,
      status: "created",
    },
  });

  if (cekTrxInDatabase === 0) {
    throw new ResponseError(404, "transaction is not found");
  }

  const transaction = await transactionService.get(userId, transactionId);

  const params = {
    transaction_details: {
      order_id: transaction.id,
      gross_amount: transaction.totalPrice,
    },
    item_details: transaction.transactionRooms.map((trxRoom) => ({
      id: trxRoom.roomId,
      price: trxRoom.roomPrice,
      quantity: trxRoom.roomQty,
      name: trxRoom.roomName,
    })),
    customer_details: {
      first_name: transaction.user.firstName,
      last_name: transaction.user.lastName,
      email: transaction.user.email,
      phone: transaction.user.phone,
    },
    credit_card: {
      secure: true,
    },
  };

  const snapResponse = await snap.createTransaction(params);
  await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data: {
      status: "pending",
      redirect_url: snapResponse.redirect_url,
    },
  });

  return snapResponse;
};

const callback = async (response) => {
  const order_id = response.order_id;
  const transaction_status = response.transaction_status;
  const fraud_status = response.fraud_status;

  const transaction = await prismaClient.transaction.findUnique({
    where: {
      id: order_id,
    },
  });

  if (!transaction) {
    throw new ResponseError(400, "transaction is not found");
  }

  if (transaction.status !== "pending") {
    throw new ResponseError(400, "status is not pending");
  }

  if (transaction.totalPrice !== parseInt(response.gross_amount)) {
    throw new ResponseError(400, "total price is not valid");
  }

  if (transaction_status === "capture") {
    if (fraud_status === "challenge") {
      setTransactionStatus(order_id, "challenge");
    } else if (fraud_status === "accept") {
      setTransactionStatus(order_id, "success");
    }
  } else if (transaction_status === "settlement") {
    setTransactionStatus(order_id, "success");
  } else if (transaction_status === "deny") {
    setTransactionStatus(order_id, "failed");
  } else if (
    transaction_status === "cancel" ||
    transaction_status === "expire"
  ) {
    setTransactionStatus(order_id, "failed");
  } else if (transaction_status === "pending") {
    setTransactionStatus(order_id, "pending");
  }
};

const setTransactionStatus = async (transactionId, status) => {
  await prismaClient.transaction.update({
    where: {
      id: transactionId,
    },
    data: { status },
  });
};

export default { create, callback };
