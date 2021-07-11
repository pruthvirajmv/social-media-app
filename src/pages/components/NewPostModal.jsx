import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import CloseIcon from "@material-ui/icons/Close";
import ImageIcon from "@material-ui/icons/Image";
import { makeStyles } from "@material-ui/core/styles";

import {
   newPostCancelBttnClicked,
   postButtonClicked,
   setNewPostCaption,
   setNewPostContent,
   setNewPostMedia,
   usePostSelector,
   useUserSelector,
} from "../../features";

import { checkAxiosError, CLOUDINARY_BASE_URL, CLOUDINARY_PRESET } from "../../utils";

const useStyles = makeStyles((theme) => ({
   dialogTitle: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "-0.8rem auto",
   },
   dialogActions: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
   },

   dragAndDropArea: {
      display: "flex",
      alignItems: "center",
      border: "2px dashed #9CA3AF",
      margin: "auto 1.2rem 1.2rem 1.2rem",
      padding: "0.4rem",
      backgroundColor: "#fafafa",
      height: "5rem",
   },
}));

export function NewPostModal() {
   const { newPostModal, newPost } = usePostSelector();
   const { user } = useUserSelector();
   const dispatch = useDispatch();

   const [postMedia, setPostMedia] = useState(false);
   const classes = useStyles();

   const onDrop = async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", CLOUDINARY_PRESET);

      try {
         const response = await fetch(`${CLOUDINARY_BASE_URL}/image/upload`, {
            method: "POST",
            body: formData,
         });
         const res = await response.json();
         dispatch(setNewPostMedia(res.secure_url));
         setPostMedia(false);
      } catch (error) {
         checkAxiosError(error);
      }
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: "image/jpeg, image/png, image/gif, image/jpg",
      multiple: false,
   });

   const postBttnHandler = () => {
      const addNewPost = {
         caption: newPost.caption,
         content: newPost.content,
         media: newPost.media,
      };
      dispatch(postButtonClicked(addNewPost));
   };

   return (
      <>
         <Dialog
            aria-labelledby="customized-dialog-title"
            open={newPostModal}
            onClose={() => dispatch(newPostCancelBttnClicked())}>
            <DialogTitle id="customized-dialog-title">
               <Grid container className={classes.dialogTitle}>
                  <Grid item>
                     <Typography>New Post</Typography>
                  </Grid>
                  <Grid item>
                     <IconButton
                        aria-label="close"
                        onClick={() => dispatch(newPostCancelBttnClicked())}>
                        <CloseIcon />
                     </IconButton>
                  </Grid>
               </Grid>
            </DialogTitle>
            <DialogContent dividers>
               <Grid container wrap="nowrap" spacing={2}>
                  <Grid item>
                     <Avatar alt={user.profilePicName} src={user.profilePic}></Avatar>
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>
                     <Grid item>
                        <TextField
                           variant="outlined"
                           placeholder="enter caption"
                           size="small"
                           autoFocus
                           value={newPost.caption}
                           onChange={(e) => dispatch(setNewPostCaption(e.target.value))}
                        />
                     </Grid>
                     <Grid item>
                        <TextField
                           variant="outlined"
                           placeholder="wassup!"
                           multiline
                           fullWidth
                           rows="5"
                           value={newPost.content}
                           onChange={(e) => dispatch(setNewPostContent(e.target.value))}
                        />
                     </Grid>
                  </Grid>
               </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
               <IconButton aria-label="media" onClick={() => setPostMedia(true)}>
                  <ImageIcon />
               </IconButton>
               <Button
                  onClick={postBttnHandler}
                  color="primary"
                  variant="contained"
                  disableElevation={true}
                  size="small">
                  Post
               </Button>
            </DialogActions>
         </Dialog>

         <Dialog
            aria-labelledby="customized-dialog-title"
            open={postMedia}
            onClose={() => setPostMedia(false)}>
            <DialogTitle id="customized-dialog-title">Upload file</DialogTitle>
            <DialogContent>
               <Box {...getRootProps()} className={classes.dragAndDropArea}>
                  <InputBase {...getInputProps()} />
                  {isDragActive ? (
                     <Typography>Drop the files here ...</Typography>
                  ) : (
                     <Typography>
                        Drag 'n' drop some files here, or click to select files
                     </Typography>
                  )}
               </Box>
            </DialogContent>
         </Dialog>
      </>
   );
}
