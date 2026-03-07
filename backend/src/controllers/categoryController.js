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

  const existedSlug = await Category.findOne({ slug: categorySlug });

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

const getAllCategories = asyncHandler(async (req, res) => {
  let { search = "", page = "1", limit = "10" } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 10) page = 10;

  const skip = (page - 1) * limit;

  const query = {};

  if (search.trim) {
    query.name = { $regex: search, $options: "i" };
  }

  // Get total document
  const total = await Category.countDocuments(query);

  const categories = await Category.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!categories) {
    throw new ApiError(404, "Category not found.", []);
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        categories,
        pageInfo: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Categories fetched successfully."
    )
  );
});

const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { category }, "Category fetched successfully."));
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, slug, parentId, status } = req.body;

  if (!name) {
    throw new ApiError(400, "Name field cannot be empty.", []);
  }

  const categorySlug = slug ? slug : slugify(name, { lower: true, trim: true });

  const category = await Category.findById(id);

  if (!category) {
    throw new ApiError(404, "Category not found.", []);
  }

  const updatedCategory = await Category.findByIdAndUpdate(
    category._id,
    {
      $set: {
        name: name ?? category.name,
        slug: categorySlug ?? category.slug,
        parentId: parentId ?? category.parentId,
        status: status ?? category.status,
      },
    },
    {
      new: true,
    }
  );

  if (!updatedCategory) {
    throw new ApiError(500, "Failed to update category, Please try again.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { category: updatedCategory },
        "Category updated successfully."
      )
    );
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    throw new ApiError(404, "Category not found.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { category }, "Category deleted successfully."));
});

export {
  addCategory,
  getAllCategories,
  editCategory,
  updateCategory,
  deleteCategory,
};
