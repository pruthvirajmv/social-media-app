import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendAPI, setupAuthHeader } from "../../utils";

export const loadUser = createAsyncThunk("user/loadUser", async () => {
   const { data } = await axios({
      method: "GET",
      url: `${backendAPI}/user/profile`,
   });
   return data;
});

export const loginBttnClicked = createAsyncThunk(
   "user/loginBttnClicked",
   async ({ user, navigate, state }, { rejectWithValue }) => {
      try {
         const { data } = await axios({
            method: "POST",
            url: `${backendAPI}/user/login`,
            data: { email: user.email, password: user.password },
         });
         setupAuthHeader(data.user.token);
         localStorage?.setItem("loginSession", JSON.stringify({ token: data.user.token }));
         navigate(state?.from || "/");
         return data;
      } catch (error) {
         console.log(error);

         return rejectWithValue(error.response.data);
      }
   }
);

export const signUpBttnClicked = createAsyncThunk(
   "user/signUpBttnClicked",
   async ({ user, navigate }, { rejectWithValue }) => {
      try {
         const { data } = await axios({
            method: "POST",
            url: `${backendAPI}/user/signup`,
            data: { addUser: user },
         });
         navigate("/login");
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const profileUpdateBttnClicked = createAsyncThunk(
   "user/profileUpdateBttnClicked",
   async (updateProfile) => {
      const { data } = await axios({
         method: "POST",
         url: `${backendAPI}/user/update`,
         data: { user: updateProfile },
      });
      return data;
   }
);

export const bookmarkBttnClicked = createAsyncThunk("posts/bookmarkBttnClicked", async (postId) => {
   const { data } = await axios({
      method: "POST",
      url: `${backendAPI}/user/bookmark`,
      data: { postId: postId },
   });
   return data.bookmarks;
});

export const userSlice = createSlice({
   name: "user",
   initialState: {
      authStatus: "",
      authError: "",
      user: {},
   },
   reducers: {
      logoutBttnClicked: (state) => {
         localStorage?.clear();
         state.authStatus = "loggedOut";
         state.user = {};
      },
   },
   extraReducers: {
      // -------- load user----------- //
      [loadUser.pending]: (state, action) => {
         state.authStatus = "loading";
      },
      [loadUser.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         state.user = action.payload.user;
      },
      [loadUser.rejected]: (state, action) => {
         state.authStatus = "loggedOut";
      },

      // -------- login user----------- //

      [loginBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         state.user = action.payload.user;
         state.authError = "";
      },
      [loginBttnClicked.rejected]: (state, action) => {
         state.authStatus = "error";
         state.authError = action.payload.message;
      },

      // -------- signup user----------- //

      [signUpBttnClicked.pending]: (state, action) => {
         state.authStatus = "loading";
      },
      [signUpBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         state.authError = "";
      },
      [signUpBttnClicked.rejected]: (state, action) => {
         state.authStatus = "loggedOut";
         state.authError = action.payload.message;
      },

      // -------- user profile update----------- //

      [profileUpdateBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.payload);
         state.user = action.payload.user;
      },
      [profileUpdateBttnClicked.rejected]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.error.errorMessage);
      },

      // -------- bookmark post----------- //

      [bookmarkBttnClicked.fulfilled]: (state, action) => {
         state.user.bookmarks = action.payload;
      },
      [bookmarkBttnClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },
   },
});

export const { logoutBttnClicked } = userSlice.actions;

export const useUserSelector = () => useSelector((state) => state.user);
