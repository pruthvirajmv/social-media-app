import React, { useEffect } from "react";
import "./App.css";

import { AppNavBar } from "./components";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Posts } from "./features/posts/Posts";
import { Login, SignUp, Profile } from "./pages";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadUser } from "./features/authentication/authenticationSlice";

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

   console.log("In app..");

   useEffect(() => {
      dispatch(loadUser());
   }, []);

   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            <AppNavBar />
            <Routes>
               <Route path="/" element={<Posts />} />
               <Route path="/login" element={<Login />} />
               <Route path="/signup" element={<SignUp />} />
               <Route path="/profile" element={<Profile />} />
            </Routes>
         </div>
      </ThemeProvider>
   );
}
