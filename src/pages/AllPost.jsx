import React, { useEffect} from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLoading } from "../store/postSlice";

function AllPost() {
  const dispatch = useDispatch();
  const {posts, loading} = useSelector((state) => state.post);

  useEffect(() => {
    const fetchPosts = async () => {
      dispatch(setLoading(true));
      try {
        const response = await appwriteService.getPosts([]);

        if (response) {
          dispatch(setPosts(response.rows));
        }
      } catch (error) {
        console.error("Failed to get posts", error);
      } finally {
        dispatch(setLoading(false));
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
            Loading posts...
          </h1>
        </Container>
      </div>
    );
  }
  // empty state
  if (posts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-center px-4">
        <Container>
          <h1 className="text-2xl font-semibold text-gray-700">
            {!post.length ? "Login to read posts" : "No posts available"}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {!posts.length
              ? "Access your account to explore posts."
              : "Start by creating your first post."}
          </p>
        </Container>
      </div>
    );
  }
  return (
    <div className="py-10 bg-gray-100/60 rounded min-h-screen">
      <Container>
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">All Posts</h1>
        </div>

        {/* Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
