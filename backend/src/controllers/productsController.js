import { Product } from "../models/productsModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { Category } from "../models/categoryModel.js";
import { Variant } from "../models/variantModel.js";

const addProduct = asyncHandler(async (req, res) => {
  const { title, slug, description, category, status } = req.body;

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  const imagesLocalPath = req.files?.images;

  const productSlug = slug ? slug : slugify(title, { lower: true, trim: true });

  const checkProduct = await Product.findOne({ slug: productSlug });
  if (checkProduct) {
    throw new ApiError(409, "A product with this slug already exists.", []);
  }

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
    slug: productSlug,
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
          uploadedImages.map((image) => deleteFromCloudinary(image.public_id))
        );
      } catch (error) {
        throw new ApiError(500, "Failed to delete images.", []);
      }
    }

    throw new ApiError(500, "Failed to create product.", []);
  }

  return res
    .status(201)
    .json(new ApiResponse(201, { product }, "Product added successfully."));
});

const getAllProducts = asyncHandler(async (req, res) => {
  let { limit = 12, page = 1, search = "", category = "" } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 10) page = 10;

  const skip = (page - 1) * limit;

  const query = {};

  if (search.trim) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    const getCategory = await Category.findOne({ slug: category });
    query.category = getCategory?._id;
  }

  query.status = true;
  query.isCompleted = true;

  // Get total document
  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .populate("category");

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

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        pageInfo: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Products fetched successfully."
    )
  );
});

const getProductById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).populate("variants");

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { product }, "Product fetched successfully."));
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { title, slug, description, category, status } = req.body;

  const thumbnailLocalPath = req.files?.thumbnail?.[0]?.path;
  const imagesLocalPath = req.files?.images;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

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
  let images = product.images;
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

  const updateProduct = await Product.findByIdAndUpdate(
    product._id,
    {
      $set: {
        title: title ?? product.title,
        slug: slug ?? product.slug,
        description: description ?? product.description,
        category: category ?? product.category,
        status: status ?? product.status,
        thumbnail: {
          url: thumbnail?.secure_url ?? product.thumbnail.url,
          localPath: thumbnailLocalPath ?? product.thumbnail.localPath,
        },
        images,
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

  const thumbnail = product?.thumbnail?.url;

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

  await Variant.deleteMany({ product: id });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Product deleted successfully."));
});

const updateProductThumbnail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(400, "Product image is required.", []);
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  // upload thumbnail
  let thumbnail = "";
  if (thumbnailLocalPath) {
    thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
  }

  // Get old thumbnail and remove it
  if (thumbnail) {
    const oldThumbnail = product.thumbnail?.url;

    if (oldThumbnail) {
      const match = oldThumbnail.match(/\/(martivo\/[^.]+)\./);
      const public_id = match ? match[1] : null;

      await deleteFromCloudinary(public_id);
    }
  }

  const updateThumbnail = await Product.findByIdAndUpdate(
    product._id,
    {
      $set: {
        thumbnail: thumbnail,
      },
    },
    { new: true }
  );

  if (!updateThumbnail) {
    if (thumbnail) {
      await deleteFromCloudinary(thumbnail.public_id);
    }

    throw new ApiError(500, "Failed to update thumbnail.");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: updateThumbnail },
        "Thumbnail updated successfully."
      )
    );
});

const addProductImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const imagesLocalPath = req?.files;

  if (!imagesLocalPath) {
    throw new ApiError(400, "Product images are required.", []);
  }

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found.", []);
  }

  // Upload images
  let uploadedImages = [];
  let images = product.images;
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
      throw new ApiError(500, "Failed to upload images.", []);
    }
  }

  const updateImages = await Product.findByIdAndUpdate(
    product._id,
    {
      $set: {
        images,
      },
    },
    { new: true }
  );

  if (!updateImages) {
    // Remove images if not updated in database
    if (uploadedImages?.length > 0) {
      try {
        await Promise.all(
          uploadedImages.map((image) => deleteFromCloudinary(image.public_id))
        );
      } catch (error) {
        throw new ApiError(500, "Failed to delete images.", []);
      }
    }

    throw new ApiError(500, "Failed to update product images.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: updateImages },
        "Images updated successfully."
      )
    );
});

const deleteProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { url = "" } = req.query;

  const product = await Product.findById(id);

  if (!product) {
    throw new ApiError(404, "Product not found", []);
  }

  const productImages = product.images;

  if (!url) {
    throw new ApiError(400, "Image URL is required but was not provided.", []);
  }

  const match = url.match(/\/(martivo\/[^.]+)\./);
  const public_id = match ? match[1] : null;

  await deleteFromCloudinary(public_id);

  const images = productImages.filter((image) => image.url !== url);

  const updatedData = await Product.findByIdAndUpdate(
    product._id,
    {
      $set: {
        images,
      },
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(500, "Failed to delete image.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { product: updatedData },
        "Image deleted successfully."
      )
    );
});

const adminGetAllProducts = asyncHandler(async (req, res) => {
  let { limit = 10, page = 1, search = "", category = "" } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 10) page = 10;

  const skip = (page - 1) * limit;

  const query = {};

  if (search.trim) {
    query.title = { $regex: search, $options: "i" };
  }

  if (category) {
    const getCategory = await Category.findOne({ slug: category });
    query.category = getCategory?._id;
  }

  // Get total document
  const total = await Product.countDocuments(query);

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .populate(["category", "variants"]);

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

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        pageInfo: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Products fetched successfully."
    )
  );
});

const updateProductStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status = false } = req.body;

  if (!id) {
    throw new ApiError(400, "Required product ID", []);
  }

  const checkProduct = await Product.findById(id).populate("category");

  if (!checkProduct) {
    throw new ApiError(404, "Product not found", []);
  }

  if (!checkProduct?.category?.status) {
    throw new ApiError(
      400,
      "The selected category is currently inactive. Please choose an active category.",
      []
    );
  }

  const product = await Product.findByIdAndUpdate(
    id,
    { $set: { status } },
    { new: true }
  );

  if (!product) {
    throw new ApiError(500, "Unable to update product status.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { product }, "Product status updated successfully.")
    );
});

export {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  updateProductThumbnail,
  addProductImages,
  deleteProductImage,
  adminGetAllProducts,
  updateProductStatus,
};
