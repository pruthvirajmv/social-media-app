import { useReducer } from "react";
import { authFormReducer } from "./authFormReducer";

export default function useAuthForm() {
   const authFormInitialState = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      showPassword: false,
      showConfirmPassword: false,
      errorMessage: "",
      isLoading: false,
   };

   const [authFormState, authFormDispatch] = useReducer(authFormReducer, authFormInitialState);

   return { authFormState, authFormDispatch };
}
