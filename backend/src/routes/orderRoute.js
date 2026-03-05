import { Router } from "express";
import { createOrder } from "../controllers/orderController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createOrder);

export default router;
