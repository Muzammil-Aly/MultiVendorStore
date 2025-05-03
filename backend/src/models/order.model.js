import mongoose, { Schema } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // links to the buyer
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", // link to product
          required: true,
        },
        owner: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // link to seller (owner of the product)
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        color: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        status: {
          type: String,
          default: "pending", // order status (pending, completed, etc.)
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      default: "pending", // payment status (pending, completed)
    },
  },
  { timestamps: true }
); // createdAt, updatedAt

export const Order = mongoose.model("Order", orderSchema);
