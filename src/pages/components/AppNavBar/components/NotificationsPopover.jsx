import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Popover from "@material-ui/core/Popover";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import ClearAllIcon from "@material-ui/icons/ClearAll";

import {
   clearNotificationBttnClicked,
   clearAllNotificationsBttnClicked,
   useUserSelector,
   useUsersSelector,
} from "../../../../features";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
   root: {
      "& a": {
         textDecoration: "none",
      },
   },
}));

export function NotificationsPopover({ id, open, anchorEl, onClose }) {
   const classes = useStyles();

   const dispatch = useDispatch();

   const { user } = useUserSelector();
   const { users } = useUsersSelector();

   const [userNotifications, setUserNotifications] = useState([]);
   useEffect(() => {
      if (user.notifications) setUserNotifications(user.notifications);
   }, [setUserNotifications, user.notifications]);

   const createNotification = (notification) => {
      const likedByUser = users.find(({ _id }) => _id === notification.activityByUser);
      return (
         <ListItem key={notification._id}>
            {notification.notificationType === "LIKED" ? (
               <>
                  <Link to={`/profile/${likedByUser?.userName}`} className={classes.root}>
                     {likedByUser?.userName}
                  </Link>
                  &nbsp; {notification.notify}
               </>
            ) : (
               <>
                  <Link to={`/profile/${likedByUser?.userName}`}>{likedByUser?.userName}</Link>
                  &nbsp; {notification.notify}
               </>
            )}
         </ListItem>
      );
   };

   return (
      <>
         <Popover
            className={classes.root}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "center",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "center",
            }}>
            <List dense>
               {userNotifications.length === 0 && (
                  <ListItem key={0}>
                     <ListItemText primary="no new notifications" />
                  </ListItem>
               )}
               {userNotifications.length !== 0 && (
                  <ListItem key={1}>
                     <ListItem key={1.1}>notifications</ListItem>
                     <ListItemSecondaryAction>
                        <IconButton onClick={() => dispatch(clearAllNotificationsBttnClicked())}>
                           <ClearAllIcon />
                        </IconButton>
                     </ListItemSecondaryAction>
                  </ListItem>
               )}
               {userNotifications.map((notification) => {
                  return (
                     <>
                        <ListItem>
                           {createNotification(notification)}
                           <ListItemSecondaryAction>
                              <IconButton
                                 onClick={() =>
                                    dispatch(clearNotificationBttnClicked(notification._id))
                                 }>
                                 <CloseIcon />
                              </IconButton>
                           </ListItemSecondaryAction>
                        </ListItem>
                     </>
                  );
               })}
            </List>
         </Popover>
      </>
   );
}
