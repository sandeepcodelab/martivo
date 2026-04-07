import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  addCategory,
  adminGetAllCategories,
  deleteCategory,
  editCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/all").get(getAllCategories);

router
  .route("/add")
  .post(verifyJWT, upload.single("image"), roleCheck(["admin"]), addCategory);

router.route("/edit/:id").get(verifyJWT, roleCheck(["admin"]), editCategory);

router
  .route("/update/:id")
  .patch(
    verifyJWT,
    upload.single("image"),
    roleCheck(["admin"]),
    updateCategory
  );

router
  .route("/delete/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteCategory);

router
  .route("/getAll/admin")
  .get(verifyJWT, roleCheck(["admin"]), adminGetAllCategories);

export default router;
