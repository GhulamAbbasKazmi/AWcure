import { createSlice } from "@reduxjs/toolkit";
import {
    getDrugs,
    getDrug,
    postDrug,
    updateDrug,
    deleteDrug
} from "./drugActions";

const initialState = {
    loading: false,
    drugs: null,
    drug: null,
    error: null,
    success: null,
};

const drugSlice = createSlice({
    name: "drug",
    initialState,
    reducers: {},
    extraReducers: {

        // get drug
        [getDrug.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getDrug.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.drug = payload;
            state.success = true;
        },
        [getDrug.rejected]: (state, { payload }) => {
            state.loading = false;
            state.drug = null;
            state.error = payload;
        },

        // post drug
        [postDrug.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [postDrug.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.drug = payload;
            state.success = 'Drug has been posted successfully!';
        },
        [postDrug.rejected]: (state, { payload }) => {
            state.loading = false;
            state.drug = null;
            state.error = payload;
        },

        // update blog
        [updateDrug.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [updateDrug.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.drug = payload;
            state.success = 'Drug has been updated successfully!';
        },
        [updateDrug.rejected]: (state, { payload }) => {
            state.loading = false;
            state.drug = null;
            state.error = payload;
        },

        // get drugs
        [getDrugs.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [getDrugs.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.drugs = payload;
            state.success = true;
        },
        [getDrugs.rejected]: (state, { payload }) => {
            state.loading = false;
            state.drugs = null;
            state.error = payload;
        },

        // delete drug
        [deleteDrug.pending]: (state) => {
            state.loading = true;
            state.error = null;
            state.success = null;
        },
        [deleteDrug.fulfilled]: (state, { payload }) => {
            state.loading = false;
            state.drug = null;
            state.success = 'Drug has been delete successfully!';
        },
        [deleteDrug.rejected]: (state, { payload }) => {
            state.loading = false;
            state.drug = null;
            state.error = payload;
        },
    },
});


export default drugSlice.reducer;
