import React from "react";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";

import {
   logoutBttnClicked,
   useUserSelector,
} from "../../features/authentication/authenticationSlice";
import { Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   root: {
      //   width: "100%",
      maxWidth: 600,
      margin: "auto",
      display: "flex",
      gridColumnGap: "1.5rem",
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "2rem",
   },
   largeAvatar: {
      marginTop: "1rem",
      width: theme.spacing(15),
      height: theme.spacing(15),
   },
}));

export const Profile = () => {
   const classes = useStyles();
   const { authStatus, user } = useUserSelector();
   const dispatch = useDispatch();

   const navigate = useNavigate();

   const logoutHandler = () => {
      dispatch(logoutBttnClicked());
      navigate("/");
      localStorage.clear();
   };

   return (
      <>
         {authStatus !== "loggedIn" && <p>Loading...</p>}
         {authStatus === "loggedIn" && (
            <Box className={classes.root}>
               <Grid container spacing={8}>
                  <Grid item>
                     <Avatar
                        alt={user.fullName}
                        src={user.profilePic}
                        className={classes.largeAvatar}></Avatar>
                  </Grid>
                  <Grid item xs={12} sm container>
                     <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                           <Typography gutterBottom variant="h5">
                              {user.userName}
                              <Button color="primary" disableElevation>
                                 Edit Profile
                              </Button>
                           </Typography>
                        </Grid>
                        <Grid
                           item
                           container
                           direction="row"
                           justify="space-around"
                           alignItems="center">
                           <Grid item>
                              <Typography gutterBottom>posts</Typography>
                           </Grid>
                           <Grid item>
                              <Button>{user.followers.length} followers</Button>
                           </Grid>
                           <Grid item>
                              <Button>{user.following.length} following</Button>
                           </Grid>
                        </Grid>
                        <Grid item>
                           <Typography variant="body1" gutterBottom>
                              {user.bio}
                           </Typography>
                           <Typography variant="body2" color="textSecondary">
                              {user.website}
                           </Typography>
                        </Grid>
                     </Grid>
                     <Grid item>
                        <IconButton size="medium" onClick={logoutHandler}>
                           <ExitToAppIcon />
                        </IconButton>
                     </Grid>
                  </Grid>
               </Grid>
            </Box>
         )}
      </>
   );
};
