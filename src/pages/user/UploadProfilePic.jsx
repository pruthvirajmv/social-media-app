import React from "react";
import { useDropzone } from "react-dropzone";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";

import { makeStyles } from "@material-ui/core/styles";

import { checkAxiosError, CLOUDINARY_BASE_URL, CLOUDINARY_PRESET } from "../../utils";
import { ProfileFormActionType } from "./updateProfileForm/ProfileFormActionType";

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
   dragAndDropInput: {
      width: "12rem",
      [theme.breakpoints.up("md")]: {
         width: "20rem",
      },
   },
}));

export function UploadProfilePic({ open, onClose, dispatch }) {
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
         dispatch({
            type: ProfileFormActionType.SET_PROFILE_PIC,
            payload: res.secure_url,
         });
         onClose();
      } catch (error) {
         checkAxiosError(error);
      }
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: "image/jpeg, image/png, image/gif, image/jpg",
      multiple: false,
   });

   return (
      <>
         <Dialog aria-labelledby="customized-dialog-title" open={open} onClose={onClose}>
            <DialogTitle id="customized-dialog-title">Upload file</DialogTitle>
            <DialogContent>
               <Box {...getRootProps()} className={classes.dragAndDropArea}>
                  <InputBase {...getInputProps()} />
                  {isDragActive ? (
                     <Typography className={classes.dragAndDropInput}>
                        Drop the files here ...
                     </Typography>
                  ) : (
                     <Typography className={classes.dragAndDropInput}>
                        Drag 'n' drop some files here, or click to select files
                     </Typography>
                  )}
               </Box>
            </DialogContent>
         </Dialog>
      </>
   );
}
