import { Router } from "express";
import {
  registerUser,
  login,
  logoutUser,
  getCurrentUser,
  emailVerification,
  resendEmailVerification,
} from "../controllers/authController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import {
  userLoginValidator,
  userRegisterValidator,
} from "../validators/index.js";
import { verifyJWT } from "../middlewares/authMiddleware.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);
router.route("/login").post(userLoginValidator(), validate, login);
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/user").get(verifyJWT, getCurrentUser);
router.route("/verify/:token").get(emailVerification);
router.route("/resend-email-verification/:token").get(resendEmailVerification);

export default router;
