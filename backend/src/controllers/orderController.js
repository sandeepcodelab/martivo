import { Cart } from "../models/cartModel.js";
import { Order } from "../models/orderModel.js";
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
    user: user._id,
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

const getUserOrders = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId }).populate({
    path: "orderItems.product",
    select: "thumbnail title",
  });

  if (!orders) {
    throw new ApiError(404, "No orders found.");
  }

  if (!orders.length) {
    return res
      .status(200)
      .json(new ApiResponse(200, { orders }, "Your Order History is Empty."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { orders }, "Orders fetched successfully."));
});

const getAllOrders = asyncHandler(async (req, res) => {
  let { search = "", page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  if (page < 1) page = 1;
  if (limit < 10) page = 10;

  const skip = (page - 1) * limit;

  const matchStage = {};

  // Search logic
  if (search && search.trim()) {
    matchStage.$or = [
      { "user.name": { $regex: search, $options: "i" } },
      { paymentMethod: { $regex: search, $options: "i" } },
      { orderStatus: { $regex: search, $options: "i" } },
      { "paymentResult.status": { $regex: search, $options: "i" } },
    ];

    // ObjectId search
    if (Order.db.base.Types.ObjectId.isValid(search)) {
      const objectId = new Order.db.base.Types.ObjectId(search);

      matchStage.$or.push({ _id: objectId }, { "user._id": objectId });
    }
  }

  const orders = await Order.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },

    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },

    ...(search && search.trim() ? [{ $match: matchStage }] : []),

    {
      $facet: {
        data: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: limit },
        ],
        totalRecords: [{ $count: "count" }],
      },
    },
  ]);

  const total = orders[0].totalRecords[0]?.count || 0;

  if (!orders) {
    throw new ApiError(404, "No orders found.");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        orders: orders[0].data,
        pageInfo: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
      "Orders fetched successfully."
    )
  );
});

const getSingleOrder = asyncHandler(async (req, res) => {
  const { id = "" } = req.params;

  if (!id) {
    throw new ApiError(400, "Order id is required.", []);
  }

  const order = await Order.findById(id).populate([
    "user",
    "orderItems.product",
    "orderItems.variant",
  ]);

  if (!order) {
    throw new ApiError(404, "Order not found.", []);
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { order }, "Order fetched successfully."));
});

const updateOrder = asyncHandler(async (req, res) => {
  const { id = "" } = req.params;
  const { status = "", paymentStatus = "" } = req.body;

  if (!id) {
    throw new ApiError(400, "Order id is required.", []);
  }

  const order = await Order.findById(id);

  if (!order) {
    throw new ApiError(404, "Order not found.", []);
  }

  const updateOrder = await Order.findByIdAndUpdate(
    id,
    {
      $set: {
        orderStatus: status ? status : order.orderStatus,
        "paymentResult.status": paymentStatus
          ? paymentStatus
          : order.paymentResult.status,
      },
    },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found.", []);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { order: updateOrder },
        "Order status updated successfully."
      )
    );
});

export {
  createOrder,
  getUserOrders,
  getAllOrders,
  getSingleOrder,
  updateOrder,
};
