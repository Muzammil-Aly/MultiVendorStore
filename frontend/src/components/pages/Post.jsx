import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddToBag from "../addToBag";

const Post = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/v1/product/getProductById/${slug}`);
        const data = await res.json();
        setPost(data.data); // Adjust based on your API structure
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Error: Product not found.</p>;
  }

  return (
    <>
      <div className="py-12 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images Section */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="relative w-full h-96 rounded-xl overflow-hidden">
                <a href="#">
                  <img
                    src={post.productImage}
                    alt={post.title.shortTitle}
                    className="w-full h-full object-contain rounded-xl"
                  />
                </a>
              </div>

              <div className="flex gap-4">
                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                  <a href="#">
                    <img
                      src={post.productImage}
                      alt={post.title.shortTitle}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </a>
                </div>

                <div className="relative w-full h-96 rounded-xl overflow-hidden">
                  <a href="#">
                    <img
                      src={post.productImage}
                      alt={post.title.shortTitle}
                      className="w-full h-full object-contain rounded-xl"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex-1">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h2 className="text-3xl font-semibold text-gray-800">
                  {post.title.shortTitle}
                </h2>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-xl font-bold text-gray-900">
                    {post.price.mrp}
                  </p>
                  <p className="text-lg text-gray-500">Rs.3,495.00</p>
                </div>
                <p className="text-gray-500 mt-2">SKU: 0002PSG24V14-XSM-999</p>
                <p className="text-gray-500 mt-2">SIZE: M</p>

                {/* Size Selection */}
                <div className="mt-4">
                  <div className="flex gap-3">
                    {["XXS", "XS", "S", "M", "L", "XL"].map((size) => (
                      <button
                        key={size}
                        className="py-2 px-4 bg-gray-200 text-gray-800 rounded-full hover:bg-gray-300 transition duration-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Bag */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="text-2xl font-bold bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
                      -
                    </button>
                    <span className="text-lg font-semibold">01</span>
                    <button className="text-2xl font-bold bg-gray-200 p-2 rounded-full hover:bg-gray-300 transition duration-300">
                      +
                    </button>
                  </div>
                  <AddToBag post={post} />
                </div>

                {/* Product Info */}
                <div className="mt-6 text-gray-600">
                  <div className="mt-4 text-sm text-gray-500">
                    <p className="font-semibold">Note:</p>
                    <p>{post.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
