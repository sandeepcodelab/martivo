import { Router } from "express";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";
import {
  addVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
  getCartVariants,
} from "../controllers/variantController.js";

import { validate } from "../middlewares/validatorMiddleware.js";
import {
  addVariantValidator,
  updateVariantValidator,
} from "../validators/index.js";

const router = Router();

router.route("/:productId/all").get(getAllVariants);
router.route("/bulk").post(getCartVariants);

// Secured routes
router
  .route("/:productId/add")
  .post(
    verifyJWT,
    roleCheck(["admin"]),
    addVariantValidator(),
    validate,
    addVariant
  );

router.route("/edit/:id").get(verifyJWT, roleCheck(["admin"]), getVariantById);

router
  .route("/update/:id")
  .patch(
    verifyJWT,
    roleCheck(["admin"]),
    updateVariantValidator(),
    validate,
    updateVariant
  );

router
  .route("/delete/:id")
  .delete(verifyJWT, roleCheck(["admin"]), deleteVariant);

export default router;
