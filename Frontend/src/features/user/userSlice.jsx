import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  getUserDetails,
  registerUser,
  userLogin,
  updateUserDetails,
  removeUser,
  updateUserDocs,
  removeUserDocs,
  requestResetPasswordLink,
  resetPassword,
  verifyEmailLink,
  verifyEmail,
} from "./userActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const cart = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart"))
  : [];


const initialState = {
  loading: false,
  allUsers: null,
  userInfo: null,
  cart,
  userToken,
  login_error: null,
  signup_error: null,
  update_error: null,
  delete_error: null,
  reset_password_link_error: null,
  reset_password_error: null,
  verify_link_error: null,
  verify_error: null,
  error: null,
  success: false,
  update_success: false,
  delete_success: false,
  signup_success: false,
  reset_password_link_success: false,
  reset_password_success: false,
  verify_link_success: null,
  verify_success: null,
  docs_remove_error: false,
  docs_remove_success: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      let item_ = state.cart.find(item => item.id == payload.id)

      if (item_) {

        state.cart.splice(state.cart.indexOf(item_), 1, { ...item_, quantity: item_.quantity + 1, amount: item_.amount + payload.amount })
      
      }

      else {
        state.cart.push({ id: payload.id, quantity: 1, amount: payload.amount })
       
      }
    },

    removeFromCart: (state, {payload}) => {
      let item_ = state.cart.find(item => item.id == payload.id)

      console.log('item_.amount - payload.amount', item_.amount - payload.amount)

      if (item_ && ((item_.amount - payload.amount) == 0)) {

        state.cart.splice(state.cart.indexOf(item_), 1)
      }
      else if (item_) {
        state.cart.splice(state.cart.indexOf(item_), 1, {...item_, quantity: item_.quantity - 1, amount: item_.amount - payload.amount })
      }

    },
    emptyCart: (state) => {
      state.cart = []

    },

    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.allUsers = null;
      state.userInfo = null;
      state.userToken = null;
      state.login_error = null;
      state.signup_error = null;
      state.update_error = null;
      state.delete_error = null;
      state.reset_password_link_error = null;
      state.reset_password_error = null;
      state.verify_link_error = null;
      state.verify_error = null;
      state.error = null;
      state.update_success = false;
      state.delete_success = false;
      state.signup_success = false;
      state.reset_password_link_success = false;
      state.reset_password_success = false;
      state.verify_link_success = null;
      state.verify_success = null;
      state.docs_remove_error = false;
      state.docs_remove_success = false;
    },



  },
  extraReducers: {

    // get all users details
    [getAllUsers.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getAllUsers.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.allUsers = payload;
    },
    [getAllUsers.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },

    // login user
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.login_error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.userToken = payload.userToken;
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.login_error = payload;
    },
    // register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.signup_error = null;
      state.signup_success = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.signup_success = true;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.signup_error = payload;
    },
    // get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
    },
    [getUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
    },
    [getUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
    },

    // update user details
    [updateUserDetails.pending]: (state) => {
      state.loading = true;
      state.update_error = null;
      state.update_success = false;
    },
    [updateUserDetails.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.user) {
        state.userInfo = payload.user;
      }
      if (payload.users) {
        state.allUsers = payload.users;
      }
      state.update_success = true;
    },
    [updateUserDetails.rejected]: (state, { payload }) => {
      state.loading = false;
      state.update_error = payload;
    },

    // update user docs
    [updateUserDocs.pending]: (state) => {
      state.loading = true;
      state.update_error = null;
      state.update_success = false;
    },
    [updateUserDocs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.update_success = true;
    },
    [updateUserDocs.rejected]: (state, { payload }) => {
      state.loading = false;
      state.update_error = payload;
    },

    // remove user docs
    [removeUserDocs.pending]: (state) => {
      state.loading = true;
      state.docs_remove_error = false;
      state.docs_remove_success = false;
    },
    [removeUserDocs.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      state.docs_remove_success = true;
    },
    [removeUserDocs.rejected]: (state, { payload }) => {
      state.loading = false;
      state.docs_remove_error = payload;
    },

    // reset password link request
    [requestResetPasswordLink.pending]: (state) => {
      state.loading = true;
      state.reset_password_link_error = null;
      state.reset_password_link_success = false;
    },
    [requestResetPasswordLink.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reset_password_link_success = payload;
    },
    [requestResetPasswordLink.rejected]: (state, { payload }) => {
      state.loading = false;
      state.reset_password_link_error = payload;
    },

    // reset password
    [resetPassword.pending]: (state) => {
      state.loading = true;
      state.reset_password_error = null;
      state.reset_password_success = false;
    },
    [resetPassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.reset_password_success = payload;
    },
    [resetPassword.rejected]: (state, { payload }) => {
      state.loading = false;
      state.reset_password_error = payload;
    },

    // verify account link request
    [verifyEmailLink.pending]: (state) => {
      state.loading = true;
      state.verify_link_error = null;
      state.verify_link_success = false;
    },
    [verifyEmailLink.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.verify_link_success = payload;
    },
    [verifyEmailLink.rejected]: (state, { payload }) => {
      state.loading = false;
      state.verify_link_error = payload;
    },

    // verify account
    [verifyEmail.pending]: (state) => {
      state.loading = true;
      state.verify_error = null;
      state.verify_success = false;
    },
    [verifyEmail.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.verify_success = payload;
    },
    [verifyEmail.rejected]: (state, { payload }) => {
      state.loading = false;
      state.verify_error = payload;
    },

    // remove user details
    [removeUser.pending]: (state) => {
      state.loading = true;
    },
    [removeUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.login_error = null;
      state.signup_error = null;
      state.update_error = null;
      state.delete_error = null;
      state.reset_password_link_error = null;
      state.reset_password_error = null;
      state.error = null;
      state.update_success = false;
      state.delete_success = true;
      state.signup_success = false;
      state.reset_password_link_success = false;
      state.reset_password_success = false;
    },
    [removeUser.rejected]: (state, { payload }) => {
      state.loading = false;
      state.delete_error = payload;
    },
  },
});

export const { logout, addToCart, removeFromCart, emptyCart } = userSlice.actions;

export default userSlice.reducer;
