import { Router } from "express";
import { registerUser } from "../controllers/authController.js";
import { validate } from "../middlewares/validatorMiddleware.js";
import { userRegisterValidator } from "../validators/index.js";

const router = Router();

router.route("/register").post(userRegisterValidator(), validate, registerUser);

export default router;
