import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const host = "http://localhost:5000";

export const getBlogs = createAsyncThunk(
    "blog/getBlogs",
    async (arg, { getState, rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/blogs/`, config);
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const postBlog = createAsyncThunk(
    "blog/postBlog",
    async (
        {
            email,
            blog

        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/blogs/post`,
                {
                    email,
                    blog
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async (
        {
            email,
            blog,
            id,
            deletedSecImages
        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.put(
                `/api/blogs/${id}`,
                {
                    email,
                    blog,
                    deletedSecImages
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);

export const updateBlogByUser = createAsyncThunk(
    "blog/updateBlogByUser",
    async (
        {
            email,
            id,
            comment_id,
            comment,
            reply,
            like,
            delete_comment_id,
            delete_reply_id
        },
        { rejectWithValue }
    ) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.post(
                `/api/blogs/updateByUser`,
                {
                    email,
                    id,
                    comment_id,
                    comment,
                    reply,
                    like,
                    delete_comment_id,
                    delete_reply_id
                },
                config
            );
            return data;
        } catch (error) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);