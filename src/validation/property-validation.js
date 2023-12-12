import Joi from "joi";

const createPropertyValidation = Joi.object({
    name: Joi.string().max(150).required(),
    address: Joi.string().max(150).required(),
    city: Joi.string().max(50).required(),
    image: Joi.string().required(),
    location: Joi.string().required(),
    category: Joi.string().required(),
});

const searchPropertyValidation = Joi.object({
    page: Joi.number().positive().min(1).default(1),
    size: Joi.number().positive().min(1).max(100).default(10),
    name: Joi.string().optional(),
    city: Joi.string().optional()
})

const getPropertyValidation = Joi.number().positive().required();

export { createPropertyValidation, getPropertyValidation, searchPropertyValidation };
