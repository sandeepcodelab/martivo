import { Product } from "../models/productsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";

const addProduct = asyncHandler(async (req, res) => {
  const { title, description, category, status } = req.body;

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  const imagesLocalPath = req.files?.images;

  let thumbnail = "";
  if (thumbnailLocalPath) {
    try {
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
  }

  let uploadedImages = [];
  let images = [];
  if (imagesLocalPath?.length > 0) {
    try {
      await Promise.all(
        imagesLocalPath.map(async (image) => {
          const uploadedImg = await uploadOnCloudinary(image.path);
          images.push({
            url: uploadedImg.secure_url,
            localPath: image.path,
          });
          uploadedImages.push(uploadedImg);
        })
      );
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
  }

  const product = await Product.create({
    title,
    description,
    category,
    thumbnail: {
      url: thumbnail?.secure_url,
      localPath: thumbnailLocalPath,
    },
    images,
    status,
  });

  // Remove uploaded files if product is not created
  if (!product) {
    if (thumbnail) {
      await deleteFromCloudinary(thumbnail.public_id);
    }

    if (uploadedImages?.length > 0) {
      try {
        await Promise.all(
          uploadedImages.map(async (image) => {
            await deleteFromCloudinary(image.public_id);
          })
        );
      } catch (error) {
        throw new ApiError(500, "Failed to delete images.", []);
      }
    }
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { product }, "Product added successfully."));
});

const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();

  if (!products) {
    throw new ApiError(404, "Products not found.", []);
  }

  if (products.length === 0) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, { products }, "We could not find any products.")
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { products }, "Products fetched successfully."));
});

const editProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product fetched successfully."));
});

// const addProduct = asyncHandler(async(req, res) => {})

export { addProduct, getAllProducts, editProduct };
