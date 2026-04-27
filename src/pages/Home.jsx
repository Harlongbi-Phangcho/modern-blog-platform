import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response?.rows || []);
        }
      } catch (error) {
        console.error("Failed to fetch Post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Sort newest first
  const sortedPosts = [...posts].sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));

  const newestPost = sortedPosts[0];
  const oldestPost = sortedPosts[sortedPosts.length - 1];


  // LANDING PAGE (NOT LOGGED IN)
  if (!userData) {
    return (
      <div className="min-h-screen rounded bg-gray-50/48">
        {/* HERO */}
        <div className="text-center py-10 md:py-20 px-2 md:px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Share Your Thoughts with <span className="text-[#007f5f]">Stack</span><span className="text-[#38a3a5]">Stories</span>
          </h1>

          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            A modern platform to write, publish, and engage with blog posts.
            Create your own content, explore others, and join the conversation.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              to="/signup"
              className="bg-[#007f5f] hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="border border-gray-300 px-6 py-3 rounded-lg bg-[#38a3a5] hover:bg-gray-100"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-5xl mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-[#007f5f] text-lg mb-2">✍️ Write Posts</h3>
              <p className="text-gray-600 text-sm">
                Create and publish your own articles with ease.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-[#38a3a5] text-lg mb-2">💬 Engage</h3>
              <p className="text-gray-600 text-sm">
                Comment and interact with other users.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-semibold text-[#007f5f] text-lg mb-2">🖼️ Media Support</h3>
              <p className="text-gray-600 text-sm">
                Upload images and enhance your content.
              </p>
            </div>
          </div>
        </div>

        {/* OPTIONAL: SHOW PREVIEW POSTS */}
        {sortedPosts.length > 0 && (
          <Container>
            <h2 className="text-2xl font-bold mb-6 text-center">
              Latest Posts
            </h2>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {sortedPosts.slice(0, 3).map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          </Container>
        )}
      </div>
    );
  }

 
  // LOADING STATE
 
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <h1 className="text-2xl font-semibold text-gray-700">
          Loading posts...
        </h1>
      </div>
    );
  }


  // NO POSTS
 
  if (posts.length === 0) {
    return (
      <div className="flex justify-center min-h-[60vh] text-center px-4">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            No posts available
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Start by creating your first post.
          </p>
        </Container>
      </div>
    );
  }

 
  // DASHBOARD (LOGGED IN)
  
  return (
    <div className="py-10 bg-gray-100/60 rounded min-h-screen">
      <Container>
        {/* Welcome */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {userData?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Explore and manage your content
          </p>
        </div>

        {/* STATS */}
        <div className="mb-8 grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-xl font-semibold">{posts.length}</p>
            <p className="text-sm text-gray-500">Total Posts</p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Newest Post</p>
            <p className="text-md font-semibold truncate">
              {newestPost?.title || "N/A"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <p className="text-sm text-gray-500">Oldest Post</p>
            <p className="text-md font-semibold truncate">
              {oldestPost?.title || "N/A"}
            </p>
          </div>
        </div>

        {/* POSTS */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Latest Posts
          </h1>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}