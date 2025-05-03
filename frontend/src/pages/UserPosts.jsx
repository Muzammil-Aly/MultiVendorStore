import React, { useState, useEffect } from "react";
import { Container, PostCard } from "../components/index";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function UserPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();

  // const res = await fetch(`/api/v1/product/getProductById/${slug}`);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/v1/product/getUserProducts/${slug}`);

        // const response = await fetch("/api/v1/product/getUserProducts");
        const data = await response.json();

        // Check if data is properly structured
        console.log("API Response Data:", data);

        if (data && data.data) {
          setPosts(data.data); // Assuming 'data' is an array of posts
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
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
            <p className="ml-4 text-blue-600 font-medium">Loading posts...</p>
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

export default UserPosts;
