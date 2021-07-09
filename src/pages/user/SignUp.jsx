import React from "react";
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
import { useDispatch } from "react-redux";
import {
   signUpBttnClicked,
   useUserSelector,
} from "../../features/authentication/authenticationSlice";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
   root: {
      width: "100%",
      maxWidth: 360,
      padding: "1rem 2rem",
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

export function SignUp() {
   const classes = useStyles();
   const navigate = useNavigate();
   const { authFormState, authFormDispatch } = useAuthForm();

   const dispatch = useDispatch();
   const { authError } = useUserSelector();

   const signupHandler = () => {
      if (
         !(
            authFormState.firstName ||
            authFormState.lastName ||
            authFormState.email ||
            authFormState.password
         )
      ) {
         return authFormDispatch({
            type: AuthFormActionType.SET_ERROR_MESSAGE,
            payload: "Please enter all the fields",
         });
      }
      if (authFormState.password !== authFormState.confirmPassword) {
         return authFormDispatch({
            type: AuthFormActionType.SET_ERROR_MESSAGE,
            payload: "password did not match",
         });
      }
      const user = {
         firstName: authFormState.firstName,
         lastName: authFormState.lastName,
         userName: authFormState.userName,
         email: authFormState.email,
         password: authFormState.password,
      };

      dispatch(signUpBttnClicked({ user, navigate }));
   };

   return (
      <Box display="flex" justifyContent="center" alignItems="center">
         <Paper className={classes.root} elevation={3}>
            <Typography variant="h4" align="center" gutterBottom>
               User Sign Up
            </Typography>
            <form className={classes.authForm}>
               <div>
                  <InputLabel className={classes.authFormLabel} htmlFor="outlined-adornment-email">
                     First Name
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder=" enter first name"
                        margin="dense"
                        labelwidth={0}
                        type="text"
                        required={true}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_FIRST_NAME,
                              payload: e.target.value,
                           })
                        }
                     />
                  </FormControl>
               </div>
               <div>
                  <InputLabel className={classes.authFormLabel} htmlFor="outlined-adornment-email">
                     Last Name
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder=" enter last name"
                        margin="dense"
                        labelwidth={0}
                        type="text"
                        required={true}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_LAST_NAME,
                              payload: e.target.value,
                           })
                        }
                     />
                  </FormControl>
               </div>
               <div>
                  <InputLabel className={classes.authFormLabel} htmlFor="outlined-adornment-email">
                     Username
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder=" enter user name"
                        margin="dense"
                        labelwidth={0}
                        type="text"
                        required={true}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_USER_NAME,
                              payload: e.target.value,
                           })
                        }
                     />
                  </FormControl>
               </div>
               <div>
                  <InputLabel className={classes.authFormLabel} htmlFor="outlined-adornment-email">
                     Email
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder=" enter email"
                        margin="dense"
                        labelwidth={0}
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
                        placeholder=" set password"
                        margin="dense"
                        type={authFormState.showPassword ? "text" : "password"}
                        required={true}
                        labelwidth={0}
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
                  <InputLabel
                     className={classes.authFormLabel}
                     htmlFor="outlined-adornment-show-password">
                     Confirm Password
                  </InputLabel>
                  <FormControl fullWidth className={classes.margin} variant="outlined">
                     <InputBase
                        placeholder="confirm password"
                        margin="dense"
                        type={authFormState.showConfirmPassword ? "text" : "password"}
                        required={true}
                        labelwidth={0}
                        onChange={(e) =>
                           authFormDispatch({
                              type: AuthFormActionType.SET_CONFIRM_PASSWORD,
                              payload: e.target.value,
                           })
                        }
                        endAdornment={
                           <InputAdornment position="end">
                              <IconButton
                                 aria-label="toggle password visibility"
                                 onClick={(e) =>
                                    authFormDispatch({
                                       type: AuthFormActionType.TOGGLE_SHOW_CONFIRM_PASSOWRD,
                                       payload: e.target.value,
                                    })
                                 }
                                 edge="end">
                                 {authFormState.showConfirmPassword ? (
                                    <Visibility />
                                 ) : (
                                    <VisibilityOff />
                                 )}
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
                     disableElevation={true}
                     onClick={signupHandler}
                     disabled={authFormState.isLoading ? true : false}>
                     {authFormState.isLoading && (
                        <CircularProgress color="primary" size="1.2rem" thickness={5} />
                     )}
                     {authFormState.isLoading ? " Loading..." : "Sign Up"}
                  </Button>
               </div>
               <Typography variant="body1" color="error" align="center">
                  {authFormState.errorMessage || authError}
               </Typography>
            </form>
         </Paper>
      </Box>
   );
}
