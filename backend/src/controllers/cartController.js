import { Cart } from "../models/cartModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Variant } from "../models/variantModel.js";
import crypto from "crypto";

const addItem = asyncHandler(async (req, res) => {
  const { variantId, quantity } = req.body;
  const userId = req?.user?._id;

  if (!variantId) {
    throw new ApiError(400, "VariantId is required.");
  }

  if (!quantity || quantity <= 0) {
    throw new ApiError(400, "Invalid quantity.");
  }

  const userCart = await Cart.findOne({ userId });

  if (!userCart) {
    const cart = await Cart.create({
      userId,
      items: [{ variantId, quantity }],
    });

    if (!cart) {
      throw new ApiError(
        500,
        "Unable to add item to cart. Please try again later.",
        []
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, { cart }, "Item added to cart."));
  }

  if (!userCart.items.length) {
    userCart.items.push({ variantId, quantity });

    await userCart.save({ validateBeforeSave: false });

    return res
      .status(201)
      .json(new ApiResponse(201, { cart: userCart }, "Item added to cart."));
  }

  const variantData = await Variant.findById(variantId);

  const matchedItem = userCart.items.find(
    (item) => item.variantId.toString() === variantId.toString()
  );

  if (matchedItem) {
    matchedItem.quantity += quantity;

    if (matchedItem.quantity > variantData.stock) {
      matchedItem.quantity = variantData.stock;
    }
  } else {
    userCart.items.push({ variantId, quantity });
  }

  userCart.save({ validateBeforeSave: false });

  return res
    .status(201)
    .json(new ApiResponse(201, { cart: userCart }, "Item added to cart."));
});

const getCart = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const cart = await Cart.findOne({ userId });

  if (!cart) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart },
          "Your cart is empty — time to fill it with something awesome."
        )
      );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Cart fetched successfully."));
});

const updateCart = asyncHandler(async (req, res) => {
  const userId = req?.user?._id;
  const { variantId } = req.params;
  const { quantity } = req.body;

  if (!variantId) {
    throw new ApiError(400, "Variant ID is required");
  }

  if (typeof quantity !== "number" || quantity < 0) {
    throw new ApiError(400, "Invalid quantity");
  }

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    throw new ApiError(404, "Item not found.", []);
  }

  const item = cart.items.find(
    (i) => i.variantId.toString() === variantId.toString()
  );

  if (quantity === 0) {
    cart.items = cart.items.filter(
      (i) => i.variantId.toString() !== variantId.toString()
    );
  } else {
    item.quantity = quantity;
  }

  await cart.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Item updated successfully."));
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { variantId } = req.params;
  const userId = req.user._id;

  if (!variantId) {
    throw new ApiError(400, "Variant ID is required");
  }

  const updatedCart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { variantId } } },
    { new: true }
  );

  if (!updatedCart) {
    throw new ApiError(404, "Item not found.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, { cart: updatedCart }, "Item deleted successfully.")
    );
});

const mergeCart = asyncHandler(async (req, res) => {
  const { items = [] } = req.body || {};
  const userId = req.user._id;

  if (!items.length) return;

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    const createCart = await Cart.create({
      items,
      userId,
    });

    if (!createCart) {
      throw new ApiError(500, "Unable to add items to cart.");
    }

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          { cart: createCart },
          "Item added to cart successfully."
        )
      );
  }

  for (const localItem of items) {
    const variant = await Variant.findById(localItem.variantId);

    const existingItem = cart.items.find(
      (cartItem) =>
        cartItem.variantId.toString() === localItem.variantId.toString()
    );

    if (existingItem) {
      const totalQTY = (existingItem.quantity += localItem.quantity);

      if (totalQTY > variant.stock) {
        existingItem.quantity = variant.stock;
      }
      existingItem.quantity = variant.stock;
    } else {
      cart.items.push(localItem);
    }
  }

  await cart.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Cart merged successfully."));
});

const clearCart = asyncHandler(async (req, res) => {
  const user = req.user;

  const updateUserCart = await Cart.findOneAndUpdate(
    { userId: user._id },
    { $set: { items: [] } },
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cart: updateUserCart },
        "Cart cleared successfully."
      )
    );
});

export { addItem, getCart, updateCart, deleteCartItem, mergeCart, clearCart };
