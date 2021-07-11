import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { UserSuggestions } from "../components";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      maxWidth: "25rem",
      margin: "auto",
      alignItems: "center",
   },
}));

export function FollowSuggestion() {
   const classes = useStyles();

   return (
      <Container className={classes.root}>
         <Typography variant="h6" align="center">
            Suggestions for you
         </Typography>
         <UserSuggestions />
      </Container>
   );
}
