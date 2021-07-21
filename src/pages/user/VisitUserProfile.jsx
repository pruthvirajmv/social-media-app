import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import {
   followBttnClicked,
   usePostSelector,
   useUserSelector,
   useUsersSelector,
} from "../../features";
import { ListUsersModal } from "../components/ListUsersModal";
import { PostCard } from "../Home/components/PostCard";

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
   buzzDetails: {
      padding: "0rem",
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

export const VisitUserProfile = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { username } = useParams();
   const { authStatus, user } = useUserSelector();
   const { users } = useUsersSelector();
   const { posts } = usePostSelector();

   const [selectedUser, setSelectedUser] = useState(null);
   const [selectedUserPosts, setSelectedUserPosts] = useState([]);

   useEffect(() => {
      let getUserProfile = users.find((user) => user.userName === username);
      setSelectedUser({ ...getUserProfile });

      let getUserPosts = posts.filter(({ author }) => author.userName === username);
      setSelectedUserPosts(getUserPosts);
   }, [users, username, posts]);

   const [value, setValue] = useState(0);
   const handleChange = (event, newValue) => {
      setValue(newValue);
   };
   const selectedTab = selectedUserPosts;

   const [showList, setShowList] = useState("");

   return (
      <>
         {selectedUser === null && <Typography>Loding...</Typography>}

         <Box className={classes.root}>
            {selectedUser !== null && (
               <>
                  <Grid container spacing={8}>
                     <Grid item>
                        <Avatar
                           alt={selectedUser.profilePicName}
                           src={selectedUser.profilePic}
                           className={classes.largeAvatar}>
                           {selectedUser.profilePicName}
                        </Avatar>
                     </Grid>
                     <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                           <Grid item xs>
                              <Typography gutterBottom variant="h5">
                                 {selectedUser.userName}
                                 <Button
                                    color="primary"
                                    disableElevation
                                    onClick={() => {
                                       authStatus === "loggedIn"
                                          ? dispatch(followBttnClicked(selectedUser._id))
                                          : navigate("/login");
                                    }}>
                                    {user.following.some(
                                       (following) => following.user._id === selectedUser._id
                                    )
                                       ? "following"
                                       : "follow"}
                                 </Button>
                              </Typography>
                           </Grid>
                           <Grid
                              item
                              container
                              direction="row"
                              justify="space-around"
                              alignItems="center"
                              className={classes.buzzDetails}>
                              <Grid item>
                                 <Typography gutterBottom>
                                    {selectedUserPosts.length} posts
                                 </Typography>
                              </Grid>
                              <Grid item>
                                 <Button onClick={() => setShowList("followers")}>
                                    {selectedUser.followers.length} followers
                                 </Button>
                              </Grid>
                              <Grid item>
                                 <Button onClick={() => setShowList("following")}>
                                    {selectedUser.following.length} following
                                 </Button>
                              </Grid>
                           </Grid>
                           <Grid item>
                              <Typography variant="body1" gutterBottom>
                                 {selectedUser.bio}
                              </Typography>
                              <Typography variant="body2" color="textSecondary">
                                 {selectedUser.website}
                              </Typography>
                           </Grid>
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
                     </Tabs>
                  </Paper>
               </>
            )}
            {selectedUserPosts.length !== 0 && (
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
            )}
         </Box>

         <ListUsersModal
            open={showList}
            likedUsers={
               showList === "followers" ? selectedUser?.followers : selectedUser?.following
            }
            onClose={() => setShowList("")}
            modalHead={showList}
         />
      </>
   );
};
