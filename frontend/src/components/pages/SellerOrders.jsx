import React, { useEffect, useState } from "react";
import { useApi } from "../ContextProvider/ApiContext";
import { toast } from "react-toastify";
import { useAuth } from "../ContextProvider/Contextprovider";
import RemoveButton from "./RemoveButton";

const SellerOrders = () => {
  const { sellerCartDetails } = useApi();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { sellerOrderQuantity, setSellerOrderQuantity } = useAuth();

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const response = await sellerCartDetails();
        const result = response.data.data;
        const { orders, totalQuantity } = result;

        if (Array.isArray(orders)) {
          setOrders(orders);
        } else {
          setOrders([]);
          console.warn("Expected orders to be an array.");
        }

        setSellerOrderQuantity(totalQuantity);
        localStorage.setItem("sellerOrderQuantity", totalQuantity || 0);
      } catch (error) {
        console.error("Error fetching seller orders:", error);
        toast.error("Something went wrong while loading orders.");
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, [sellerCartDetails]);

  if (loading) return <p className="text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-gray-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Seller Orders</h1>
      <p className="text-gray-600 mb-8">
        <strong>Total Orders:</strong> {sellerOrderQuantity}
      </p>

      {orders.length === 0 ? (
        <p className="text-lg text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-blue-600">
                  Order ID: {order._id}
                </h2>
                <p className="text-sm text-gray-500">
                  Placed on:{" "}
                  <span className="font-medium">
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </p>
              </div>

              <div className="text-sm text-gray-700 mb-4 space-y-2">
                <p>
                  <strong>Client Name:</strong> {order.buyerId.fullName}
                </p>
                <p>
                  <strong>Buyer ID:</strong> {order.buyerId._id}
                </p>
                <p>
                  <strong>Total Amount:</strong> ${order.totalAmount}
                </p>
                <p>
                  <strong>Payment Status:</strong>{" "}
                  <span
                    className={`font-semibold ${
                      order.paymentStatus === "Paid"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </p>
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Items
              </h3>

              <ul className="space-y-6">
                {order.items.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-col md:flex-row gap-6 p-4 bg-gray-50 rounded-lg border border-gray-100 shadow-sm transition-all duration-300 hover:scale-[1.02]"
                  >
                    <img
                      src={
                        item.product.productImage ||
                        "https://via.placeholder.com/120"
                      }
                      alt={item.product.title.shortTitle}
                      className="w-32 h-32 object-cover rounded-md border"
                    />
                    <div className="flex-1 text-sm text-gray-700 space-y-2">
                      <h4 className="text-base font-semibold text-gray-800">
                        {item.product.title.shortTitle}
                      </h4>
                      <p>
                        <strong>Long Title:</strong>{" "}
                        {item.product.title.longTitle}
                      </p>
                      <p>
                        <strong>Description:</strong> {item.product.description}
                      </p>
                      <p>
                        <strong>Tagline:</strong> {item.product.tagline}
                      </p>
                      <p>
                        <strong>Price:</strong> ${item.price}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Status:</strong> {item.status}
                      </p>
                      {item.color && (
                        <p>
                          <strong>Color:</strong> {item.color}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex justify-end">
                <RemoveButton orderId={order._id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
