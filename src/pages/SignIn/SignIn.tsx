import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { signInStyles } from "./styles";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormHelperText from "@mui/material/FormHelperText";

import logo from "../../assets/logo.png";
import Copyright from "../../components/common/Copyright/Copyright";
import LinkComponent from "../../components/common/LinkComponent/LinkComponent";

import {
  login,
  selectAuthError,
  selectAuthLoading,
} from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { LoginUser, InputsTouched } from "../../interfaces/User";
import { validateLogin } from "../../helpers/validateLogin";
import Toast from "../../components/common/Toast/Toast";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function SignIn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  
  const [inputsTouched, setInputsTouched] = useState<InputsTouched>({
    username: false,
    password: false,
  });
  const [userCredentials, setUserCredentials] = useState<LoginUser>({
    username: "",
    password: "",
  });

  const inputErrors = validateLogin(userCredentials, inputsTouched);

  const handleToggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (ev: ChangeEvent, key: string) => {
    setInputsTouched((prevState) => ({
      ...prevState,
      [key]: true,
    }));
    setUserCredentials((prevState) => ({
      ...prevState,
      [key]: ev.target.value,
    }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    await dispatch(login(userCredentials)).unwrap();
    navigate("/catalog");
  };

  return (
    <Box
      component="main"
      sx={signInStyles.main}
    >
      <Container
        component="section"
        maxWidth="xs"
        sx={signInStyles.card}
      >
        <Box sx={signInStyles.formContainer}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="700"
          >
            Sign In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid
              container
              spacing={4}
            >
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  autoFocus
                  onChange={(ev) => handleChange(ev, "username")}
                  value={userCredentials.username}
                  error={!!inputErrors.usernameError}
                  helperText={inputErrors.usernameError}
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <FormControl
                  variant="outlined"
                  fullWidth
                >
                  <InputLabel
                    htmlFor="outlined-adornment-password"
                    error={!!inputErrors.passwordError}
                  >
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={userCredentials.password}
                    onChange={(ev) => handleChange(ev, "password")}
                    error={!!inputErrors.passwordError}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleToggleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                  <FormHelperText error>
                    {inputErrors.passwordError}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={signInStyles.submit}
              disabled={inputErrors.formDisabled}
            >
              Sign In
            </Button>
            <Grid
              container
              spacing={1}
              direction="column"
              alignItems="center"
              justifyContent="center"
            >
              <Grid
                item
                xs={12}
              >
                <LinkComponent path="/sign-up">
                  Don't have an account? Sign Up
                </LinkComponent>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <LinkComponent path="/catalog">
                  Continue to Catalog
                </LinkComponent>
              </Grid>
              <Box
                sx={signInStyles.logo}
                component="img"
                alt="Car logo"
                src={logo}
              />
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 0 }} />
      </Container>
      <Toast error={error} loading={loading}/>
    </Box>
  );
}
