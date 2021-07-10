import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useUserSelector } from "../features/authentication/authenticationSlice";

export function PrivateRoute({ path, ...props }) {
   const { authState } = useUserSelector();

   return authState === "loggedIn" ? (
      <Route path={path} {...props} />
   ) : (
      <Navigate state={{ from: path }} replace to="/login" />
   );
}
