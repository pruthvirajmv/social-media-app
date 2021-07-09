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

const useStyles = makeStyles((theme) => ({
   root: {
      width: 320,
      margin: "auto",
   },
}));

export const LikedByUsersModal = ({ open, likedUsers, onClose }) => {
   const classes = useStyles();
   return (
      <Dialog open={open} aria-labelledby="simple-dialog-title" onClose={onClose}>
         <DialogTitle id="simple-dialog-title">Liked By Users</DialogTitle>
         <List className={classes.root}>
            {likedUsers.map(({ user }, id) => (
               <ListItem key={id}>
                  <ListItemAvatar button>
                     <Avatar alt={user.profilePicName} src={user.profilePic}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.userName} secondary={user.fullName} />
                  <Button onClick={onClose} color="primary">
                     Follow
                  </Button>
               </ListItem>
            ))}
         </List>
      </Dialog>
   );
};
