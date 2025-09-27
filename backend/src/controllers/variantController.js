import { Variant } from "../models/variantModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const addVariant = asyncHandler(async (req, res) => {
  const { productId, size, color, price, stock, sku, discount, isActive } =
    req.body;

  if (!productId) {
    throw new ApiError(
      400,
      "Product reference is missing. Please try again.",
      []
    );
  }

  const variant = await Variant.create({
    productId,
    size,
    color,
    price,
    stock,
    sku,
    discount,
    isActive,
  });

  if (!variant) {
    throw new ApiError(500, "Unable to save variant. Please retry later.", []);
  }

  return res
    .status(201)
    .json(
      new ApiResponse(200, { variant }, "Product variant created successfully.")
    );
});

const getAllVariants = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(
      400,
      "Product reference is missing. Please try again.",
      []
    );
  }

  const variants = await Variant.find({ productId });

  if (!variants) {
    throw new ApiError(
      500,
      "Unable to fetch variants. Please retry later.",
      []
    );
  }

  if (variants.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { variants }, "We could not find any variants.")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { variants }, "Variants fetched successfully."));
});

const getVariantById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(
      400,
      "Variant reference is missing. Please try again.",
      []
    );
  }

  const variant = await Variant.find({ id });

  if (!variant) {
    throw new ApiError(500, "Unable to fetch variant. Please retry later.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { variant }, "Variants fetched successfully."));
});

// const data = asyncHandler(async (req, res) => {})

export { addVariant, getAllVariants, getVariantById };
