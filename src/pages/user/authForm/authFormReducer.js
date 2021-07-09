import { AuthFormActionType } from "./AuthFormActionType";

export const authFormReducer = (state, action) => {
   switch (action.type) {
      case AuthFormActionType.SET_FIRST_NAME:
         return {
            ...state,
            firstName: action.payload,
         };
      case AuthFormActionType.SET_LAST_NAME:
         return {
            ...state,
            lastName: action.payload,
         };
      case AuthFormActionType.SET_USER_NAME:
         return {
            ...state,
            userName: action.payload,
         };

      case AuthFormActionType.SET_EMAIL:
         return {
            ...state,
            email: action.payload,
         };

      case AuthFormActionType.SET_PASSWORD:
         return {
            ...state,
            password: action.payload,
         };

      case AuthFormActionType.SET_CONFIRM_PASSWORD:
         return {
            ...state,
            confirmPassword: action.payload,
         };

      case AuthFormActionType.SET_LOADING:
         return {
            ...state,
            isLoading: !state.isLoading,
         };

      case AuthFormActionType.SET_ERROR_MESSAGE:
         return {
            ...state,
            errorMessage: action.payload,
         };
      case AuthFormActionType.TOGGLE_SHOW_PASSOWRD:
         return {
            ...state,
            showPassword: !state.showPassword,
         };
      case AuthFormActionType.TOGGLE_SHOW_CONFIRM_PASSOWRD:
         return {
            ...state,
            showConfirmPassword: !state.showConfirmPassword,
         };

      default:
         return state;
   }
};
