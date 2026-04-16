import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.rows);
        }
      } catch (error) {
        console.error("Failed to fetch Post", error);
      }
    };
    fetchPosts();
  }, []);

  if (posts.length === 0) {
    return (
     <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            {!userData ? "Login to read posts" : "No posts available"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {!userData
              ? "Access your account to explore content."
              : "Start by creating your first post."}
          </p>
        </Container>
      </div>
    );
  }

  return (
     <div className="py-10 bg-gray-100 min-h-screen">
      <Container>
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Latest Posts
          </h1>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
