import { Router } from "express";
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductThumbnail,
  addProductImages,
  deleteProductImage,
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
router.route("/singleProduct/:id").get(getProductById);

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
  verifyJWT,
  roleCheck(["admin"]),
  addProductVlidator(),
  validate,
  addProduct
);

router.route("/edit/:id").get(verifyJWT, roleCheck(["admin"]), getProductById);

router
  .route("/update/:id")
  .patch(
    verifyJWT,
    roleCheck(["admin"]),
    updateProductVlidator(),
    validate,
    updateProduct
  );

router
  .route("/delete/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteProduct);

router
  .route("/update-thumbnail/:id")
  .patch(
    upload.single("thumbnail"),
    verifyJWT,
    roleCheck(["admin"]),
    updateProductThumbnail
  );

router
  .route("/add-images/:id")
  .patch(
    upload.array("productImages", 6),
    verifyJWT,
    roleCheck(["admin"]),
    addProductImages
  );

router
  .route("/delete-image/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteProductImage);

export default router;
