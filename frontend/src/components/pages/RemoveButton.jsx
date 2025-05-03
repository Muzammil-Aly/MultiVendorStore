import React from "react";
import axios from "axios";
import { toast } from "react-toastify";

const RemoveButton = ({ orderId }) => {
  const handleRemove = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/product/removeFormSellerCart/${orderId}`
      );
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      console.error(
        "Failed to remove item:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <button
      onClick={handleRemove}
      className="remove-button"
      style={{
        padding: "8px 16px",
        backgroundColor: "#dc3545",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
      }}
    >
      Remove
    </button>
  );
};

export default RemoveButton;
