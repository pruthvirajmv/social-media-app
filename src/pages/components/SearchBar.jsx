import React, { useState } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@material-ui/core/styles/makeStyles";
import InputBase from "@material-ui/core/InputBase";
import CloseIcon from "@material-ui/icons/Close";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import SearchIcon from "@material-ui/icons/Search";

import { useUsersSelector, useUserSelector } from "../../features";

const useStyles = makeStyles((theme) => ({
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
   searchList: {
      position: "fixed",
      width: "15rem",
      top: "4rem",
      right: "auto",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: "#EEF2FF",
      height: "max-content",
      maxHeight: "20rem",
      overflowY: "scroll",
      "& a": {
         textDecoration: "none",
      },
      [theme.breakpoints.up("md")]: {
         right: `calc(50vw - 6rem)`,
      },
   },
}));

export function SearchBar() {
   const classes = useStyles();

   const { user } = useUserSelector();
   const { users } = useUsersSelector();

   const [searchKey, setSearchKey] = useState("");
   const [searchResult, setSearchResult] = useState([]);

   const handleSearchBar = (event) => {
      const searchInput = event.target.value;
      setSearchKey(searchInput);
      setSearchResult(() =>
         users.filter(
            ({ userName, fullName }) =>
               userName.toLowerCase().includes(searchInput) ||
               fullName.toLowerCase().includes(searchInput)
         )
      );
   };

   return (
      <>
         <div className={classes.search}>
            <InputBase
               id={"search-popover"}
               onFocus={() => setSearchKey("")}
               onChange={handleSearchBar}
               placeholder="Search user…"
               value={searchKey}
               classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
               }}
               inputProps={{ "aria-label": "search" }}
            />
            <div className={classes.searchIcon}>
               {searchKey !== "" ? (
                  <CloseIcon
                     onClick={() => {
                        setSearchKey("");
                        setSearchResult([]);
                     }}
                  />
               ) : (
                  <SearchIcon />
               )}
            </div>
         </div>
         {searchKey && (
            <List dense className={classes.searchList}>
               {searchResult.length === 0 && <ListItem>No baddy users found</ListItem>}
               {searchResult.map((suggestedUser) => {
                  return (
                     <ListItem key={suggestedUser._id}>
                        <ListItemAvatar>
                           <Link to={`/profile/${suggestedUser.userName}`}>
                              <Avatar
                                 onClick={() => setSearchKey("")}
                                 alt={suggestedUser.profilePicName}
                                 src={suggestedUser.profilePic}>
                                 {suggestedUser.profilePicName}
                              </Avatar>
                           </Link>
                        </ListItemAvatar>
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
                        <Divider variant="inset" component="li" />
                     </ListItem>
                  );
               })}
            </List>
         )}
      </>
   );
}
