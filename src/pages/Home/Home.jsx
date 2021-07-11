import React from "react";

import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";

import { Link } from "react-router-dom";

import { UserSuggestions } from "../components";
import { useUserSelector } from "../../features";
import { Posts } from "./components/Posts";

const useStyles = makeStyles((theme) => ({
   root: {
      columnGap: "1rem",
      width: "100%",
      margin: "auto",
   },
   gridPost: {
      rowGap: "1rem",
      alignItems: "center",
      [theme.breakpoints.up("md")]: {
         alignItems: "flex-end",
         paddingRight: "8rem",
      },
   },
   gridItem: {
      "@media screen and (max-width: 460px)": {
         width: "100%",
      },
   },
   gridSuggestion: {
      display: "none",
      [theme.breakpoints.up("md")]: {
         display: "block",
      },
   },
   listSuggestion: {
      display: "none",
      position: "fixed",
      width: "18rem",
      height: `calc(100vh - 20rem)`,
      overflowY: "hidden",
      backgroundColor: theme.palette.background.paper,
      "& a": {
         textDecoration: "none",
      },
      [theme.breakpoints.up("md")]: {
         display: "block",
      },
   },
}));

export const Home = () => {
   const classes = useStyles();
   const { user } = useUserSelector();

   return (
      <Grid container direction="row" wrap="nowrap" className={classes.root}>
         <Grid item container direction="column" justify="center" className={classes.gridPost}>
            <Posts />
         </Grid>
         <Grid item xs={5} className={classes.gridSuggestion}>
            <List className={classes.listSuggestion}>
               <ListItem key={user._id}>
                  <ListItemAvatar>
                     <Link to={`/profile`}>
                        <Avatar alt={user.profilePicName} src={user.profilePic}>
                           {user.profilePicName}
                        </Avatar>
                     </Link>
                  </ListItemAvatar>
                  <ListItemText primary={user.fullName} />
               </ListItem>
               <ListItem key="0528">
                  <ListItemText primary="suggestions for you" />
                  <ListItemSecondaryAction>
                     <Link to="/followsuggestion">See All</Link>
                  </ListItemSecondaryAction>
               </ListItem>
               <UserSuggestions />
            </List>
         </Grid>
      </Grid>
   );
};
