import { Router } from "express";
import {
  addItem,
  getCart,
  updateCart,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = Router();

router.route("/add").post(addItem);
router.route("/all").post(getCart);
router.route("/update").post(updateCart);
router.route("/delete").delete(deleteCartItem);

export default router;
