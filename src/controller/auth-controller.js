import authService from "../service/auth-service.js";

const register = async (req, res, next) => {
    try {
        const result = await authService.register(req.body);
        res.status(201).json({
            data: result,
        });
    } catch (e) {
        next(e);
    }
};

const login = async (req, res, next) => {
    try {
        const result = await authService.login(req.body);
        res.cookie("access_token", result.token, { httpOnly: true })
            .status(200)
            .json({ data: result.data });
    } catch (e) {
        next(e);
    }
};

const logout = (req, res, next) => {
    try {
        res.cookie("access_token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        res.status(200).json({ data: "OK" });
    } catch (e) {
        next(e);
    }
};

export default { register, login, logout };
