import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { getPropertyValidation } from "../validation/property-validation.js";
import { getUserValidation } from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const create = async (userId, propId) => {
    userId = validate(getUserValidation, userId);
    propId = validate(getPropertyValidation, propId);

    const check = await prismaClient.wishlist.findUnique({
        where: {
            userId_propertyId: {
                userId: userId,
                propertyId: propId,
            },
        },
    });

    if (check) {
        throw new ResponseError(400, "wishlist already exists");
    }

    return prismaClient.wishlist.create({
        data: {
            userId: userId,
            propertyId: propId,
        },
    });
};

const remove = async (userId, propId, id) => {
    userId = validate(getUserValidation, userId);
    propId = validate(getPropertyValidation, propId);

    const check = await prismaClient.wishlist.findUnique({
        where: {
            id: parseInt(id),
            userId_propertyId: {
                userId: userId,
                propertyId: propId,
            },
        },
    });

    if (check) {
        return prismaClient.wishlist.delete({
            where: {
                id: parseInt(id),
                userId_propertyId: {
                    userId: userId,
                    propertyId: propId,
                },
            },
        });
    } else {
        throw new ResponseError(404, "wishlist is not found");
    }
};

const get = (userId) => {
    userId = validate(getUserValidation, userId);

    return prismaClient.wishlist.findMany({
        where: {
            userId,
        },
        select: {
            id: true,
            property: true
        },
    });
};

export default { create, remove, get };
