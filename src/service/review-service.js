import { validate } from "../validation/validation.js";
import { createReviewValidation } from "../validation/review-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getTransactionValidation } from "../validation/transaction-validation.js";

const create = async (request, transactionId) => {
  const data = validate(createReviewValidation, request);
  transactionId = validate(getTransactionValidation, transactionId);

  const transaction = await prismaClient.transaction.findUnique({
    where: { id: transactionId },
  });

  if (!transaction) {
    throw new ResponseError(404, "transaction is not found");
  }

  const property = await prismaClient.property.findUnique({
    where: { id: transaction.propertyId },
  });

  if (!property) {
    throw new ResponseError(404, "property is not found");
  }

  const reviewExist = await prismaClient.review.count({
    where: {
      userId: request.userId,
      propertyId: property.id,
    },
  });

  if (reviewExist !== 0) {
    throw new ResponseError(400, "property is already reviewed");
  }

  if (transaction.status !== "success") {
    throw new ResponseError(400, "transaction is not completed");
  } else if (transaction.checkOut > new Date()) {
    throw new ResponseError(400, "property is not checked out yet");
  }

  const review = await prismaClient.review.create({
    data: {
      ...data,
      propertyId: property.id,
    },
  });

  const avgReviewRating = await prismaClient.review.aggregate({
    where: {
      propertyId: property.id,
    },
    _avg: {
      rating: true,
    },
  });

  await prismaClient.property.update({
    where: { id: property.id },
    data: {
      rating: avgReviewRating._avg.rating,
    },
  });

  return review;
};

export default { create };
