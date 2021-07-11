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

import { logoutBttnClicked, useUserSelector, usePostSelector } from "../../features";
import { PostCard } from "../Home/components/PostCard";
import { ListUsersModal } from "../components/ListUsersModal";

const useStyles = makeStyles((theme) => ({
   root: {
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
      fontSize: "3rem",
      width: theme.spacing(15),
      height: theme.spacing(15),
   },
   tabsContainer: {
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
   bookmarks = bookmarks
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
               <Grid container spacing={8}>
                  <Grid item>
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
                           <Typography gutterBottom variant="h5">
                              {user.userName}
                              <Button
                                 color="primary"
                                 disableElevation
                                 onClick={() => navigate("/profile/edit")}>
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
               <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                  className={classes.posts}>
                  {selectedTab.length === 0 && <div>No Posts</div>}
                  {selectedTab.map((post) => (
                     <Grid key={post._id} item>
                        <PostCard post={post} />
                     </Grid>
                  ))}
               </Grid>
            </Box>
         )}
         <ListUsersModal
            open={showList}
            likedUsers={showList === "followers" ? user.followers : user.following}
            onClose={() => setShowList("")}
            modalHead={showList}
         />
      </>
   );
};
