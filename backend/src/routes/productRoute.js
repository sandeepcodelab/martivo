import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  editProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  addProductVlidator,
  updateProductVlidator,
} from "../validators/index.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";

const router = Router();

router.route("/all").get(getAllProducts);

// Secured routes
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
  verifyJWT,
  roleCheck(["admin"]),
  addProduct
);

router.route("/edit/:id").get(verifyJWT, roleCheck(["admin"]), editProduct);

router.route("/update/:id").patch(
  upload.fields([
    {
      name: "thumbnail",
      maxCount: 1,
    },
    {
      name: "images",
    },
  ]),
  updateProductVlidator(),
  validate,
  verifyJWT,
  roleCheck(["admin"]),
  updateProduct
);

router
  .route("/delete/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteProduct);

export default router;
