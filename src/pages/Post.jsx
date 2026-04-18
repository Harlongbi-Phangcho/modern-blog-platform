import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentsText, setCommentsText] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userid === userData.id : false;

  // Post
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

  // Comments
  useEffect(() => {
    
    if (post?.$id) {
      const fetchComments = async () => {
        try {
          const response = await appwriteService.getComment(post.$id);
          if (response) {
            setComments(response.rows || []);
          }
        } catch (error) {
          console.error("Failed to fetch comments", error);
        } finally {
          setLoadingComments(false);
        }
      };
      fetchComments();
    }
  }, [post?.$id]);

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

  const handleComment = async () => {
    if (!commentsText.trim()) return;
    if (!userData) return;
    try {
      const newComment = await appwriteService.createComments({
        content: commentsText,
        postid: post.$id,
        userid: userData.id,
        username: userData.name,
      });

      setComments((prev) => [newComment, ...prev]);
      setCommentsText("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };
 

  const handleDeleteComment = async (commentId) => {
    try {
      await appwriteService.deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.$id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment", error);
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
        {isAuthor && (
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
          {/* Post Owner*/}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <div className="w-8 h-8 bg-blue-500 text-white flex items-center justify-center rounded-full text-sm font-bold">
              {post.username?.charAt(0).toUpperCase()}
            </div>

            <span className="font-medium text-blue-600">{post.username}</span>

            <span>•</span>

            <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
          </div>
          <div className="prose max-w-none text-gray-700">
            {parse(post.content)}
          </div>
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Comments</h2>

            {/* Add comments */}

            {userData && (
              <div className="mb-4">
                <textarea
                  value={commentsText}
                  onChange={(e) => setCommentsText(e.target.value)}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  placeholder="Write a comment..."
                />

                <button
                  onClick={handleComment}
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg shadow"
                >
                  Add comment
                </button>
              </div>
            )}

            {/* Comment List */}

            {/* Comments List */}
            {loadingComments ? (
              <p className="text-gray-500">Loading comments...</p>
            ) : comments.length === 0 ? (
              <p className="text-gray-400">No comments yet</p>
            ) : (
              <div className="space-y-4">
                {comments.map((c) => (
                  <div key={c.$id} className="bg-gray-50 p-3 rounded-lg border">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold text-blue-800">
                        {c.username}:{" "}
                        <span className="text-xs text-gray-400">
                          {c.content}
                        </span>
                      </p>

                      {(c.userid === userData?.id || post.userid === userData?.id) && (
                        <button
                          onClick={() => handleDeleteComment(c.$id)}
                          className="text-red-500 text-sm hover:underline"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-10 text-gray-500">Loading...</div>
  );
}

export default Post;
