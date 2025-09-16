import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name field cannot be empty.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field cannot be empty.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters in length."),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field cannot be empty."),
  ];
};

const forgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
  ];
};

export {
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetForgotPasswordValidator,
  changeCurrentPasswordValidator,
};
