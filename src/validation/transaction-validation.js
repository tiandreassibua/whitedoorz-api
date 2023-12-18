import Joi from "joi";

const createTransactionValidation = Joi.object({
  transaction: Joi.object({
    propertyId: Joi.number().positive().required(),
    checkIn: Joi.date().required(),
    checkOut: Joi.date().required(),
    totalPrice: Joi.number().positive().required(),
  }),
  transactionRooms: Joi.array().items(
    Joi.object({
      roomId: Joi.number().positive().required(),
      // roomQty: Joi.number().positive().required(),
    })
  ),
});

const getTransactionValidation = Joi.string().required();

export { createTransactionValidation, getTransactionValidation };
