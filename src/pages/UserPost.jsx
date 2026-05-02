import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { useSelector } from "react-redux";
import { Container, PostCard } from "../components";
import { Query } from "appwrite";

function UserPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = useSelector((state) => state.auth.userData);
  console.log("Fetching user posts for user ID:", userData);

  useEffect(() => {
    if (!userData) {
      return;
    }
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getUserPosts([userData.id]);

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
  }, []);

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
    <div className="py-10 bg-gray-100/60 rounded min-h-screen">
      <Container>
        <h1 className="text-2xl font-semibold text-gray-700 mb-6">
          Your Posts
        </h1>
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
