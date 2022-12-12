import React, { useState } from "react";

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

import logo from "../../assets/logo.png";
import Copyright from "../../components/common/Copyright/Copyright";
import { login } from "../../store/auth-slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import LinkComponent from "../../components/common/LinkComponent/LinkComponent";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function SignIn() {
  const dispatch = useAppDispatch();
  // const user = useAppSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });

  const handleToggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleChange = (ev: ChangeEvent, key: string) => {
    setUserCredentials((prevState) => ({
      ...prevState,
      [key]: ev.target.value,
    }));
  };

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const user = await dispatch(login(userCredentials));
      console.log(user.payload);
    } catch (error) {
      alert(error);
    }
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
              spacing={2}
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
                  <InputLabel htmlFor="outlined-adornment-password">
                    Password
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={userCredentials.password}
                    onChange={(ev) => handleChange(ev, "password")}
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
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={signInStyles.submit}
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
    </Box>
  );
}
