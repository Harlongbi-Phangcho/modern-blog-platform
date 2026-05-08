import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from './authSlice'
import PostSlice from './postSlice'

const store = configureStore({
  reducer: {
    auth: AuthReducer,
    post: PostSlice,
  },
});

export default store;
