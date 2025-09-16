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

// Secure routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/user").get(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    changeCurrentPasswordValidator(),
    validate,
    changeCurrentPassword
  );

export default router;
