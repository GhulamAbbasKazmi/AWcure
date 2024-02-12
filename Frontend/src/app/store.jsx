import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import blogReducer from "../features/blog/blogSlice"
import drugReducer from "../features/drug/drugSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    drug: drugReducer,
  },
});
