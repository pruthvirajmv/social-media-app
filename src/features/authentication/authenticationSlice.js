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
         setupAuthHeader(data.user.token);
         localStorage?.setItem("loginSession", JSON.stringify({ token: data.user.token }));
         navigate("/");
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const profileUpdateBttnClicked = createAsyncThunk(
   "user/profileUpdateBttnClicked",
   async ({ updateProfile, navigate }) => {
      const { data } = await axios({
         method: "POST",
         url: `${backendAPI}/user/updateprofile`,
         data: { updateUser: updateProfile },
      });
      navigate("/profile");
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

export const followBttnClicked = createAsyncThunk("user/followBttnClicked", async (userId) => {
   const { data } = await axios({
      method: "POST",
      url: `${backendAPI}/user/follow`,
      data: { userId },
   });
   return data.following;
});

export const clearNotificationBttnClicked = createAsyncThunk(
   "user/clearNotificationBttnClicked",
   async (notificationId) => {
      const { data } = await axios({
         method: "POST",
         url: `${backendAPI}/user/readnotification`,
         data: { notificationId },
      });
      return data.notifications;
   }
);

export const clearAllNotificationsBttnClicked = createAsyncThunk(
   "user/clearAllNotificationsBttnClicked",
   async () => {
      const { data } = await axios({
         method: "POST",
         url: `${backendAPI}/user/clearnotifications`,
      });
      return data.notifications;
   }
);

export const userSlice = createSlice({
   name: "user",
   initialState: {
      authStatus: "loggedOut",
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
         state.user = action.payload.user;
         state.authError = "";
      },
      [signUpBttnClicked.rejected]: (state, action) => {
         state.authStatus = "loggedOut";
         state.authError = action.payload.message;
      },

      // -------- user profile update----------- //

      [profileUpdateBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
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

      // -------- follow user----------- //

      [followBttnClicked.fulfilled]: (state, action) => {
         state.user.following = action.payload;
      },
      [followBttnClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },

      // -------- notification read & clear----------- //

      [clearNotificationBttnClicked.fulfilled]: (state, action) => {
         state.user.notifications = action.payload;
      },
      [clearNotificationBttnClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },

      [clearAllNotificationsBttnClicked.fulfilled]: (state, action) => {
         state.user.notifications = [];
      },
      [clearAllNotificationsBttnClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },
   },
});

export const { logoutBttnClicked } = userSlice.actions;

export const useUserSelector = () => useSelector((state) => state.user);
