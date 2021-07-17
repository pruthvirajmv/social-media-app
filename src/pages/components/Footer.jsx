import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";

const useStyles = makeStyles((theme) => ({
   root: {
      display: "block",
      position: "relative",
      marginTop: "5rem",
      marginBottom: "3rem",
      padding: "1rem",
      backgroundColor: theme.palette.primary.main,
      [theme.breakpoints.up("md")]: {
         marginBottom: 0,
      },
   },
   neogLink: {
      textDecoration: "none",
      pointer: "cursor",
   },
   footerGrid: {
      justifyContent: "center",
      rowGap: "0.3rem",
   },
   iconGrid: {
      justifyContent: "center",
      columnGap: "1rem",
   },
}));

export function Footer() {
   const classes = useStyles();
   return (
      <footer className={classes.root}>
         <Grid container className={classes.footerGrid}>
            <Grid item>
               <Typography>
                  made by pruthvirajmv
                  <Link
                     href="https://neog.camp/"
                     target="_blank"
                     rel="noopener"
                     className={classes.neogLink}
                     color="secondary">
                     @neoGcamp2021
                  </Link>
               </Typography>
            </Grid>
            <Grid item container className={classes.iconGrid}>
               <Grid item>
                  <Link
                     href="https://neog.camp/"
                     target="_blank"
                     rel="noopener"
                     color="textPrimary">
                     <GitHubIcon></GitHubIcon>
                  </Link>
               </Grid>
               <Grid item>
                  <Link
                     href="https://www.instagram.com/pruthvirajz_scope/"
                     target="_blank"
                     rel="noopener"
                     color="textPrimary">
                     <InstagramIcon></InstagramIcon>
                  </Link>
               </Grid>
               <Grid item>
                  <Link
                     href="https://twitter.com/pruthviraj528"
                     target="_blank"
                     rel="noopener"
                     color="textPrimary">
                     <TwitterIcon></TwitterIcon>
                  </Link>
               </Grid>
            </Grid>
            <Grid item>
               <Typography> © 2021 BaddyBuzz</Typography>
            </Grid>
         </Grid>
      </footer>
   );
}
