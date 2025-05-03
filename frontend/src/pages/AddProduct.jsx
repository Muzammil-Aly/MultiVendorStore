import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

const AddProduct = () => {
  const [productData, setProductData] = useState({
    productFile: null,
    description: "",
    title: {
      shortTitle: "",
      longTitle: "",
    },
    price: {
      mrp: 0,
      cost: 0,
      discount: "",
    },
    tagline: "",
  });

  const [preview, setPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "productFile") {
      const file = files[0];
      setProductData((prev) => ({ ...prev, productFile: file }));
      setPreview(URL.createObjectURL(file));
      return;
    }

    const keys = name.split(".");
    if (keys.length === 2) {
      const [outerKey, innerKey] = keys;
      setProductData((prev) => ({
        ...prev,
        [outerKey]: {
          ...prev[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      setProductData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productFile", productData.productFile);
    formData.append("description", productData.description);
    formData.append("title", JSON.stringify(productData.title));
    formData.append("price", JSON.stringify(productData.price));
    formData.append("tagline", productData.tagline);

    try {
      const res = await fetch("/api/v1/product/register", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Product uploaded successfully!");
        setProductData({
          productFile: null,
          description: "",
          title: { shortTitle: "", longTitle: "" },
          price: { mrp: 0, cost: 0, discount: "" },
          tagline: "",
        });
        setPreview(null);
      } else {
        toast.error("❌ " + (data.message || "Upload failed."));
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("❌ Network error or server down.");
    }
  };

  return (
    <>
      <div className="max-w-3xl mx-auto mt-12 px-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-md space-y-8 border border-gray-200"
          encType="multipart/form-data"
        >
          <h2 className="text-2xl font-semibold text-gray-800 text-center">
            Add New Product
          </h2>

          <div className="flex flex-col items-center">
            <input
              type="file"
              accept="image/*"
              name="productFile"
              onChange={handleInputChange}
              className="w-full cursor-pointer file:cursor-pointer text-gray-600 file:py-2 file:px-4 file:border file:rounded-md file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              required
            />
            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-32 h-32 object-cover rounded-full border shadow"
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="description"
              placeholder="Product Description"
              value={productData.description}
              onChange={handleInputChange}
              className="input-style"
              required
            />
            <input
              type="text"
              name="tagline"
              placeholder="Product Tagline"
              value={productData.tagline}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input
              type="text"
              name="title.shortTitle"
              placeholder="Short Title"
              value={productData.title.shortTitle}
              onChange={handleInputChange}
              className="input-style"
              required
            />
            <input
              type="text"
              name="title.longTitle"
              placeholder="Long Title"
              value={productData.title.longTitle}
              onChange={handleInputChange}
              className="input-style"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <input
              type="number"
              name="price.mrp"
              placeholder="MRP"
              value={productData.price.mrp}
              onChange={handleInputChange}
              className="input-style"
              required
            />
            <input
              type="number"
              name="price.cost"
              placeholder="Cost"
              value={productData.price.cost}
              onChange={handleInputChange}
              className="input-style"
              required
            />
            <input
              type="text"
              name="price.discount"
              placeholder="Discount (e.g. 10%)"
              value={productData.price.discount}
              onChange={handleInputChange}
              className="input-style"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
          >
            Upload Product
          </button>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default AddProduct;
