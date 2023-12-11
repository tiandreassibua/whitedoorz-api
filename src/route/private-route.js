import express from "express";
import userController from "../controller/user-controller.js";
import {
    verifyAdmin,
    verifyToken,
    verifyTransaction,
    verifyUser,
} from "../middleware/auth-middleware.js";
import propertyController from "../controller/property-controller.js";
import roomController from "../controller/room-controller.js";
import reviewController from "../controller/review-controller.js";
import wishlistController from "../controller/wishlist-controller.js";
import transactionController from "../controller/transaction-controller.js";
import paymentController from "../controller/payment-controller.js";
import authController from "../controller/auth-controller.js";

const router = express.Router();

// User Route
router
    .route("/api/users/profile")
    .get(verifyToken, userController.profile)
    .put(verifyToken, userController.updateProfile);

router.get("/api/users", verifyAdmin, userController.index);
router.get("/api/users/:id", verifyUser, userController.get);
router.patch("/api/users/:id", verifyUser, userController.update);
router.delete("/api/users/:id", verifyUser, userController.remove);

// Property Route
router.post("/api/properties", verifyAdmin, propertyController.create);
router.put("/api/properties/:id", verifyAdmin, propertyController.update);

// Room Route
router.post(
    "/api/properties/:propId/rooms",
    verifyAdmin,
    roomController.create
);

router.put(
    "/api/properties/:propId/rooms/:roomId",
    verifyAdmin,
    roomController.update
);

// Review Route
router.post(
    "/api/properties/:propId/reviews",
    verifyToken,
    reviewController.create
);

// Wishlist Route
router.post(
    "/api/properties/:propId/wishlists",
    verifyToken,
    wishlistController.create
);

router.delete(
    "/api/properties/:propId/wishlists/:id",
    verifyToken,
    wishlistController.remove
);

router.get("/api/wishlists", verifyToken, wishlistController.get);

// Transaction Route
router.get("/api/transactions", verifyToken, transactionController.index);
router.get("/api/transactions/:id", verifyToken, transactionController.get);
router.post("/api/transactions", verifyToken, transactionController.create);

// Payment Route
router.post("/api/payments", verifyToken, paymentController.create);
router.post(
    "/api/payments/handling",
    verifyTransaction,
    paymentController.callback
);

export default router;
