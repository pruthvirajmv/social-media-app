import { ProfileFormActionType } from "./ProfileFormActionType";

export const profileFormReducer = (state, action) => {
   console.log(action);
   switch (action.type) {
      case ProfileFormActionType.SET_BIO:
         return {
            ...state,
            bio: action.payload,
         };

      case ProfileFormActionType.SET_WEBSITE:
         return {
            ...state,
            website: action.payload,
         };

      case ProfileFormActionType.SET_PROFILE_PIC:
         return {
            ...state,
            profilePic: action.payload,
         };

      case ProfileFormActionType.SET_UPLOAD_PROFILE_PIC:
         return {
            ...state,
            uploadProfilePic: !state.uploadProfilePic,
         };

      case ProfileFormActionType.SET_ERROR_MESSAGE:
         return {
            ...state,
            errorMessage: action.payload,
         };

      default:
         return state;
   }
};
