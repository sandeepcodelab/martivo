import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  addCategory,
  deleteCategory,
  editCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import { categoryValidator } from "../validators/index.js";

const router = Router();

router
  .route("/all")
  .get(verifyJWT, roleCheck(["admin", "user"]), getAllCategories);

router
  .route("/add")
  .post(
    verifyJWT,
    roleCheck(["admin"]),
    categoryValidator(),
    validate,
    addCategory
  );

router.route("/edit/:id").get(verifyJWT, roleCheck(["admin"]), editCategory);

router
  .route("/update/:id")
  .patch(
    verifyJWT,
    roleCheck(["admin"]),
    categoryValidator(),
    validate,
    updateCategory
  );

router
  .route("/delete/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteCategory);

export default router;
