import { Product } from "../models/productsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, category, status } = req.body;

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  const imagesLocalPath = req.files?.images;

  if (thumbnailLocalPath) {
    let thumbnail = "";

    try {
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
  }

  if (imagesLocalPath.length > 0) {
    let images = [];

    try {
      await Promise.all(
        imagesLocalPath.map(async (image) => {
          const uploadedImg = await uploadOnCloudinary(image.path);
          images.push(uploadedImg.secure_url);
        })
      );
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
    console.log("images => ", images);
  }

  return res.status(201).json(new ApiResponse(201, {}, "created!"));
});

// const addProduct = asyncHandler(async(req, res) => {})

export { addProduct };
