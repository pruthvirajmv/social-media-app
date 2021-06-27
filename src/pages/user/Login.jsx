import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthFormActionType } from "./authForm/AuthFormActionType";

import useAuthForm from "./authForm/useAuthForm";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      maxWidth: 360,
      padding: "1rem",
   },
   authForm: {
      display: "flex",
      flexDirection: "column",
      rowGap: "1rem",
      flexWrap: "wrap",
   },
   authFormLabel: {
      marginBottom: "0.5rem",
   },
}));

export function Login() {
   const classes = useStyles();
   const { state } = useLocation();
   const navigate = useNavigate();
   const { authFormState, authFormDispatch } = useAuthForm();

   return (
      <Box display="flex" justifyContent="center" alignItems="center">
         <Paper className={classes.root} elevation={3}>
            <Typography variant="h4" align="center" gutterBottom>
               User Login
            </Typography>
            <form className={classes.authForm}>
               <div>
                  <InputLabel className={classes.authFormLabel} htmlFor="outlined-adornment-email">
                     Email
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder="please enter registered email"
                        margin="dense"
                        labelWidth={0}
                        type="text"
                        required={true}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_EMAIL,
                              payload: e.target.value,
                           })
                        }
                     />
                  </FormControl>
               </div>
               <div>
                  <InputLabel
                     className={classes.authFormLabel}
                     htmlFor="outlined-adornment-password">
                     Password
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder="please enter your password"
                        margin="dense"
                        type={authFormState.showPassword ? "text" : "password"}
                        required={true}
                        labelWidth={0}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_PASSWORD,
                              payload: e.target.value,
                           })
                        }
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={(e) =>
                                    authFormDispatch({
                                       type: AuthFormActionType.TOGGLE_SHOW_PASSOWRD,
                                       payload: e.target.value,
                                    })
                                 }
                                 edge="end">
                                 {authFormState.showPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                           </InputAdornment>
                        }
                     />
                  </FormControl>
               </div>
               <div>
                  <Button
                     fullWidth={true}
                     color="primary"
                     variant="contained"
                     disableElevation={true}>
                     {authFormState.isLoading && <CircularProgress color="secondary" size="1rem" />}
                     {authFormState.isLoading ? " Loading..." : "Login"}
                  </Button>
               </div>
               <Typography variant="body1" color="error" align="center">
                  {authFormState.errorMessage}
               </Typography>
               <Typography variant="h6">
                  Not a user yet? &nbsp;
                  <Button
                     variant="outlined"
                     size="small"
                     color="primary"
                     onClick={() => navigate("/signup")}>
                     Signup
                  </Button>
               </Typography>
            </form>
         </Paper>
      </Box>
   );
}
