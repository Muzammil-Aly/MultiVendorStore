import { asyncHandler } from "../utils/asynchandler.js";
import mongoose, { isValidObjectId } from "mongoose";
import { Product } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/Cloudinary.js";
import jwt from "jsonwebtoken";
import { Order } from "../models/order.model.js";

const createProduct = asyncHandler(async (req, res) => {
  const { description, title: rawTitle, price: rawPrice, tagline } = req.body;

  const title = JSON.parse(rawTitle);
  const price = JSON.parse(rawPrice);

  if (!description || !title || !price || !tagline) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const productImagePath = req.files?.productFile?.[0]?.path;
  if (!productImagePath) {
    throw new ApiError(400, "Product image is required");
  }

  const uploadedImage = await uploadOnCloudinary(productImagePath);

  const product = new Product({
    productImage: uploadedImage.url,
    description,
    title: {
      shortTitle: title.shortTitle,
      longTitle: title.longTitle,
    },
    price: {
      mrp: price.mrp,
      cost: price.cost,
      discount: price.discount || "0%",
    },
    tagline,
    owner: req.user._id,
  });

  const Productresponce = await product.save();

  return res
    .status(201)
    .json(
      new ApiResponse(200, Productresponce, "Product created successfully")
    );
});

const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ tagline: { $ne: "Title" } }); // Fetch products where tagline is not "Title"

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched successfully"));
});

const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid productId");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, product, "Individual product fetched succesfuuly")
    );
});

const addToCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid productId");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  const validUser = await User.findById(req.user._id);

  if (!validUser) {
    throw new ApiError(400, "Invalid User");
  }
  const cartItem = {
    product: product._id,
    price: product.price.cost, // only the number
    quantity: 1, // default quantity
  };

  const cartDetails = await validUser.addToCart(cartItem);
  await validUser.save();

  const productsInCart = await User.findById(req.user._id).populate(
    "carts.product"
  );
  // const totalQuantity = productsInCart.carts.reduce(
  //   (sum, item) => sum + item.quantity,
  //   0
  // );
  const totalQuantity = productsInCart.carts
    .filter(
      (item) => item && typeof item.quantity === "number" && item.quantity > 0
    )
    .reduce((sum, item) => sum + item.quantity, 0);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartDetails: cartDetails, totalQuantity: totalQuantity },
        "Added to cart  succesfuuly"
      )
    );
});

const cartDetails = asyncHandler(async (req, res) => {
  const productsInCart = await User.findById(req.user._id).populate(
    "carts.product"
  );

  if (!productsInCart) {
    throw new ApiError(404, " Details not found");
  }

  const totalQuantity = productsInCart.carts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        carts: productsInCart.carts,
        totalQuantity: totalQuantity,
      },
      "User cart fetched successfully"
    )
  );
});

const getUserProducts = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  const products = await Product.find({ owner: user._id });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched succesfuuly"));
});

const getSliderProducts = asyncHandler(async (req, res) => {
  const { tagline } = req.query;
  const products = await Product.find({ tagline: tagline });

  return res
    .status(200)
    .json(new ApiResponse(200, products, "Products fetched succesfuuly"));
});

const checkOut = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: "carts.product",
    populate: {
      path: "owner", // 👈 populate the owner (seller info)
      model: "User", // assuming your user model is called "User"
      select: "username fullName email", // only select needed fields
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (user.carts.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  // Group cart items by owner
  const itemsByOwner = {};

  user.carts.forEach((item) => {
    const ownerId = item.product.owner.toString();

    if (!itemsByOwner[ownerId]) {
      itemsByOwner[ownerId] = [];
    }

    itemsByOwner[ownerId].push({
      product: item.product._id,
      owner: item.product.owner,
      quantity: item.quantity,
      color: item.color,
      price: item.price,
    });
  });

  const createdOrders = [];

  // Now create an order for each owner
  for (const ownerId in itemsByOwner) {
    const items = itemsByOwner[ownerId];
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = new Order({
      buyerId: req.user._id,
      sellerId: ownerId, // Optional: you can add sellerId field if needed
      items: items,
      totalAmount: totalAmount,
    });

    await order.save();
    createdOrders.push(order);
  }

  // Clear user's cart
  user.carts = [];
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, createdOrders, "Orders placed successfully"));
});

const getMyOrders = asyncHandler(async (req, res) => {
  // const orders = await Order.find({ buyerId: req.user._id });

  const orders = await Order.find({ buyerId: req.user._id })
    .populate("items.product") // Populate full product info
    .sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiResponse(200, orders, "Orders fetched successfully"));
});

// GET /api/v1/seller/orders
const getSellerOrders = asyncHandler(async (req, res) => {
  const sellerId = req.user.id;

  // Find orders where any item belongs to this seller
  const orders = await Order.find({ "items.owner": sellerId })
    .populate("items.product")
    .populate("buyerId", "fullName email")
    .sort({ createdAt: -1 });

  const validUser = await User.findById(req.user._id);

  // ✅ Calculate total quantity from all items in all orders
  const totalQuantity = orders.reduce((total, order) => {
    const sellerItems = order.items.filter(
      (item) => item.owner.toString() === sellerId
    );
    const orderQuantity = sellerItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    return total + orderQuantity;
  }, 0);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { orders, totalQuantity },
        "Seller cart fetched successfully"
      )
    );
});

const removeFormCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId || !isValidObjectId(productId)) {
    throw new ApiError(400, "Invalid productId");
  }

  const product = await Product.findById(productId);

  if (!product) {
    throw new ApiError(404, "product not found");
  }

  const validUser = await User.findById(req.user._id);

  if (!validUser) {
    throw new ApiError(400, "Invalid User");
  }

  validUser.carts = validUser.carts.filter(
    (item) => item.product.toString() !== productId
  );

  await validUser.save();

  const productsInCart = await User.findById(req.user._id).populate(
    "carts.product"
  );
  const totalQuantity = productsInCart.carts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { cartDetails: cartDetails, totalQuantity: totalQuantity },
        "Remove from cart  succesfuuly"
      )
    );
});

const removeFormSellerOrder = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const sellerId = req.user._id;

  if (!orderId || !isValidObjectId(orderId)) {
    throw new ApiError(400, "Invalid orderId");
  }

  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // OPTIONAL: Verify the order belongs to this seller only
  const sellerOnlyOrder = order.items.every(
    (item) => item.owner.toString() === sellerId.toString()
  );

  if (!sellerOnlyOrder) {
    throw new ApiError(
      403,
      "You can only delete orders that belong entirely to you."
    );
  }

  await order.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Order deleted successfully"));
});

export {
  createProduct,
  getProducts,
  getProductById,
  addToCart,
  removeFormCart,
  cartDetails,
  getUserProducts,
  getSliderProducts,
  checkOut,
  getMyOrders,
  getSellerOrders,
  removeFormSellerOrder,
};
