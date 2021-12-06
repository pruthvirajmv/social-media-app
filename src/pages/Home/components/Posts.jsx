import React from "react";

import Grid from "@material-ui/core/Grid";

import { PostCard } from "./PostCard";
import { usePostSelector } from "../../../features";

import { makeStyles } from "@material-ui/core/styles";

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
      height: `calc(100vh - 32rem)`,
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

export const Posts = () => {
   const classes = useStyles();

   const { posts } = usePostSelector();
   return (
      <>
         {posts.length === 0 && <div>No Posts</div>}
         {posts.map((post) => (
            <Grid key={post._id} item className={classes.gridItem}>
               <PostCard post={post} />
            </Grid>
         ))}
      </>
   );
};
