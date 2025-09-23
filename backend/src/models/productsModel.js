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
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },
    thumbnail: {
      url: {
        type: String,
        default:
          "https://placehold.co/450x400/31343C/EEE?font=raleway&text=Image",
      },
      localPath: {
        type: String,
        default: "",
      },
    },
    images: [
      {
        url: {
          type: String,
          default:
            "https://placehold.co/450x400/31343C/EEE?font=raleway&text=Image",
        },
        localPath: {
          type: String,
          default: "",
        },
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "out_of_stock"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
