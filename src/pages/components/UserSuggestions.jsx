import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";

import { followBttnClicked, useUserSelector, useUsersSelector } from "../../features";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "block",
      width: "18rem",
      backgroundColor: theme.palette.background.paper,
      "& a": {
         textDecoration: "none",
         color: "inherit",
      },
   },
}));

export function UserSuggestions() {
   const classes = useStyles();
   const dispatch = useDispatch();

   const { users } = useUsersSelector();
   const { user } = useUserSelector();

   let suggestedUsers = users.filter((suggestedUser) => user._id !== suggestedUser._id);
   suggestedUsers = suggestedUsers.filter((suggestedUser) => {
      if (user.following.length > 0) {
         return !user.following.some(
            (followingUser) => followingUser.user._id === suggestedUser._id
         );
      }
      return true;
   });

   return (
      <List dense className={classes.root}>
         {suggestedUsers.map((suggestedUser) => {
            return (
               <ListItem key={suggestedUser._id}>
                  <ListItemAvatar>
                     <Link to={`/profile/${suggestedUser.userName}`}>
                        <Avatar alt={suggestedUser.profilePicName} src={suggestedUser.profilePic}>
                           {suggestedUser.profilePicName}
                        </Avatar>
                     </Link>
                  </ListItemAvatar>
                  <Link to={`/profile/${suggestedUser.userName}`}>
                     <ListItemText
                        primary={suggestedUser.userName}
                        secondary={
                           user.followers.some(
                              (follower) => follower.user._id === suggestedUser._id
                           )
                              ? "follows you"
                              : suggestedUser.userName
                        }
                     />
                  </Link>
                  <ListItemSecondaryAction>
                     <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => dispatch(followBttnClicked(suggestedUser._id))}>
                        Follow
                     </Button>
                  </ListItemSecondaryAction>
               </ListItem>
            );
         })}
      </List>
   );
}
