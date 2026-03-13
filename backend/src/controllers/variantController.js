import { Variant } from "../models/variantModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Product } from "../models/productsModel.js";

const addVariant = asyncHandler(async (req, res) => {
  const { size, color, price, salePrice, stock, sku, isActive } = req.body;
  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(
      400,
      "Product reference is missing. Please try again.",
      []
    );
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.");
  }

  const variant = await Variant.create({
    product: product._id,
    size,
    color,
    price,
    salePrice,
    stock,
    sku,
    isActive,
  });

  if (!variant) {
    throw new ApiError(500, "Unable to save variant. Please retry later.", []);
  }

  await updateProductPrice(product._id);

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

  await updateProductPrice(variant.product);

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

  await updateProductPrice(variant.product);

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product variant deleted successfully."));
});

const getCartVariants = asyncHandler(async (req, res) => {
  const { variantIds } = req.body || {};

  if (!Array.isArray(variantIds) || variantIds.length === 0) {
    throw new ApiError(400, "variantIds must be a non-empty array.");
  }

  const getVariant = await Variant.find({ _id: { $in: variantIds } }).populate(
    "product"
  );

  if (!getVariant) return;

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { variants: getVariant },
        "Product variant fetched successfully."
      )
    );
});

const addBulkVariant = asyncHandler(async (req, res) => {
  const { variants = [] } = req.body;

  const { productId } = req.params;

  if (!productId) {
    throw new ApiError(400, "Product Id is missing.", []);
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  const modifiedVariants = variants.map((variant) => ({
    ...variant,
    product: product._id,
  }));

  const createdVariants = await Variant.insertMany(modifiedVariants);

  if (!createdVariants || createdVariants.length === 0) {
    throw new ApiError(400, "Variant creation failed", []);
  }

  await updateProductPrice(product._id);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { variants: createdVariants },
        "Variants created successfully."
      )
    );
});

const updateProductPrice = async (productId) => {
  if (!productId) return;

  const lowPriceVariant = await Variant.find({ product: productId })
    .sort({ salePrice: 1 })
    .limit(1);

  if (!lowPriceVariant) return;

  const updateProduct = await Product.findByIdAndUpdate(
    lowPriceVariant[0].product,
    {
      minPrice: lowPriceVariant[0].salePrice,
      maxPrice: lowPriceVariant[0].price,
    }
  );
};

export {
  addVariant,
  getAllVariants,
  getVariantById,
  updateVariant,
  deleteVariant,
  getCartVariants,
  addBulkVariant,
};
