import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Avatar from "@material-ui/core/Avatar";
import NotificationsIcon from "@material-ui/icons/Notifications";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HomeIcon from "@material-ui/icons/Home";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
   logoutBttnClicked,
   useUserSelector,
} from "../../features/authentication/authenticationSlice";
import { newPostBttnClicked } from "../../features/posts/postSlice";

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
   },
   searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
   },
   inputRoot: {
      color: "inherit",
   },
   inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "20ch",
   },
   smallAvatar: {
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
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
}));

export function NavBarDesktop() {
   const classes = useStyles();
   const [anchorEl, setAnchorEl] = React.useState(null);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { user } = useUserSelector();

   const isMenuOpen = Boolean(anchorEl);

   const handleProfileMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleMenuClose = () => {
      setAnchorEl(null);
   };

   const menuId = "primary-search-account-menu";
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
               <Typography variant="h6" className={classes.sectionDesktop}>
                  Baddy-Buzz
               </Typography>
               <Typography variant="h6" className={classes.sectionMobile}>
                  BB
               </Typography>
               <div className={classes.search}>
                  <div className={classes.searchIcon}>
                     <SearchIcon />
                  </div>
                  <InputBase
                     placeholder="Search…"
                     classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                     }}
                     inputProps={{ "aria-label": "search" }}
                  />
               </div>
               <div className={classes.sectionDesktop}>
                  <IconButton
                     aria-label="show 4 new mails"
                     color="inherit"
                     onClick={() => navigate("/")}>
                     <HomeIcon />
                  </IconButton>
                  <IconButton
                     aria-label="show 4 new mails"
                     color="inherit"
                     onClick={() => dispatch(newPostBttnClicked())}>
                     <PostAddIcon />
                  </IconButton>
                  <IconButton aria-label="show 17 new notifications" color="inherit">
                     <Badge badgeContent={1} color="secondary">
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
                  <IconButton aria-label="show more" aria-haspopup="true" color="inherit">
                     <Badge badgeContent={1} color="secondary">
                        <NotificationsIcon />
                     </Badge>
                  </IconButton>
               </div>
            </Toolbar>
         </AppBar>
         {renderMenu}
      </div>
   );
}
