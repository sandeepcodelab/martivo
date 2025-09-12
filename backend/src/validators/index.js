import { body } from "express-validator";

const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field cannot be empty.")
      .isEmail()
      .withMessage("The email format is invalid. Please enter a valid email."),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name field cannot be empty.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password cannot be empty.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters in length."),
  ];
};

export { userRegisterValidator };
