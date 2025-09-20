import { Product } from "../models/productsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";

const addProduct = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    category,
    productImage,
    productSubImage,
    status,
  } = req.body;

  //   if (!title) {
  //     throw new ApiError(400, "Title field cannot be empty.", []);
  //   }

  return res.status(201).json(new ApiResponse(201, {}, "created!"));
});

// const addProduct = asyncHandler(async(req, res) => {})

export { addProduct };
