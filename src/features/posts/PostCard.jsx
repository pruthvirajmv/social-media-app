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
import { makeStyles } from "@material-ui/core/styles";

import { LikedByUsersModal } from "./LikedByUsersModal";

const useStyles = makeStyles((theme) => ({
   root: {
      maxWidth: 460,
   },
   bookmarkIcon: {
      marginLeft: "auto",
   },
   cardFooter: {
      padding: "0 1rem 1rem",
   },
}));

export const PostCard = ({ post }) => {
   const classes = useStyles();

   const [likedByModal, setLikedByModal] = useState(false);

   console.log(likedByModal);

   return (
      <Card variant="outlined" className={classes.root}>
         <CardHeader
            avatar={<Avatar alt={post.author.name} src={post.author.profilePic}></Avatar>}
            title={post.caption}
            subheader={post.createdOn}
            action={
               <IconButton aria-label="delete post">
                  <DeleteRoundedIcon />
               </IconButton>
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
         <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
               <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>
            <IconButton variant="contained" color="primary" className={classes.bookmarkIcon}>
               <BookmarkIcon />
            </IconButton>
         </CardActions>
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
                  Liked by {post.likedBy.length} people
               </Link>
            )}
         </Typography>
         <LikedByUsersModal
            open={likedByModal}
            likedUsers={post.likedBy}
            onClose={() => setLikedByModal((prev) => !prev)}
         />
      </Card>
   );
};
