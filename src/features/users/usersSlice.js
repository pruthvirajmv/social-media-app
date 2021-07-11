import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";
import { logoutBttnClicked } from "../authentication/authenticationSlice";
import { backendAPI } from "../../utils";

export const loadUsers = createAsyncThunk("users/loadUsers", async () => {
   const { data } = await axios.get(`${backendAPI}/user`);
   return data.users;
});

export const usersSlice = createSlice({
   name: "users",
   initialState: {
      users: [],
   },
   reducers: {},
   extraReducers: {
      [logoutBttnClicked]: (state, action) => {
         state.users = [];
      },
      [loadUsers.fulfilled]: (state, action) => {
         state.users = action.payload;
      },
      [loadUsers.rejected]: (state, action) => {
         console.log(action.error.message);
      },
   },
});

export const useUsersSelector = () => useSelector((state) => state.users);
