import React, { useEffect } from "react";
import "./App.css";

import { Footer, NavBarBottom, NavBarTop } from "./pages/components";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
   Login,
   SignUp,
   MyProfile,
   UpdateProfile,
   VisitUserProfile,
   Home,
   FollowSuggestion,
} from "./pages";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loadUser, loadPosts, loadUsers } from "./features";
import { setupAuthHeader } from "./utils";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute";
import { NewPostModal } from "./pages/components/NewPostModal";

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
   if (loginHistory?.token) {
      setupAuthHeader(loginHistory.token);
      dispatch(loadUser());
      dispatch(loadPosts());
      dispatch(loadUsers());
   }

   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo(0, 0);
   }, [pathname]);

   return (
      <ThemeProvider theme={theme}>
         <div className="App">
            <NavBarTop />
            <main className="AppMain">
               <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />

                  <PrivateRoute path="/" element={<Home />} />
                  <PrivateRoute path="/followsuggestion" element={<FollowSuggestion />} />
                  <PrivateRoute path="/profile" element={<MyProfile />} />
                  <PrivateRoute path="/profile/edit" element={<UpdateProfile />} />
                  <PrivateRoute path="/profile/:username" element={<VisitUserProfile />} />
               </Routes>

               <NewPostModal />
            </main>
            <NavBarBottom />
            <Footer />
         </div>
      </ThemeProvider>
   );
}
