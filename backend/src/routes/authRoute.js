import { Router } from "express";
import {
  registerUser,
  login,
  logoutUser,
  getCurrentUser,
  emailVerification,
  resendEmailVerification,
  forgotPasswordRequest,
  resetForgotPassword,
  changeCurrentPassword,
  refreshAccessToken,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUser,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  changeCurrentPasswordValidator,
  forgotPasswordValidator,
  resetForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";
import { roleCheck } from "../middlewares/roleMiddleware.js";

const router = Router();

// Unsecure routes
router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/verify/:token").get(emailVerification);
router.route("/resend-email-verification/:token").get(resendEmailVerification);
router
  .route("/forgot-password")
  .post(forgotPasswordValidator(), validate, forgotPasswordRequest);
router
  .route("/reset-password/:resetToken")
  .post(resetForgotPasswordValidator(), validate, resetForgotPassword);
router.route("/refresh").post(refreshAccessToken);
router.route("/logout").post(logoutUser);

// Secure routes
router.route("/user").get(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    changeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );

router
  .route("/getUsers/admin")
  .get(verifyJWT, roleCheck(["admin"]), getAllUsers);

router
  .route("/getUser/:id/admin")
  .get(verifyJWT, roleCheck(["admin"]), getSingleUser);

router
  .route("/update/:id/admin")
  .patch(verifyJWT, roleCheck(["admin"]), updateUserRole);

router
  .route("/delete/:id/admin")
  .delete(verifyJWT, roleCheck(["admin"]), deleteUser);

export default router;
