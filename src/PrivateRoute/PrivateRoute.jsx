import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserSelector } from "../features/authentication/authenticationSlice";

export function PrivateRoute({ path, ...props }) {
   const { authStatus } = useUserSelector();

   return (
      <>
         {authStatus === "loggedIn" && <Route path={path} {...props} />}
         {authStatus === "loggedOut" && <Navigate state={{ from: path }} replace to="/login" />}
      </>
   );
}
