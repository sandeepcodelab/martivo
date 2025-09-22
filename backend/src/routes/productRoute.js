import { Router } from "express";
import { addProduct } from "../controllers/productsController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import { addProductVlidator } from "../validators/index.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/add").post(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
    },
  ]),
  addProductVlidator(),
  validate,
  addProduct
);

export default router;
