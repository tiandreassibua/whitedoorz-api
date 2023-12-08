import { logger } from "../application/logging.js";
import paymentService from "../service/payment-service.js";

const create = async (req, res, next) => {
    try {
        const result = await paymentService.create(
            req.user.id,
            req.body.transactionId
        );

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const callback = async (req, res, next) => {
    try {
        await paymentService.callback(req.body);
        res.status(200);
    } catch (e) {
        next(e);
    }
};

export default { create, callback };
