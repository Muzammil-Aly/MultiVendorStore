import React, { useState } from "react";
import { useAuth } from "./ContextProvider/Contextprovider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useApi } from "./ContextProvider/ApiContext";

function AddToBag({ post }) {
  const { addtoCart } = useApi();
  const { _id } = post;
  const { status, setCartQuantity } = useAuth();
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.preventDefault();

    if (!status) {
      toast.error("Login or Sign up first");
      return;
    }

    try {
      const response = await addtoCart(_id);
      const result = response.data;

      if (result.success) {
        toast.success("Added to cart");
        setData(result.data);
        setCartQuantity(result.data?.totalQuantity || 0);
        localStorage.setItem("cartQuantity", result.data?.totalQuantity || 0);
      } else {
        toast.error(result.message || "Failed to add to cart");
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <button
        onClick={handleAddToCart}
        className="mt-[50px] bg-black text-white px-6 py-2 rounded-md text-[12px] font-semibold hover:bg-[#222] transition duration-300"
      >
        ADD TO BAG
      </button>
    </div>
  );
}

export default AddToBag;
