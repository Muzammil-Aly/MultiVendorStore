import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/v1/product/getProducts");
        const data = await response.json();

        if (data && data.data) {
          setPosts(data.data);
        } else {
          console.error(
            "Failed to fetch posts:",
            data.message || "Unknown error"
          );
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-full py-10 bg-gray-50">
      <Container>
        {loading ? (
          <div className="flex flex-col justify-center items-center h-64">
            {/* Maroon colored loader text */}
            <p className="text-xl font-semibold text-[#800000] mb-4">
              Loading vendor posts...
            </p>

            {/* Loader animation */}
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#800000]"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-8">
            <h1 className="text-2xl font-bold text-gray-600 hover:text-gray-500">
              Login to read posts
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
