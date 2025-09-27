import { Variant } from "../models/variantModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const addVariant = asyncHandler(async (req, res) => {
  const { productId, size, color, price, stock, sku, discount, isActive } =
    req.body;

  if (!productId) {
    throw new ApiError(400, "Unable to proceed: Product ID not provided.", []);
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

// const data = asyncHandler(async (req, res) => {})

export { addVariant };
