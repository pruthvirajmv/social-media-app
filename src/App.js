import React, { useEffect } from "react";
import "./App.css";

import { AppNavBar, NavBarDesktop } from "./components";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Posts } from "./features/posts/Posts";
import { Login, SignUp, Profile, UpdateProfile } from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadUser } from "./features/authentication/authenticationSlice";
import { setupAuthHeader } from "./utils";
import { loadPosts } from "./features/posts/postSlice";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";

let appTheme = false;

const theme = createMuiTheme({
   palette: {
      primary: {
         main: "#01dcfc",
      },
      type: appTheme ? "dark" : "light",
   },

   overrides: {
      MuiInputBase: {
         root: {
            border: "0.05rem solid #01dcfc",
            padding: "0.2rem 0.4rem",
            borderRadius: "0.2rem",
         },
      },
      MuiInputLabel: {
         root: {
            color: "inherit",
         },
      },
   },
});

export default function App() {
   const dispatch = useDispatch();

   const loginHistory = JSON.parse(localStorage?.getItem("loginSession"));
   console.log("checked storage");
   if (loginHistory?.token) {
      console.log("setting up header");
      setupAuthHeader(loginHistory.token);
      dispatch(loadUser());
      dispatch(loadPosts());
   }

   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            <AppNavBar />

            {/* <NavBarDesktop /> */}
            <Routes>
               <PrivateRoute path="/" element={<Posts />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <PrivateRoute path="/profile" element={<Profile />} />
               <PrivateRoute path="/profile/edit" element={<UpdateProfile />} />
            </Routes>
         </div>
      </ThemeProvider>
   );
}
