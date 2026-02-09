import { Variant } from "../models/variantModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const addVariant = asyncHandler(async (req, res) => {
  const { size, color, price, stock, sku, discount, isActive } = req.body;
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(
      400,
      "Product reference is missing. Please try again.",
      []
    );
  }

  const variant = await Variant.create({
    product: productId,
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
      new ApiResponse(201, { variant }, "Product variant created successfully.")
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

  const variants = await Variant.find({ product: productId });

  if (!variants) {
    throw new ApiError(
      500,
      "Unable to fetch product variants. Please retry later.",
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
    .json(
      new ApiResponse(
        200,
        { variants },
        "product variants fetched successfully."
      )
    );
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

  const variant = await Variant.findById(id);

  if (!variant) {
    throw new ApiError(
      500,
      "Unable to fetch product variant. Please retry later.",
      []
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { variant },
        "Product variants fetched successfully."
      )
    );
});

const updateVariant = asyncHandler(async (req, res) => {
  const { size, color, price, stock, sku, discount, isActive } = req.body;
  const { id } = req.params;

  const variant = await Variant.findById(id);

  if (!variant) {
    throw new ApiError(404, "Product variant not found.", []);
  }

  const updatedVariant = await Variant.findByIdAndUpdate(
    variant._id,
    {
      $set: {
        size: size || variant.size,
        color: color || variant.color,
        price: price || variant.price,
        stock: stock || variant.stock,
        sku: sku || variant.sku,
        discount: discount || variant.discount,
        isActive: isActive || variant.isActive,
      },
    },
    { new: true }
  );

  if (!updatedVariant) {
    throw new ApiError(
      500,
      "Unable to update product variant. Please retry later.",
      []
    );
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { variant: updatedVariant },
        "Product variant created successfully."
      )
    );
});

const deleteVariant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const variant = await Variant.findById(id);

  if (!variant) {
    throw new ApiError(404, "Product variant not found.", []);
  }

  const deleteVariant = await Variant.findByIdAndDelete(variant._id);

  if (!deleteVariant) {
    throw new ApiError(
      500,
      "Unable to delete product variant. Please retry later.",
      []
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product variant deleted successfully."));
});

const getCartVariant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Parameter missing");
  }

  const getVariant = await Variant.findById(id).populate("product");

  if (!getVariant) return;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { variant: getVariant },
        "Product variant fetched successfully."
      )
    );
});

export {
  addVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
  getCartVariant,
};
