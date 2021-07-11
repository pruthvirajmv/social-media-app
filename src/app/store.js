import { configureStore } from "@reduxjs/toolkit";
import { postSlice } from "../features/posts/postSlice";
import { userSlice } from "../features/authentication/authenticationSlice";
import { usersSlice } from "../features/users/usersSlice";

export const store = configureStore({
   reducer: {
      posts: postSlice.reducer,
      user: userSlice.reducer,
      users: usersSlice.reducer,
   },
});
