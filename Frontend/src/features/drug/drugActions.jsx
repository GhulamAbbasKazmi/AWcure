import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// const host = "http://localhost:5000";

export const getDrugs = createAsyncThunk(
    "drug/getDrugs",
    async (arg, { getState, rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/drugs/`, config);
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

export const getDrug = createAsyncThunk(
    "drug/getDrug",
    async ({
            id 
        },
        { rejectWithValue }) => {
        try {
            // configure authorization header with user's token
            const config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            const { data } = await axios.get(`/api/drugs/${id}`, config);
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

export const postDrug = createAsyncThunk(
    "drug/postDrug",
    async (
        {
            admin_email, drug

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
                `/api/drugs/`,
                {
                    admin_email, drug
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

export const updateDrug = createAsyncThunk(
    "drug/updateDrug",
    async (
        {
            admin_email, drug
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
                `/api/drugs/update`,
                {
                    admin_email, drug
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

export const deleteDrug = createAsyncThunk(
    "drug/deleteDrug",
    async (
        {
            admin_email, drug
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
                `/api/drugs/delete`,
                {
                    admin_email, drug
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