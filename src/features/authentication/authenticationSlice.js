import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendAPI, checkAxiosError } from "../../utils";

export const loadUser = createAsyncThunk("user/loadUser", async () => {
   // try {
   //     const response = await axios({
   //        method: "GET",
   //        url: `${backendAPI}/user`,
   //     });
   //     return response;
   //  } catch (error) {
   //     checkAxiosError(error);
   //  }
   const data = {
      user: {
         _id: "u1234",
         bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
         profilePic:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87H-ACcTkVZEN7n3Ymvup3pn_7GSPTFxYCw&usqp=CAU",

         fullName: "guest",
         userName: "@neoGrammer_21",
         profilePicName: "G",
         email: "neog@camp.com",
         website: "google.com",
         following: [{ name: "guest1" }],
         followers: [{ name: "guest1" }, { name: "guest2" }],
         bookmarks: [],
      },
   };

   return data;
});

export const loginBttnClicked = createAsyncThunk(
   "user/loginBttnClicked",
   async (email, password, navigate, state) => {
      try {
         const response = await axios({
            method: "POST",
            url: `${backendAPI}/user/login`,
            data: { email: email, password: password },
         });
         navigate(state?.from || "/");
         return response.data;
      } catch (error) {
         checkAxiosError(error);
      }
   }
);

export const signUpBttnClicked = createAsyncThunk("user/signUpBttnClicked", async (user) => {
   try {
      const response = await axios({
         method: "POST",
         url: `${backendAPI}/user/signup`,
         data: { user: user },
      });
      return response.data;
   } catch (error) {
      checkAxiosError(error);
   }
});

export const profileUpdateBttnClicked = createAsyncThunk(
   "user/profileUpdateBttnClicked",
   async (updateProfile) => {
      try {
         const response = await axios({
            method: "POST",
            url: `${backendAPI}/user/update`,
            data: { user: updateProfile },
         });
         return response.data;
      } catch (error) {
         checkAxiosError(error);
      }
   }
);

export const bookmarkBttnClicked = createAsyncThunk("posts/bookmarkBttnClicked", async (postId) => {
   try {
      const response = await axios({
         method: "POST",
         url: `${backendAPI}/togglebookmark`,
         data: { postId: postId },
      });
      return response.data;
   } catch (error) {
      checkAxiosError(error);
   }
});

export const userSlice = createSlice({
   name: "user",
   initialState: {
      authStatus: "",
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
      [loadUser.pending]: (state, action) => {
         state.authStatus = "loading";
      },
      [loadUser.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.payload.user);
         state.user = action.payload.user;
      },
      [loadUser.rejected]: (state, action) => {
         state.authStatus = "loggedOut";
      },
      [loginBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.payload);
         state.user = action.payload.user;
      },
      [loginBttnClicked.rejected]: (state, action) => {
         state.authStatus = "error";
      },
      [signUpBttnClicked.pending]: (state, action) => {
         state.authStatus = "loading";
      },
      [signUpBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.payload);
         state.user = action.payload.user;
      },
      [signUpBttnClicked.rejected]: (state, action) => {
         state.authStatus = "loggedOut";
      },
      [profileUpdateBttnClicked.fulfilled]: (state, action) => {
         state.authStatus = "loggedIn";
         console.log(action.payload);
         state.user = action.payload.user;
      },
      [bookmarkBttnClicked.fulfilled]: (state, action) => {
         state.user = action.payload.user;
      },
   },
});

export const { logoutBttnClicked } = userSlice.actions;

export const useUserSelector = () => useSelector((state) => state.user);
