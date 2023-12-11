import jwt from "jsonwebtoken";
import { ResponseError } from "../error/response-error.js";
import { prismaClient } from "../application/database.js";
import crypto from "crypto";

export const verifyToken = (req, res, next) => {
    // ambil token dari header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res
            .status(401)
            .json({
                errors: "You are not authenticated",
            })
            .end();
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            return res.status(403).json({
                errors: "Token is not valid",
            });
        }

        const cekUserInDatabase = await prismaClient.user.findUnique({
            where: { id: user.id },
        });

        if (!cekUserInDatabase) {
            res.status(404)
                .json({
                    errors: "User is not found",
                })
                .end();
        }

        req.user = user;
        next();
    });
};

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id == req.params.id || req.user.isAdmin) {
            next();
        } else {
            res.status(403)
                .json({
                    errors: "You are not authorized",
                })
                .end();
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            res.status(403)
                .json({
                    errors: "You are not authorized",
                })
                .end();
        }
    });
};

export const verifyTransaction = (req, res, next) => {
    const serverKey = process.env.MIDTRANS_SERVER_KEY;
    const { signature_key, order_id, status_code, gross_amount } = req.body;

    const hash = crypto
        .createHash("sha512")
        .update(order_id + status_code + gross_amount + serverKey, "utf-8")
        .digest("hex");

    if (hash === signature_key) {
        next();
    } else {
        throw new ResponseError(403, "Signature key is not valid");
    }
};
