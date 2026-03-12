import { Router } from "express";
import { createOrder, getOrders } from "../controllers/orderController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createOrder);
router.route("/all").get(verifyJWT, getOrders);

export default router;
