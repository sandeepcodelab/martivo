import { Router } from "express";
import {
  addItem,
  getCart,
  updateCart,
  deleteCartItem,
  mergeCart,
} from "../controllers/cartController.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/add").post(verifyJWT, addItem);
router.route("/all").post(verifyJWT, getCart);
router.route("/update").post(verifyJWT, updateCart);
router.route("/delete").delete(verifyJWT, deleteCartItem);
router.route("/merge").post(verifyJWT, mergeCart);

export default router;
