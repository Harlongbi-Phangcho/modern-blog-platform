import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData && post.userid === userData.id

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        try {
          const response = await appwriteService.getPost(slug);
          if (response) {
            setPost(response);
          } else {
            navigate("/");
          }
        } catch (error) {
          console.error("Failed to get post", error);
          navigate("/");
        }
      };

      fetchPost();
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        await appwriteService.deleteFile(post.featuredimage);
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to delete post", error);
    }
  };

  return post ? (
  <div className="flex justify-center mx-4 py-10 bg-gray-100 min-h-screen">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg overflow-hidden relative">
        
        {/* Image */}
        <div className="w-full h-78 overflow-hidden">
          <img
            src={appwriteService.getFileView(post.featuredimage)}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Author Actions */}
        {userData && isAuthor && (
          <div className="absolute top-4 right-4 flex gap-2">
            <Link to={`/edit-post/${post.$id}`}>
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-lg shadow">
                Edit
              </button>
            </Link>
            <button
              onClick={deletePost}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg shadow"
            >
              Delete
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 text-gray-800">
            {post.title}
          </h1>

          <div className="prose max-w-none text-gray-700">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">Loading...</div>
  );
}

export default Post;
