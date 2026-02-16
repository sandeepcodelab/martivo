import { Cart } from "../models/cartModel.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Variant } from "../models/variantModel.js";
import crypto from "crypto";

const addItem = asyncHandler(async (req, res) => {
  const { variantId, quantity } = req.body;
  const userId = req?.user?._id;
  console.table([variantId, quantity, userId]);
  return;
  // const guestToken = localStorage.getItem("guestID");
  const guestToken = "";

  if (!variantId) {
    throw new ApiError(
      400,
      "Variant not found. Please select a valid product variant."
    );
  }

  const expiryAt = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000);
  let hashedToken = "";

  // if (!userId) {
  //   if (!guestToken) {
  //     const unHashedToken = crypto.randomBytes(32).toString("hex");
  //     hashedToken = crypto
  //       .createHash("sha256")
  //       .update(unHashedToken)
  //       .digest("hex");

  //     localStorage.setItem("guestID", unHashedToken);
  //   }

  //   const guestId = crypto
  //     .createHash("sha256")
  //     .update(guestToken)
  //     .digest("hex");

  //   const guestCart = await Cart.findOne({ guestId });

  //   if (!guestCart) {
  //     const item = await Cart.create({
  //       guestId: hashedToken,
  //       items: [{ variantId, quantity }],
  //       expiryAt,
  //     });

  //     if (!item) {
  //       throw new ApiError(
  //         500,
  //         "Unable to add item to cart. Please try again later.",
  //         []
  //       );
  //     }

  //     return res
  //       .status(201)
  //       .json(new ApiResponse(201, { item }, "Item added to cart."));
  //   }

  //   const gustCartItems = guestCart.items;
  //   gustCartItems.push({ variantId, quantity });

  //   guestCart.items = gustCartItems;
  //   guestCart.expiryAt = expiryAt;
  //   await guestCart.save({ validateBeforeSave: false });

  //   if (!guestCart) {
  //     throw new ApiError(
  //       500,
  //       "Unable to add item to cart. Please try again later.",
  //       []
  //     );
  //   }

  //   return res
  //     .status(201)
  //     .json(new ApiResponse(201, { item: existedCart }, "Item added to cart."));
  // }

  const userCart = await Cart.findOne({ userId });

  if (!userCart) {
    const item = await Cart.create({
      userId,
      items: [{ variantId, quantity }],
    });

    if (!userCart) {
      throw new ApiError(
        500,
        "Unable to add item to cart. Please try again later.",
        []
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(201, { item }, "Item added to cart."));
  }

  const userCartItems = userCart.items;
  userCartItems.push({ variantId, quantity });

  userCart.items = userCartItems;
  await userCart.save({ validateBeforeSave: false });

  if (!userCart) {
    throw new ApiError(
      500,
      "Unable to add item to cart. Please try again later.",
      []
    );
  }
  return res
    .status(201)
    .json(new ApiResponse(201, { item: existedCart }, "Item added to cart."));
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
  const { id } = req.params;
  const { userId, quantity } = req.body;

  const item = await Cart.findOne({
    $or: [{ userId }, { guestId }],
    "items._id": id,
  });

  if (!item) {
    throw new ApiError(404, "Item not found.", []);
  }

  item.items[0].quantity = quantity;
  await item.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, { item }, "Item updated successfully."));
});

const deleteCartItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  const item = await Cart.findOne({
    $or: [{ userId }, { guestId: userId }],
    "items._id": id,
  });

  if (!item) {
    throw new ApiError(404, "Item not found.", []);
  }

  const deleteItem = await Cart.findByIdAndDelete(item.items[0]._id);

  if (!deleteItem) {
    throw new ApiError(500, "Failed to delete item.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Item deleted successfully."));
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

  await cart.save();

  return res
    .status(200)
    .json(new ApiResponse(200, { cart }, "Cart merged successfully."));
});

export { addItem, getCart, updateCart, deleteCartItem, mergeCart };
