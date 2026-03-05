import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";
import { Variant } from "../models/variantModel.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { fullName, address, city, postalCode, state, phone, paymentMethod } =
    req.body || {};

  if (!fullName || !address || !city || !postalCode || !state || !phone) {
    throw new ApiError(400, "All shipping address fields are required.");
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    throw new ApiError(400, "Phone number must be 10 digits.");
  }

  const allowedPaymentMethods = ["COD", "Card", "UPI"];

  if (!paymentMethod || !allowedPaymentMethods.includes(paymentMethod)) {
    throw new ApiError(400, "Invalid or missing payment method.");
  }

  const getUserCart = await Cart.findOne({ userId: user._id }).populate(
    "items.variantId"
  );

  if (!getUserCart || !getUserCart.items.length) {
    throw new ApiError(
      400,
      "Your cart is empty. Please add items before checkout."
    );
  }

  const orderItems = getUserCart.items.map((item) => ({
    variant: item.variantId._id,
    product: item.variantId.product,
    quantity: item.quantity,
    priceAtPurchase: item.variantId.price,
  }));

  const totalPrice = getUserCart.items.reduce(
    (totalPrice, item) => totalPrice + item.variantId.price * item.quantity,
    0
  );

  const order = await Order.create({
    userId: user._id,
    orderItems,
    totalPrice,
    shippingAddress: {
      fullName,
      phone,
      address,
      city,
      postalCode,
      state,
    },
    paymentMethod,
  });

  if (!order) {
    throw new ApiError(500, "Failed to create order.");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, order, "Order created successfully."));
});

export { createOrder };
