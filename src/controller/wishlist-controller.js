import wishlistService from "../service/wishlist-service.js";

const create = async (req, res, next) => {
    try {
        const { propId } = req.params;
        const userId = req.user.id;
        const result = await wishlistService.create(userId, propId);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

const remove = async (req, res, next) => {
    try {
        const { propId, id } = req.params;
        const userId = req.user.id;

        const result = await wishlistService.remove(userId, propId, id);
        res.status(200).json({ data: "OK" });
    } catch (e) {
        next(e);
    }
};

const get = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const result = await wishlistService.get(userId);

        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
};

export default { create, remove, get };
