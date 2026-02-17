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
router.route("/all").get(verifyJWT, getCart);
router.route("/update/:variantId").patch(verifyJWT, updateCart);
router.route("/delete/:variantId").delete(verifyJWT, deleteCartItem);
router.route("/merge").post(verifyJWT, mergeCart);

export default router;
