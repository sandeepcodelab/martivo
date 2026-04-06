import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    slug: {
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
      ref: "Category",
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
    minPrice: Number,
    maxPrice: Number,
    status: {
      type: Boolean,
      default: false,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual schema
productSchema.virtual("variants", {
  ref: "Variant",
  localField: "_id",
  foreignField: "product",
});

productSchema.set("toJSON", { virtuals: true });
productSchema.set("toObject", { virtuals: true });

export const Product = mongoose.model("Product", productSchema);
