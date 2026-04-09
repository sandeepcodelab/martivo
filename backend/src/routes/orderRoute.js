import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";

const router = Router();

router.route("/create").post(verifyJWT, createOrder);
router.route("/all/user").get(verifyJWT, getUserOrders);
router.route("/orderDetails/:id").get(verifyJWT, getSingleOrder);
router.route("/all/admin").get(verifyJWT, roleCheck(["admin"]), getAllOrders);
router.route("/update/:id").patch(verifyJWT, roleCheck(["admin"]), updateOrder);

export default router;
