import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";

import { useUserSelector, newPostBttnClicked } from "../../../features";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      display: "flex",
      position: "fixed",
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.up("md")]: {
         display: "none",
      },
      "& .MuiBottomNavigationAction-root.Mui-selected": {
         color: theme.palette.text.primary,
      },
   },
   avatar: {
      fontSize: "1rem",
      width: theme.spacing(3.5),
      height: theme.spacing(3.5),
   },
}));

export function NavBarBottom() {
   const classes = useStyles();
   const [value, setValue] = useState(0);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { user } = useUserSelector();

   return (
      <BottomNavigation
         value={value}
         onChange={(event, newValue) => {
            setValue(newValue);
         }}
         showLabels
         className={classes.root}>
         <BottomNavigationAction icon={<HomeIcon onClick={() => navigate("/")} />} />
         <BottomNavigationAction
            icon={<PostAddIcon onClick={() => dispatch(newPostBttnClicked())} />}
         />
         <BottomNavigationAction
            icon={
               <Avatar
                  src={user.profilePic}
                  className={classes.avatar}
                  onClick={() => navigate("/profile")}
               />
            }
         />
      </BottomNavigation>
   );
}
