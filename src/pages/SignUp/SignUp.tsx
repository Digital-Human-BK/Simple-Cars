import { useState } from "react";

import { signUpStyles } from "./styles";
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

import Copyright from "../../components/common/Copyright/Copyright";
import LinkComponent from "../../components/common/LinkComponent/LinkComponent";

type ChangeEvent = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    firstName: "",
    lastName: "",
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
    console.log(ev.target.value);

    setUserCredentials((prevState) => ({
      ...prevState,
      [key]: ev.target.value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // await register(userCredentials);

      // const user = await login({
      //   username: userCredentials.username,
      //   password: userCredentials.password,
      // });

      // console.log(user);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Box
      component="main"
      sx={signUpStyles.main}
    >
      <Container
        component="section"
        maxWidth="xs"
        sx={signUpStyles.card}
      >
        <Box sx={signUpStyles.formContainer}>
          <Typography
            component="h1"
            variant="h4"
            fontWeight="700"
          >
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={signUpStyles.form}
          >
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  required
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  onChange={(ev) => handleChange(ev, "fistName")}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  onChange={(ev) => handleChange(ev, "lastName")}
                />
              </Grid>
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
                  onChange={(ev) => handleChange(ev, "username")}
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
              sx={signUpStyles.submit}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
            >
              <Grid item>
                <LinkComponent path="/">
                  Already have an account? Sign in
                </LinkComponent>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
}
