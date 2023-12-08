import transactionService from "../service/transaction-service.js";

const create = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await transactionService.create(userId, req.body);

        res.status(201).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const index = async (req, res, next) => {
    try {
        const result = await transactionService.index(req.user.id);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const result = await transactionService.get(req.user.id, req.params.id);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { create, index, get };
