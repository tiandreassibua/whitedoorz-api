import bcrypt from "bcrypt";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import {
    getUserValidation,
    updateProfileValidation,
    updateUserValidation,
} from "../validation/user-validation.js";
import { validate } from "../validation/validation.js";

const get = async (userId) => {
    userId = validate(getUserValidation, userId);

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
        },
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    return user;
};

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const userInDatabase = await prismaClient.user.findUnique({
        where: {
            id: user.id,
        },
    });

    if (!userInDatabase) {
        throw new ResponseError(404, "user is not found");
    }

    user.firstName = user.firstName || userInDatabase.firstName;
    user.lastName = user.lastName || userInDatabase.lastName;
    user.phone = user.phone || userInDatabase.phone;
    user.email = user.email || userInDatabase.email;

    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: user,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
        },
    });
};

const remove = async (userId) => {
    userId = validate(getUserValidation, userId);

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    await prismaClient.user.delete({
        where: {
            id: userId,
        },
    });

    return "OK";
};

const index = () => {
    return prismaClient.user.findMany({
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            isAdmin: true,
        },
    });
};

const profile = (userId) => {
    userId = validate(getUserValidation, userId);

    return prismaClient.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
            image: true,
        },
    });
};

const updateProfile = async (request, userId) => {
    userId = validate(getUserValidation, userId);
    request = validate(updateProfileValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId,
        },
    });

    if (!user) {
        throw new ResponseError(404, "user is not found");
    }

    if (request.password) {
        request.password = await bcrypt.hash(request.password, 10);
    }

    request.firstName = request.firstName || user.firstName;
    request.lastName = request.lastName || user.lastName;
    request.phone = request.phone || user.phone;
    request.email = request.email || user.email;

    return prismaClient.user.update({
        where: {
            id: userId,
        },
        data: request,
        select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
        },
    });
};

export default { get, update, index, remove, profile, updateProfile };
