import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/v1/product/checkout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      let ordersData = response.data.data;
      if (!Array.isArray(ordersData)) {
        ordersData = [ordersData];
      }
      setOrders(ordersData);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 rounded-sm bg-gray-50 shadow-lg font-san">
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}

      {orders.length > 0 && (
        <div className="mt-8 space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded-md bg-white">
              <h3 className="text-2xl font-bold text-gray-700 border-b pb-2 mb-6">
                Order Summary
              </h3>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-semibold">{order._id}</span>
              </div>

              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-semibold">${order.totalAmount}</span>
              </div>

              <div className="mt-8">
                <h4 className="text-xl font-semibold text-gray-600 mb-4">
                  Items
                </h4>
                <ul className="space-y-4">
                  {order.items.map((item) => {
                    // Log item to check owner data
                    console.log(item);

                    return (
                      <li
                        key={item._id}
                        className="bg-gray-100 p-4 rounded-md shadow-sm"
                      >
                        <div className="mb-1">
                          <strong>Seller:</strong>{" "}
                          {item.owner.fullName || "Unknown Seller"}
                        </div>
                        <div className="mb-1">
                          <strong>Product ID:</strong> {item.product}
                        </div>
                        <div className="mb-1">
                          <strong>Quantity:</strong> {item.quantity}
                        </div>
                        <div>
                          <strong>Price:</strong> ${item.price}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex justify-between items-center mt-8 pt-4 border-t">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold">{order.paymentStatus}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={handleCheckout}
        disabled={loading || orders.length > 0}
        className="w-full p-3 text-white bg-black hover:bg-gray-900 rounded-md text-lg font-semibold transition duration-300 tracking-wide uppercase shadow-md hover:shadow-lg mt-6"
      >
        {loading
          ? "Processing..."
          : orders.length > 0
          ? "Order Placed"
          : "Place Order"}
      </button>
    </div>
  );
};

export default Checkout;
