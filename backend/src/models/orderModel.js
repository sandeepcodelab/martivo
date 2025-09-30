import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    items: [
      {
        type: String,
      },
    ],
    totalAmount: {
      type: number,
    },
    status: {
      type: String,
    },
    payment: {
      type: String,
    },
    shippingAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
