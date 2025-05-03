import { Router } from "express";

import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addToCart,
  cartDetails,
  checkOut,
  createProduct,
  getMyOrders,
  getProductById,
  getProducts,
  getSellerOrders,
  getSliderProducts,
  getUserProducts,
  removeFormCart,
  removeFormSellerOrder,
} from "../controllers/product.controller.js";

const router = Router();

// router.route("/register").post(registerUser);

router
  .route("/register")
  .post(
    upload.fields([{ name: "productFile", maxCount: 1 }]),
    verifyJwt,
    createProduct
  );

router.route("/getProducts").get(getProducts);
router.route("/getUserProducts/:userId").get(verifyJwt, getUserProducts);
// Route expecting query parameter
router.route("/getSliderProducts").get(getSliderProducts);

router.route("/getProductById/:productId").get(getProductById);
router.route("/addToCart/:productId").post(verifyJwt, addToCart);
router.route("/cartDetails").get(verifyJwt, cartDetails);

router.route("/checkOut").get(verifyJwt, checkOut);
router.get("/myorders", verifyJwt, getMyOrders);
router.get("/sellerOrders", verifyJwt, getSellerOrders);

router.route("/removeFormCart/:productId").post(verifyJwt, removeFormCart);

router
  .route("/removeFormSellerCart/:orderId")
  .delete(verifyJwt, removeFormSellerOrder);

// router.get("/removeFormCart", verifyJwt, removeFormCart);

// router.route("/login").post(loginUser);

// // secure routes
// router.route("/logout").post(verifyJwt, logoutUser);
// router.route("/delete").delete(verifyJwt, deleteUser);

// router.route("/refresh-token").post(refreshAccessToken);
// router.route("/change-password").post(verifyJwt, changeCurrentPassword);
// router.route("/current-user").post(verifyJwt, getCurrentUser);
// router.route("/update-account").patch(verifyJwt, updateAccountDetails);
// router.route("/update-username").patch(verifyJwt, updateUserName);
// router
//   .route("/avatar")
//   .patch(verifyJwt, upload.single("avatar"), updateUserAvatar);
export default router;
