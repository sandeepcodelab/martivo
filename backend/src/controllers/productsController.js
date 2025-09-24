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

  // Upload thumbnail
  let thumbnail = "";
  if (thumbnailLocalPath) {
    try {
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
  }

  // Upload images
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

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, description, category, status } = req.body;

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  const imagesLocalPath = req.files?.images;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  // upload thumbnail
  let thumbnail = "";
  if (thumbnailLocalPath) {
    try {
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
    } catch (error) {
      throw new ApiError(500, "Failed to upload thumbnail.", []);
    }
  }

  // Upload images
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

  // Get old thumbnail and images, and removing them
  if (thumbnail) {
    const oldThumbnail = product.thumbnail?.url;

    if (oldThumbnail) {
      const match = oldThumbnail.match(/\/(martivo\/[^.]+)\./);
      const public_id = match ? match[1] : null;

      await deleteFromCloudinary(public_id);
    }
  }

  // Images
  if (images.length > 0) {
    const oldImages = product.images;

    if (oldImages.length > 0) {
      try {
        await Promise.all(
          oldImages.map(async (image) => {
            const match = image.url.match(/\/(martivo\/[^.]+)\./);
            const public_id = match ? match[1] : null;

            await deleteFromCloudinary(public_id);
          })
        );
      } catch (error) {
        throw new ApiError(500, "Failed to delete images.", []);
      }
    }
  }

  const finalImages =
    Array.isArray(images) && images?.length > 0 ? images : product.images;

  const updateProduct = await Product.findByIdAndUpdate(
    product._id,
    {
      $set: {
        title: title || product.title,
        description: description || product.description,
        category: category || product.category,
        thumbnail: thumbnail || product.thumbnail,
        images: finalImages,
        status: status || product.status,
      },
    },
    { new: true }
  );

  if (!updateProduct) {
    throw new ApiError(500, "Failed to update product.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: updateProduct },
        "Product updated successfully."
      )
    );
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  const thumbnail = product.thumbnail;

  if (thumbnail) {
    const match = thumbnail.match(/\/(martivo\/[^.]+)\./);
    const public_id = match ? match[1] : null;

    await deleteFromCloudinary(public_id);
  }

  const images = product.images;

  if (images.length > 0) {
    try {
      await Promise.all(
        images.map(async (image) => {
          const match = image.url.match(/\/(martivo\/[^.]+)\./);
          const public_id = match ? match[1] : null;

          await deleteFromCloudinary(public_id);
        })
      );
    } catch (error) {
      throw new ApiError(500, "Failed to delete images.", []);
    }
  }

  const deleteProduct = await Product.findByIdAndDelete(product._id);

  if (!deleteProduct) {
    throw new ApiError(500, "Failed to delete product.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully."));
});

export {
  addProduct,
  getAllProducts,
  editProduct,
  updateProduct,
  deleteProduct,
};
