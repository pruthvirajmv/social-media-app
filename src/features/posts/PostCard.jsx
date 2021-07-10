import React, { useState } from "react";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import Divider from "@material-ui/core/Divider";
import CardMedia from "@material-ui/core/CardMedia";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

import { LikedByUsersModal } from "./LikedByUsersModal";
import { useDispatch } from "react-redux";
import { deletePostButtonClicked, likeButtonClicked } from "./postSlice";
import {
   bookmarkBttnClicked,
   useUserSelector,
   followBttnClicked,
} from "../authentication/authenticationSlice";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100vh",

      "@media screen and (min-width: 460px)": {
         width: 460,
      },
   },
   bookmarkIcon: {
      marginLeft: "auto",
   },
   cardFooter: {
      padding: "0 1rem 0",
   },
}));

export const PostCard = ({ post }) => {
   const classes = useStyles();

   const [likedByModal, setLikedByModal] = useState(false);

   const dispatch = useDispatch();
   const { user } = useUserSelector();

   const postCreatedOn = (postedTime) => {
      const currentTime = Date.now();
      const postedTimeAgo = (currentTime - postedTime) / 1000;
      if (postedTimeAgo < 60) {
         return `${Math.floor(postedTimeAgo)} sec ago`;
      }
      if (postedTimeAgo > 60 && postedTimeAgo < 3600) {
         return `${Math.floor(postedTimeAgo / 60)} min ago`;
      }
      if (postedTimeAgo > 3600 && postedTimeAgo < 86400) {
         return `${Math.floor(postedTimeAgo / 3600)} hr ago`;
      }
      const createdDate = new Date(post.createdOn);
      return createdDate.toDateString();
   };

   return (
      <Card variant="outlined" className={classes.root}>
         <CardHeader
            avatar={
               <Avatar alt={post.author.profilePicName} src={post.author.profilePic}>
                  {post.author.profilePicName}
               </Avatar>
            }
            title={post.author.userName}
            subheader={postCreatedOn(post.createdOn)}
            action={
               post.author._id === user._id ? (
                  <IconButton
                     aria-label="delete post"
                     onClick={() => dispatch(deletePostButtonClicked(post._id))}>
                     <DeleteRoundedIcon />
                  </IconButton>
               ) : (
                  <Button
                     onClick={() => dispatch(followBttnClicked(post.author._id))}
                     color="primary">
                     {user.following.some((following) => following.user._id === post.author._id)
                        ? "following"
                        : "follow"}
                  </Button>
               )
            }
         />
         <Divider />
         {post?.media && (
            <CardMedia component="img" image={post.media} title="Post" height="auto" />
         )}
         <CardContent>
            <Typography variant="body2" color="textPrimary" component="p">
               {post.content}
            </Typography>
         </CardContent>
         <Grid direction="column" container spacing={1}>
            <Grid item>
               <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  component="p"
                  className={classes.cardFooter}>
                  {post.likedBy.length === 0 && "Be the first to like"}
                  {post.likedBy.length > 0 && (
                     <Link
                        component="button"
                        variant="subtitle2"
                        color="textSecondary"
                        onClick={() => {
                           setLikedByModal((prev) => !prev);
                        }}>
                        liked by {post.likedBy.length} people
                     </Link>
                  )}
               </Typography>
            </Grid>
            <Grid item>
               <Typography
                  variant="subtitle2"
                  color="textPrimary"
                  component="p"
                  className={classes.cardFooter}>
                  {post.author.userName} {post.caption}
               </Typography>
            </Grid>
         </Grid>

         <CardActions disableSpacing>
            <IconButton
               aria-label="add to favorites"
               color={
                  post.likedBy.some((likedUser) => likedUser.user._id === user._id)
                     ? "secondary"
                     : "default"
               }
               onClick={() => dispatch(likeButtonClicked(post._id))}>
               <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>
            <IconButton
               variant="contained"
               color={
                  user.bookmarks.some((bookmarkedPost) => bookmarkedPost.post._id === post._id)
                     ? "primary"
                     : "default"
               }
               onClick={() => dispatch(bookmarkBttnClicked(post._id))}
               className={classes.bookmarkIcon}>
               <BookmarkIcon />
            </IconButton>
         </CardActions>

         <LikedByUsersModal
            open={likedByModal}
            likedUsers={post.likedBy}
            onClose={() => setLikedByModal((prev) => !prev)}
            modalHead={"liked by"}
         />
      </Card>
   );
};
