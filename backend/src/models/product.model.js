import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema(
  {
    productImage: {
      type: String, //cloudinary url
      required: true,
    },
    description: {
      type: String, //cloudinary url
      required: true,
    },
    title: {
      shortTitle: {
        type: String,
        required: true,
      },
      longTitle: {
        type: String,
        required: true,
      },
    },

    price: {
      mrp: {
        type: Number,
        required: true,
        min: 0,
      },
      cost: {
        type: Number,
        required: true,
        min: 0,
      },
      discount: {
        type: String,
        default: "0%", // Optional default
      },
    },
    tagline: {
      type: String,
      required: true,
      maxlength: 100, // optional character limit
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", ProductSchema);
