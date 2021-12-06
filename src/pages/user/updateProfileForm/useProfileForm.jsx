import { useReducer } from "react";
import { useUserSelector } from "../../../features/authentication/authenticationSlice";
import { profileFormReducer } from "./profileFormReducer";

export function useProfileForm() {
   const { user } = useUserSelector();

   const profileFormInitialState = {
      fullName: user.fullName,
      userName: user.userName,
      profilePicName: user.profilePicName,
      bio: user.bio,
      website: user.website,
      profilePic: user.profilePic,
      uploadProfilePic: false,
   };

   const [profileFormState, profileFormDispatch] = useReducer(
      profileFormReducer,
      profileFormInitialState
   );

   return { profileFormState, profileFormDispatch };
}
