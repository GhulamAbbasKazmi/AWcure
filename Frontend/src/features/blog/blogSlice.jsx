import { createSlice } from "@reduxjs/toolkit";
import {
    postBlog,
    updateBlog,
    getBlogs,
    updateBlogByUser
} from "./blogActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
    ? localStorage.getItem("userToken")
    : null;

const initialState = {
    loading: false,
    blogs: null,
    myBlog: null,
    userToken,
    error: null,
    success: null,
};

const blogSlice = createSlice({
    name: "blog",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("userToken"); // delete token from storage
            state.loading = false;
            state.blogs = null;
            state.myBlog = null;
            state.userToken = null;
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: {

        // post blog
        [postBlog.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [postBlog.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myBlog = payload;
            state.success = 'Blog has been posted successfully!';
        },
        [postBlog.rejected]: (state, { payload }) => {
            state.loading = false;
            state.myBlog = null;
            state.error = payload;
        },

        // update blog
        [updateBlog.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateBlog.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.myBlog = payload;
            state.success = 'Blog has been updated successfully!';
        },
        [updateBlog.rejected]: (state, { payload }) => {
            state.loading = false;
            state.myBlog = null;
            state.error = payload;
        },

        // update blog By User
        [updateBlogByUser.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateBlogByUser.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.blogs = payload;
            state.success = true;
        },
        [updateBlogByUser.rejected]: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
            state.success = null;
        },

        // get blogs
        [getBlogs.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getBlogs.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.blogs = payload;
            state.success = true;
        },
        [getBlogs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.blogs = null;
            state.error = payload;
        },
    },
});

export const { logout } = blogSlice.actions;

export default blogSlice.reducer;
