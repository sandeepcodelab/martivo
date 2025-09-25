import mongoose, { Schema } from "mongoose";

const cartModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    guestId: {
      type: String,
    },
    items: [
      {
        type: String,
      },
    ],
    expiryAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartModel);
