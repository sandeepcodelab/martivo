import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    productImage: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/450x400/31343C/EEE?font=raleway&text=Image",
        localPath: "",
      },
    },
    productSubImage: {
      type: [
        {
          url: String,
          default:
            "https://placehold.co/450x400/31343C/EEE?font=raleway&text=Image",
        },
        {
          localPath: String,
          default: "",
        },
      ],
      default: [],
    },
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "inactive",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
