import React, { useEffect } from "react";

import Grid from "@material-ui/core/Grid";

import { PostCard } from "./PostCard";
import { loadPosts, usePostSelector } from "./postSlice";
import { useDispatch } from "react-redux";
import { NewPostModal } from "./NewPostModal";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      rowGap: "1rem",
   },
}));

export const Posts = () => {
   const classes = useStyles();

   const { posts } = usePostSelector();
   return (
      <>
         <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.root}>
            {posts.length === 0 && <div>No Posts</div>}
            {posts.map((post) => (
               <Grid key={post._id} item>
                  <PostCard post={post} />
               </Grid>
            ))}
         </Grid>
         <NewPostModal />
      </>
   );
};
