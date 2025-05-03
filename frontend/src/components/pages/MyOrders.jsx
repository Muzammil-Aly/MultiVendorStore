import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await axios.get("/api/v1/product/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(response.data.data); // array of orders
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">My Orders</h2>

      {loading && <p className="text-lg text-gray-600">Loading orders...</p>}
      {error && <p className="text-lg text-red-600">{error}</p>}
      {orders.length === 0 && !loading && (
        <p className="text-lg text-gray-500">No orders found.</p>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-xl border border-gray-200 p-6 transition-transform transform hover:scale-[1.02]"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                Order ID: <span className="text-blue-600">{order._id}</span>
              </h3>
              <p className="text-sm text-gray-500">
                Placed on:{" "}
                <span className="font-medium">
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </p>
            </div>

            <div className="flex gap-6 mb-4">
              <p className="font-medium text-lg text-gray-900">
                Total:{" "}
                <span className="text-green-600">${order.totalAmount}</span>
              </p>
              <p className="font-medium text-sm text-gray-600">
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    order.paymentStatus === "Paid"
                      ? "text-green-600"
                      : "text-yellow-600"
                  } font-semibold`}
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            <h4 className="text-lg font-semibold text-gray-700 mb-4">Items</h4>

            <div className="space-y-6">
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center gap-6 bg-gray-50 p-4 rounded-lg shadow-sm"
                >
                  <img
                    src={
                      item.product.productImage ||
                      "https://via.placeholder.com/80"
                    }
                    alt={item.product.name || "Product"}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">
                      {item.product.name || "Unnamed Product"}
                    </p>
                    <div className="text-sm text-gray-600">
                      <p>Color: {item.color || "Default"}</p>
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
