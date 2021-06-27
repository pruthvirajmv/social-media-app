import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../features/posts/postSlice";
import { userSlice } from "../features/authentication/authenticationSlice";

export const store = configureStore({
   reducer: {
      posts: postSlice.reducer,
      user: userSlice.reducer,
   },
});
