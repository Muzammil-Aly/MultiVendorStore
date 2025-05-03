import React, { useEffect, useState } from "react";
import Checkout from "./Checkout";
import { useAuth } from "../ContextProvider/Contextprovider";
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
function ShowCart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartQuantity, setCartQuantity } = useAuth();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch("/api/v1/product/cartDetails", {
          credentials: "include",
        });
        const data = await res.json();

        const carts = data.data?.carts || [];
        const totalQuantity = data.data?.totalQuantity || 0;

        setCartItems(carts);
        setCartQuantity(totalQuantity);
      } catch (error) {
        console.error("❌ Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(
        `/api/v1/product/removeFormCart/${productId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success("Removed from cart");

        // Update local state
        setCartItems((prev) =>
          prev.filter((item) => item.product._id !== productId)
        );
        setCartQuantity(result.data?.totalQuantity);
      } else {
        console.error("❌ Failed:", result.message);
        toast.error("Failed to remove from cart");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong");
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.product.price.cost,
    0
  );

  if (loading)
    return (
      <div className="text-center text-lg text-gray-500 mt-8">Loading...</div>
    );

  if (!cartItems.length)
    return (
      <div className="bg-[#f7f9fa] min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-8">
        {/* Empty Cart Image */}
        <img
          src="https://cdn-icons-png.flaticon.com/512/107/107831.png" // Image representing an empty cart, replace with your own image if needed
          alt="Empty Cart"
          className="mx-auto mb-6 w-40 h-40 object-contain"
        />
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Looks like you haven't added anything to your cart yet. Start shopping
          now!
        </p>
        <button
          onClick={() => navigate("/all-posts")} // Redirect to shop or product page
          className="bg-[#ff6200] text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-[#ff4e00] transition duration-300"
        >
          Start Shopping
        </button>
      </div>
    );

  return (
    <div className="bg-[#f7f9fa] min-h-screen py-8 px-4 sm:px-8">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        🛒 Your Cart ({cartQuantity} items)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {cartItems.map((item, index) => {
          const product = item.product;
          if (!product) return null;

          return (
            <div
              key={item._id || index}
              className="bg-white shadow-lg rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex flex-col sm:flex-row p-4 space-y-4 sm:space-y-0 sm:space-x-4">
                {/* Product Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32">
                  <img
                    src={product.productImage}
                    alt={product.title.shortTitle}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Product Info and Button */}
                <div className="flex-1 flex flex-col justify-between">
                  {/* Info */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {product.title.shortTitle}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {product.title.longTitle}
                    </p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs text-gray-500">
                        Color: {item.color}
                      </p>
                      <p className="text-xs text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-xs text-gray-500">
                        Price per unit: Rs {product.price.cost}
                      </p>
                      <p className="font-semibold text-gray-900">
                        Total: Rs {item.quantity * product.price.cost}
                      </p>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="mt-4 self-end">
                    <button
                      onClick={() => removeFromCart(product._id)}
                      className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#222] transition duration-300"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total Price */}
      <div className="mt-6 text-center font-semibold text-lg text-gray-900">
        <p>Total Price: Rs {totalPrice}</p>
      </div>

      {/* Checkout */}
      <div className="mt-6 flex justify-center">
        <Checkout />
      </div>
    </div>
  );
}

export default ShowCart;
