import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { backendAPI } from "../../utils";

export const loadPosts = createAsyncThunk("posts/loadPosts", async () => {
   const { data } = await axios({
      method: "GET",
      url: `${backendAPI}/post`,
   });
   return data.userPosts;
});

export const likeButtonClicked = createAsyncThunk("posts/likeButtonClicked", async (postId) => {
   const response = await axios({
      method: "POST",
      url: `${backendAPI}/post/like`,
      data: { postId: postId },
   });
   return response.data.likedPost;
});

export const postButtonClicked = createAsyncThunk("posts/postButtonClicked", async (addPost) => {
   const response = await axios({
      method: "POST",
      url: `${backendAPI}/post/add`,
      data: { addPost },
   });
   return response.data.newPost;
});

export const deletePostButtonClicked = createAsyncThunk(
   "posts/deletePostButtonClicked",
   async (postId) => {
      const response = await axios({
         method: "POST",
         url: `${backendAPI}/post/delete`,
         data: { postId },
      });
      return response.data.postId;
   }
);

const initialNewPostState = {
   caption: "",
   content: "",
   media: "",
};

export const postSlice = createSlice({
   name: "posts",
   initialState: {
      posts: [],
      newPostModal: false,
      newPost: initialNewPostState,
   },
   reducers: {
      newPostBttnClicked: (state) => {
         state.newPostModal = true;
      },
      newPostCancelBttnClicked: (state) => {
         state.newPostModal = false;
      },
      setNewPostCaption: (state, action) => {
         state.newPost.caption = action.payload;
      },
      setNewPostContent: (state, action) => {
         state.newPost.content = action.payload;
      },
      setNewPostMedia: (state, action) => {
         state.newPost.media = action.payload;
      },
   },
   extraReducers: {
      [loadPosts.fulfilled]: (state, action) => {
         state.posts = action.payload;
      },

      // -------- post like----------- //

      [likeButtonClicked.fulfilled]: (state, action) => {
         state.posts = state.posts.map((post) =>
            post._id === action.payload._id ? action.payload : post
         );
      },
      [likeButtonClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },

      // -------- new post----------- //

      [postButtonClicked.rejected]: (state, action) => {
         state.newPostModal = true;
         console.log(action.error.message);
      },
      [postButtonClicked.fulfilled]: (state, action) => {
         state.posts.push({ ...action.payload });
         state.newPost = initialNewPostState;
         state.newPostModal = false;
      },

      // -------- delet post----------- //

      [deletePostButtonClicked.rejected]: (state, action) => {
         console.log(action.error.message);
      },
      [deletePostButtonClicked.fulfilled]: (state, action) => {
         state.posts = state.posts.filter((post) => post._id !== action.payload);
      },
   },
});

export const {
   newPostBttnClicked,
   newPostCancelBttnClicked,
   setNewPostCaption,
   setNewPostContent,
   setNewPostMedia,
} = postSlice.actions;

export const usePostSelector = () => useSelector((state) => state.posts);
