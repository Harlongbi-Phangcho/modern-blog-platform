import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  userPosts: [],
  loading: true,
};

export const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setUserPosts: (state, action) => {
      state.userPosts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.unshift(action.payload);
      state.userPosts.unshift(action.payload);
    },
    removePost: (state, acton) => {
      const id = action.payload;

      state.posts = state.posts.filter((p) => p.$id !== id);
      state.userPosts = state.userPosts.filter((p) => p.$id !== id);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setPosts, setUserPosts, addPost, removePost, setLoading} =
  PostSlice.actions;

export default PostSlice.reducer;
