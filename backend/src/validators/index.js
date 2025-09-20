import { body } from "express-validator";

// Auth validators
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

const resetForgotPasswordValidator = () => {
  return [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password cannot be empty."),
  ];
};

const changeCurrentPasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Old password cannot be empty."),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password cannot be empty."),
  ];
};

// Category validators
const categoryValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name field cannot be empty."),
  ];
};

// Product validator
const addProductVlidator = () => {
  return [
    body("title").trim().notEmpty().withMessage("Title field cannot be empty."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description field cannot be empty."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Catrgory field cannot be empty."),
  ];
};

export {
  // Auth validators
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetForgotPasswordValidator,
  changeCurrentPasswordValidator,
  // Category validators
  categoryValidator,
  // Product validator
  addProductVlidator,
};
