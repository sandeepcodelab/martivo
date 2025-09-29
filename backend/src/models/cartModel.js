import mongoose, { Schema } from "mongoose";

const cartModel = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: undefined,
    },
    guestId: {
      type: String,
      default: undefined,
    },
    items: [
      {
        variantId: {
          type: Schema.Types.ObjectId,
          ref: "Variant",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
          default: 1,
        },
      },
    ],
    expiryAt: {
      type: Date,
      default: null,
      index: {
        expires: 0,
      },
    },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartModel);
