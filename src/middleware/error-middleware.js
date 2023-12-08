import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
    if (!err) {
        next();
        return;
    }

    if (err instanceof ResponseError) {
        res.status(err.status)
            .json({
                errors: err.message,
                stack: process.env.NODE_ENV !== "production" ? err.stack : null,
            })
            .end();
    } else {
        res.status(500)
            .json({
                errors: err.message,
                stack: process.env.NODE_ENV !== "production" ? err.stack : null,
            })
            .end();
    }
};

export { errorMiddleware };
