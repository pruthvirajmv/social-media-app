import React from "react";
import { useNavigate } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useProfileForm } from "./updateProfileForm/useProfileForm";
import { profileUpdateBttnClicked } from "../../features/authentication/authenticationSlice";
import { useDispatch } from "react-redux";
import { UploadProfilePic } from "./UploadProfilePic";
import { ProfileFormActionType } from "./updateProfileForm/ProfileFormActionType";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      maxWidth: 360,
      padding: "1rem 2rem",
   },
   profileForm: {
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      flexWrap: "wrap",
      marginTop: "2rem",
   },
}));

export const UpdateProfile = () => {
   const classes = useStyles();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { profileFormState, profileFormDispatch } = useProfileForm();
   const updateBttnHandler = () => {
      const updateProfile = {
         bio: profileFormState.bio,
         website: profileFormState.website,
         profilePic: profileFormState.profilePic,
      };
      dispatch(profileUpdateBttnClicked({ updateProfile, navigate }));
   };

   return (
      <>
         <Box display="flex" justifyContent="center" alignItems="center">
            <Paper className={classes.root} elevation={3}>
               <Typography variant="h4" align="center" gutterBottom>
                  User Profile
               </Typography>
               <Box className={classes.profileForm}>
                  <Grid container spacing={2} alignItems="center" wrap="nowrap">
                     <Grid item xs={8}>
                        <Avatar
                           alt={profileFormState.profilePicName}
                           src={profileFormState.profilePic}
                           className={classes.largeAvatar}>
                           {profileFormState.profilePicName}
                        </Avatar>
                     </Grid>
                     <Grid item container direction="column">
                        <Grid item>
                           <Typography variant="body1" gutterBottom>
                              {profileFormState.userName}
                           </Typography>
                        </Grid>
                        <Grid item>
                           <Button
                              variant="text"
                              size="small"
                              color="primary"
                              onClick={() =>
                                 profileFormDispatch({
                                    type: ProfileFormActionType.SET_UPLOAD_PROFILE_PIC,
                                 })
                              }>
                              Update Profile Pic
                           </Button>
                        </Grid>
                     </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                     <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom>
                           Name
                        </Typography>
                     </Grid>
                     <Grid item>
                        <Typography variant="h6" gutterBottom>
                           {profileFormState.fullName}
                        </Typography>
                     </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                     <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom>
                           User Name
                        </Typography>
                     </Grid>
                     <Grid item>
                        <Typography variant="h6" gutterBottom>
                           {profileFormState.userName}
                        </Typography>
                     </Grid>
                  </Grid>

                  <Grid container spacing={2} wrap="nowrap">
                     <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom>
                           Bio
                        </Typography>
                     </Grid>
                     <Grid item>
                        <TextField
                           variant="outlined"
                           multiline
                           fullWidth
                           rows="5"
                           value={profileFormState.bio}
                           onChange={(e) =>
                              profileFormDispatch({
                                 type: ProfileFormActionType.SET_BIO,
                                 payload: e.target.value,
                              })
                           }
                        />
                     </Grid>
                  </Grid>
                  <Grid container spacing={2} wrap="nowrap">
                     <Grid item xs={5}>
                        <Typography variant="h6" gutterBottom>
                           Website
                        </Typography>
                     </Grid>
                     <Grid item>
                        <FormControl fullWidth className={classes.margin} variant="outlined">
                           <InputBase
                              margin="dense"
                              labelwidth={0}
                              type="text"
                              required={true}
                              value={profileFormState.website}
                              onChange={(e) =>
                                 profileFormDispatch({
                                    type: ProfileFormActionType.SET_WEBSITE,
                                    payload: e.target.value,
                                 })
                              }
                           />
                        </FormControl>
                     </Grid>
                  </Grid>

                  <div>
                     <Button
                        fullWidth={true}
                        color="primary"
                        variant="contained"
                        disableElevation={true}
                        onClick={updateBttnHandler}
                        disabled={profileFormState.isLoading ? true : false}>
                        {profileFormState.isLoading && (
                           <CircularProgress color="primary" size="1.2rem" thickness={5} />
                        )}
                        {profileFormState.isLoading ? "Updating..." : "Update"}
                     </Button>
                  </div>
               </Box>
            </Paper>
         </Box>
         <UploadProfilePic
            open={profileFormState.uploadProfilePic}
            dispatch={profileFormDispatch}
            onClose={() =>
               profileFormDispatch({ type: ProfileFormActionType.SET_UPLOAD_PROFILE_PIC })
            }
         />
      </>
   );
};
