import React from "react";

import {
   Dialog,
   DialogTitle,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Avatar,
   Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { followBttnClicked, useUserSelector } from "../../features";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   root: {
      width: 320,
      margin: "auto",
   },
}));

export const ListUsersModal = ({ open, likedUsers, onClose, modalHead }) => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const { user } = useUserSelector();
   const followingList = user.following;

   return (
      <Dialog open={open} aria-labelledby="simple-dialog-title" onClose={onClose}>
         <DialogTitle id="simple-dialog-title">{modalHead}</DialogTitle>
         <List className={classes.root}>
            {likedUsers?.map(({ user }, id) => (
               <ListItem key={id}>
                  <ListItemAvatar button>
                     <Link to={`/profile/${user.userName}`}>
                        <Avatar alt={user.profilePicName} src={user.profilePic}></Avatar>
                     </Link>
                  </ListItemAvatar>
                  <ListItemText primary={user.userName} secondary={user.fullName} />
                  <Button onClick={() => dispatch(followBttnClicked(user._id))} color="primary">
                     {followingList.some((following) => following.user._id === user._id)
                        ? "following"
                        : "follow"}
                  </Button>
               </ListItem>
            ))}
         </List>
      </Dialog>
   );
};
