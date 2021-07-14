import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HomeIcon from "@material-ui/icons/Home";
import { logoutBttnClicked, useUserSelector, newPostBttnClicked } from "../../../features";
import { SearchBar } from "../SearchBar";
import { NotificationsPopover } from "./components/NotificationsPopover";

const useStyles = makeStyles((theme) => ({
   grow: {
      flexGrow: 1,
   },
   toolBar: {
      justifyContent: "space-around",
   },
   menuButton: {
      marginRight: theme.spacing(2),
   },

   search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#EEF2FF",
      "&:hover": {
         backgroundColor: "white",
      },
      marginLeft: "1rem",
      alignSelf: "center",
      width: "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      columnGap: 0,
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
   },
   inputRoot: {
      color: "inherit",
      border: "none",
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddinRight: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "20ch",
      zIndex: 4654,
   },
   smallAvatar: {
      fontSize: "1rem",
      width: theme.spacing(4.5),
      height: theme.spacing(4.5),
   },
   sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
         display: "flex",
      },
   },
   sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
         display: "none",
      },
   },
   searchList: {
      position: "fixed",
      width: "15rem",
      top: "4rem",
   },
}));

export function NavBarTop() {
   const classes = useStyles();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useUserSelector();
   const userNotifications = user.notifications ? user.notifications : [];

   // -----------profile menu---------------//
   const [anchorEl, setAnchorEl] = useState(null);
   const isMenuOpen = Boolean(anchorEl);
   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleMenuClose = () => {
      setAnchorEl(null);
   };
   const menuId = "primary-search-account-menu";

   // -----------notifications popover---------------//
   const [notificationsPopover, setNotificationsPopover] = React.useState(null);
   const handleClick = (event) => {
      setNotificationsPopover(event.currentTarget);
   };
   const handleClose = () => {
      setNotificationsPopover(null);
   };
   const open = Boolean(notificationsPopover);
   const notificationsId = open ? "notification-popover" : undefined;

   const renderMenu = (
      <Menu
         anchorEl={anchorEl}
         anchorOrigin={{ vertical: "top", horizontal: "right" }}
         id={menuId}
         keepMounted
         transformOrigin={{ vertical: "top", horizontal: "right" }}
         open={isMenuOpen}
         onClose={handleMenuClose}>
         <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
         <MenuItem onClick={() => dispatch(logoutBttnClicked())}>Logout</MenuItem>
      </Menu>
   );

   return (
      <div className={classes.grow}>
         <AppBar position="fixed">
            <Toolbar className={classes.toolBar}>
               <Typography
                  variant="h6"
                  className={classes.sectionDesktop}
                  onClick={() => navigate("/")}>
                  Baddy-Buzz
               </Typography>
               <Typography variant="h6" className={classes.sectionMobile}>
                  BB
               </Typography>
               <SearchBar />
               <div className={classes.sectionDesktop}>
                  <IconButton aria-label="go to home" color="inherit" onClick={() => navigate("/")}>
                     <HomeIcon />
                  </IconButton>
                  <IconButton
                     aria-label="new post"
                     color="inherit"
                     onClick={() => dispatch(newPostBttnClicked())}>
                     <PostAddIcon />
                  </IconButton>
                  <IconButton
                     aria-label="show 17 new notifications"
                     color="inherit"
                     onClick={handleClick}
                     id={notificationsId}>
                     <Badge badgeContent={userNotifications.length} color="secondary">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
                  <IconButton
                     edge="end"
                     aria-label="account of current user"
                     aria-controls={menuId}
                     aria-haspopup="true"
                     onClick={handleProfileMenuOpen}
                     color="inherit">
                     <Avatar
                        alt={user.profilePicName}
                        src={user.profilePic}
                        className={classes.smallAvatar}>
                        {user.profilePicName}
                     </Avatar>
                  </IconButton>
               </div>
               <div className={classes.sectionMobile}>
                  <IconButton
                     aria-label="notifications"
                     aria-haspopup="true"
                     color="inherit"
                     onClick={handleClick}
                     id={notificationsId}>
                     <Badge badgeContent={userNotifications.length} color="secondary">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
               </div>
            </Toolbar>
         </AppBar>
         {renderMenu}

         <NotificationsPopover
            id={notificationsId}
            open={open}
            anchorEl={notificationsPopover}
            onClose={handleClose}
         />
      </div>
   );
}
