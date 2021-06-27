import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendAPI, checkAxiosError } from "../../utils";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
   // try {
   //     const response = await axios({
   //        method: "POST",
   //        url: `${backendAPI}/loadposts`,
   //     });
   //     return response;
   //  } catch (error) {
   //     checkAxiosError(error);
   //  }
   const data = {
      posts: [
         {
            _id: "p1201",
            caption: "learning redux",
            content:
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            media: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR87H-ACcTkVZEN7n3Ymvup3pn_7GSPTFxYCw&usqp=CAU",
            author: {
               userID: "u1234",
               name: "guest",
               profilePicName: "G",
               profilePic: "/broken-image.jpg",
            },
            likedBy: [{ name: "guest1" }, { name: "guest2" }],
            commnets: [
               { name: "guest1", comment: "cool" },
               { name: "guest2", comment: "nice" },
            ],
            createdOn: "26 Jun 2021",
         },
         {
            _id: "p1202",
            caption: "reading redux",
            content:
               "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            media: "https://res.cloudinary.com/u-and-i/image/upload/v1623929181/images/quiz2-5_vq9qwl.jpg",
            author: {
               userID: "u1234",
               name: "guest",
               profilePicName: "G",
               profilePic: "",
            },
            likedBy: [{ name: "guest1" }, { name: "guest2" }],
            commnets: [
               { name: "guest1", comment: "cool" },
               { name: "guest2", comment: "nice" },
            ],
            createdOn: "26 Jun 2022",
         },
      ],
   };

   return data;
});

export const likeButtonClicked = createAsyncThunk("posts/likeButtonClicked", async (postId) => {
   try {
      const response = await axios({
         method: "POST",
         url: `${backendAPI}/togglelike`,
         data: { postId: postId },
      });
      return response.data;
   } catch (error) {
      checkAxiosError(error);
   }
});

export const postButtonClicked = createAsyncThunk("posts/postButtonClicked", async (postId) => {
   try {
      const response = await axios({
         method: "POST",
         url: `${backendAPI}/posts/post`,
         data: { postId: postId },
      });
      return response.data;
   } catch (error) {
      checkAxiosError(error);
   }
});

export const deletePostButtonClicked = createAsyncThunk(
   "posts/deletePostButtonClicked",
   async (postId) => {
      try {
         const response = await axios({
            method: "POST",
            url: `${backendAPI}/posts/delete`,
            data: { postId: postId },
         });
         return response.data;
      } catch (error) {
         checkAxiosError(error);
      }
   }
);

export const postSlice = createSlice({
   name: "posts",
   initialState: {
      posts: [],
   },
   reducers: {},
   extraReducers: {
      [loadPosts.fulfilled]: (state, action) => {
         state.posts = action.payload.posts;
      },
      [likeButtonClicked.fulfilled]: (state, action) => {
         state.posts = action.payload.posts;
      },
      [postButtonClicked.fulfilled]: (state, action) => {
         state.posts = action.payload.posts;
      },
   },
});

export const usePostSelector = () => useSelector((state) => state.posts);
