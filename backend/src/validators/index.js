import { body } from "express-validator";

// Auth validators
const userRegisterValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field can not be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name field can not be empty.")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters long."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field can not be empty.")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters in length."),
  ];
};

const userLoginValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field can not be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password field can not be empty."),
  ];
};

const forgotPasswordValidator = () => {
  return [
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email field can not be empty.")
      .isEmail()
      .withMessage("Please enter a valid email address."),
  ];
};

const resetForgotPasswordValidator = () => {
  return [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password can not be empty."),
  ];
};

const changeCurrentPasswordValidator = () => {
  return [
    body("oldPassword")
      .trim()
      .notEmpty()
      .withMessage("Old password can not be empty."),
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("New password can not be empty."),
  ];
};

// Category validators
const categoryValidator = () => {
  return [
    body("name").trim().notEmpty().withMessage("Name field can not be empty."),
  ];
};

// Product validator
const addProductVlidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title field can not be empty."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description field can not be empty."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Catrgory field can not be empty."),
  ];
};

const updateProductVlidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title field can not be empty."),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("Description field can not be empty."),
    body("category")
      .trim()
      .notEmpty()
      .withMessage("Catrgory field can not be empty."),
  ];
};

// Product variant validator
const addVariantValidator = () => {
  return [
    body("size").trim().notEmpty().withMessage("Size field can not be empty."),
    body("color")
      .trim()
      .notEmpty()
      .withMessage("Color field can not be empty."),
    body("price")
      .notEmpty()
      .withMessage("Price field can not be empty.")
      .isFloat({ gt: 0 })
      .withMessage(
        "Price must be a valid number (integer or decimal) greater than 0."
      ),
    body("stock")
      .notEmpty()
      .withMessage("Stock field can not be empty.")
      .isInt({ min: 0 })
      .withMessage("Stock must be a valid non-negative integer."),
    body("sku").trim().notEmpty().withMessage("Sku field can not be empty."),
  ];
};

const updateVariantValidator = () => {
  return [
    body("size").trim().notEmpty().withMessage("Size field can not be empty."),
    body("color")
      .trim()
      .notEmpty()
      .withMessage("Color field can not be empty."),
    body("price")
      .notEmpty()
      .withMessage("Price field can not be empty.")
      .isFloat({ gt: 0 })
      .withMessage(
        "Price must be a valid number (integer or decimal) greater than 0."
      ),
    body("stock")
      .notEmpty()
      .withMessage("Stock field can not be empty.")
      .isInt({ min: 0 })
      .withMessage("Stock must be a valid non-negative integer."),
    body("sku").trim().notEmpty().withMessage("Sku field can not be empty."),
  ];
};

const addBulkVariantValidator = () => {
  return [
    body("variants")
      .isArray({ min: 1 })
      .withMessage("Variants must be a non-empty array"),

    body("variants.*.size").trim().notEmpty().withMessage("Size is required"),

    body("variants.*.color").trim().notEmpty().withMessage("Color is required"),

    body("variants.*.price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),

    body("variants.*.salePrice")
      .optional()
      .isFloat({ gt: 0 })
      .withMessage("Sale price must be greater than 0"),

    body("variants.*.stock")
      .isInt({ min: 0 })
      .withMessage("Stock must be 0 or greater"),

    body("variants.*.sku").trim().notEmpty().withMessage("SKU is required"),

    body("variants.*").custom((variant) => {
      if (variant.salePrice && variant.salePrice > variant.price) {
        throw new Error("Sale price cannot be greater than price");
      }
      return true;
    }),
  ];
};

export {
  // Auth validators----
  userRegisterValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetForgotPasswordValidator,
  changeCurrentPasswordValidator,
  // Category validators----
  categoryValidator,
  // Product validator----
  addProductVlidator,
  updateProductVlidator,
  // Product variant validator----
  addVariantValidator,
  updateVariantValidator,
  addBulkVariantValidator,
};
