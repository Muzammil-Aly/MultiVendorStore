import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import ContextProvider from "../src/components/ContextProvider/Contextprovider.jsx"; // Adjust path if needed
import { AuthProvider } from "./components/ContextProvider/Contextprovider.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignUp from "./components/auth/Signup.jsx";
import SignIn from "./components/auth/SignIn.jsx";
import AllPosts from "./pages/AllPosts.jsx";
import ShowCart from "./components/pages/showCart.jsx";
import AddProduct from "./pages/addProduct.jsx";
import UserCard from "./pages/UserCard.jsx";
import AllUsers from "./pages/Allusers.jsx";
import Post from "./components/pages/Post.jsx";
import UserPosts from "./pages/UserPosts.jsx";
import Home from "./components/Home/pages/Home.jsx";
import { ApiProvider } from "./components/ContextProvider/ApiContext.jsx";
import Checkout from "./components/pages/Checkout.jsx";
import MyOrders from "./components/pages/MyOrders.jsx";
import SellerOrders from "./components/pages/SellerOrders.jsx";
import AccountInfo from "./components/Header/AccountInfo.jsx";
import AuthLayout from "./components/ContextProvider/AuthLayout.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signUp",
        element: (
          <AuthLayout authentication={false}>
            <SignUp />
          </AuthLayout>
        ),
      },
      {
        path: "/SignIn",
        element: (
          <AuthLayout authentication={false}>
            <SignIn />
          </AuthLayout>
        ),
      },

      {
        path: "/all-posts",
        element: (
          // <AuthLayout authentication={false}>
          <AllPosts />
          // </AuthLayout>
        ),
      },
      {
        path: "/cart-details",
        element: (
          <AuthLayout authentication>
            <ShowCart />
          </AuthLayout>
        ),
      },
      {
        path: "/add-product",
        element: (
          <AuthLayout authentication>
            <AddProduct />
          </AuthLayout>
        ),
      },
      {
        path: "/account-info",
        element: (
          <AuthLayout authentication>
            <AccountInfo />
          </AuthLayout>
        ),
      },

      ,
      {
        path: "/all-users",
        element: (
          <AuthLayout authentication>
            <AllUsers />
          </AuthLayout>
        ),
      },
      {
        path: "/debug",
        element: (
          <AuthLayout authentication>
            <MyOrders />
          </AuthLayout>
        ),
      },
      {
        path: "/seller",
        element: (
          <AuthLayout authentication>
            <SellerOrders />
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug",
        element: (
          <AuthLayout authentication>
            <Post />
          </AuthLayout>
        ),
      },
      // const res = await fetch(`/api/v1/product/getUserProducts/${slug}`);
      {
        path: "/userPost/:slug",
        element: (
          <AuthLayout authentication>
            <UserPosts />
          </AuthLayout>
        ),
      },

      // {
      //   path: "/all-posts",
      //   element: (
      //     <AuthLayout authentication>
      //       {" "}
      //       <AllPosts />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/add-post",
      //   element: (
      //     <AuthLayout authentication>
      //       {" "}
      //       <AddPost />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/edit-post/:slug",
      //   element: (
      //     <AuthLayout authentication>
      //       {" "}
      //       <EditPost />
      //     </AuthLayout>
      //   ),
      // },
      // {
      //   path: "/post/:slug",
      //   element: <Post />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
      {/* <App /> */}
    </AuthProvider>
  </React.StrictMode>
);
