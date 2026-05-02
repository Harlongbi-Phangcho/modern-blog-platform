import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { Query } from "appwrite";
import { Link } from "react-router-dom";

function UserPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  console.log("Fetching user posts for user ID:", userData);

  useEffect(() => {
    if (!userData?.id) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getUserPosts(userData.id);

        if (response) {
          setPosts(response.rows);
        }
      } catch (error) {
        console.error("Failed to get user posts", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userdata]);

  //sort newest first
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.$createdAt) - new Date(a.$createdAt),
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            Loading your posts...
          </h1>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            You haven't created any posts yet.
          </h1>
        </Container>
      </div>
    );
  }

  return (
    <div className="py-5 bg-gray-100/60 rounded min-h-screen">
      <Container>
        <div className="flex justify-between flex-wrap items-center mb-8">
          <div className="mb-2">
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Your Posts
            </h1>
            <p className="text-sm font-semibold text-gray-500 ">
              All your posts you've created. Sorted by latest
            </p>
          </div>

          <Link
            to="/add-post"
            className="bg-indigo-500 px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-blue-600"
          >
            + Add post
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}
export default UserPost;
