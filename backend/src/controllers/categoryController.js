import { Category } from "../models/categoryModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import slugify from "slugify";

const addCategory = asyncHandler(async (req, res) => {
  const { name, slug, parentId, status } = req.body;

  if (!name) {
    throw new ApiError(400, "Name field cannot be empty.", []);
  }

  const categorySlug = slug ? slug : slugify(name, { lower: true, trim: true });

  const existedSlug = await Category.findOne({ categorySlug });

  if (existedSlug) {
    throw new ApiError(
      409,
      "Slug already exists. Choose a different slug.",
      []
    );
  }

  const category = await Category.create({
    name,
    slug: categorySlug,
    parentId,
    status,
  });

  if (!category) {
    throw new ApiError(500, "Failed to create category. Please try again.", []);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { category }, "Category created successfully"));
});

export { addCategory };
