import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Link from "@material-ui/core/Link";

import { logoutBttnClicked, useUserSelector, usePostSelector } from "../../features";
import { PostCard } from "../Home/components/PostCard";
import { ListUsersModal } from "../components/ListUsersModal";

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: "100%",
      margin: "auto",
      display: "flex",
      gridColumnGap: "1.5rem",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      padding: "1rem",
      textAlign: "left",
      [theme.breakpoints.up("sm")]: {
         padding: "2rem",
         maxWidth: 600,
      },
      "& .MuiIconButton-root": {
         padding: "0",
      },
   },

   avatarGrid: {
      width: "100%",
      margin: "auto",
      [theme.breakpoints.up("sm")]: {
         width: "initial",
      },
   },

   largeAvatar: {
      margin: "auto",
      fontSize: "3rem",
      width: theme.spacing(15),
      height: theme.spacing(15),
   },

   socialDetails: {
      margin: "1rem auto",
      fontSize: ".875rem",
      [theme.breakpoints.up("md")]: {
         fontSize: "",
      },
   },

   tabsContainer: {
      marginTop: "1rem",
      width: "100%",
      "& .MuiTabs-flexContainer": {
         justifyContent: "space-around",
      },
   },
   posts: {
      width: "100%",
      rowGap: "1rem",
      marginTop: "1rem",
   },
}));

export const MyProfile = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { authStatus, user } = useUserSelector();

   const { posts } = usePostSelector();
   const userPosts = posts.filter(({ author }) => author._id === user._id);

   let bookmarks = user?.bookmarks;
   bookmarks =
      bookmarks.length > 0
         ? bookmarks.map(({ post }) => posts.find(({ _id }) => _id === post._id))
         : bookmarks;

   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   const selectedTab = value === 0 ? userPosts : bookmarks;

   const logoutHandler = () => {
      dispatch(logoutBttnClicked());
      navigate("/login");
      localStorage.clear();
   };

   const [showList, setShowList] = useState("");

   return (
      <>
         {authStatus !== "loggedIn" && <p>Loading...</p>}
         {authStatus === "loggedIn" && (
            <Box className={classes.root}>
               <Grid container spacing={6}>
                  <Grid item className={classes.avatarGrid}>
                     <Avatar
                        alt={user.profilePicName}
                        src={user.profilePic}
                        className={classes.largeAvatar}>
                        {user.profilePicName}
                     </Avatar>
                  </Grid>
                  <Grid item xs={12} sm container>
                     <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                           <Typography variant="h5">
                              {user.userName}
                              <Button
                                 color="primary"
                                 disableElevation
                                 onClick={() => navigate("/profile/edit")}>
                                 Edit Profile
                              </Button>
                           </Typography>
                        </Grid>
                        <Grid item container direction="column" justify="flex-start">
                           <Grid item>
                              <Typography variant="body1" gutterBottom>
                                 {user.bio}
                              </Typography>
                           </Grid>
                           <Grid item>
                              <Typography variant="body2" color="textSecondary">
                                 <Link
                                    href={user.website}
                                    target="_blank"
                                    rel="noopener"
                                    color="textSecondary">
                                    {user.website}
                                 </Link>
                              </Typography>
                           </Grid>
                        </Grid>
                     </Grid>

                     <Grid item>
                        <IconButton size="medium" onClick={logoutHandler}>
                           <ExitToAppIcon />
                        </IconButton>
                     </Grid>
                  </Grid>
               </Grid>
               <Grid
                  item
                  container
                  className={classes.socialDetails}
                  direction="row"
                  justify="space-around"
                  alignItems="center">
                  <Grid item>
                     <Typography variant="text">{userPosts.length} POSTS</Typography>
                  </Grid>
                  <Grid item>
                     <Button onClick={() => setShowList("followers")}>
                        {user.followers.length} followers
                     </Button>
                  </Grid>
                  <Grid item>
                     <Button onClick={() => setShowList("following")}>
                        {user.following.length} following
                     </Button>
                  </Grid>
               </Grid>

               <Paper square className={classes.tabsContainer}>
                  <Tabs
                     value={value}
                     indicatorColor="primary"
                     textColor="primary"
                     onChange={handleChange}
                     centered={true}
                     aria-label="disabled tabs example">
                     <Tab label="Posts" />
                     <Tab label="Bookmarked" />
                  </Tabs>
               </Paper>

               {selectedTab.length === 0 && <div>No Posts</div>}
               {selectedTab.map((post) => (
                  <Grid key={post._id} container className={classes.posts} justify="center">
                     <PostCard post={post} />
                  </Grid>
               ))}
            </Box>
         )}
         <ListUsersModal
            open={Boolean(showList)}
            usersList={showList === "followers" ? user.followers : user.following}
            onClose={() => setShowList("")}
            modalHead={showList}
         />
      </>
   );
};
