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

import { signUpStyles } from "./styles";
import Toast from "../../components/common/Toast/Toast";
import Copyright from "../../components/common/Copyright/Copyright";
import LinkComponent from "../../components/common/LinkComponent/LinkComponent";

import useRegister from "../../hooks/useRegister";
import { appRoutes } from "../../constants/appRoutes";

export default function SignUp() {
  const {
    error,
    loading,
    showPassword,
    handleToggleShowPassword,
    handleMouseDownPassword,
    userCredentials,
    inputErrors,
    handleChange,
    handleRegisterSubmit,
  } = useRegister();

  return (
    <Box
      component="main"
      sx={signUpStyles.main}
    >
      <Toast
        error={error}
        loading={loading}
      />
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
            onSubmit={handleRegisterSubmit}
            sx={signUpStyles.form}
          >
            <Grid
              container
              spacing={4}
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
                  error={!!inputErrors.firstNameError}
                  helperText={inputErrors.firstNameError}
                  onChange={(ev) => handleChange(ev)}
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
                  error={!!inputErrors.lastNameError}
                  helperText={inputErrors.lastNameError}
                  onChange={(ev) => handleChange(ev)}
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
                  error={!!inputErrors.usernameError}
                  helperText={inputErrors.usernameError}
                  onChange={(ev) => handleChange(ev)}
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
                    name="password"
                    id="outlined-adornment-password"
                    type={showPassword ? "text" : "password"}
                    value={userCredentials.password}
                    onChange={(ev) => handleChange(ev)}
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
              sx={signUpStyles.submit}
              disabled={inputErrors.formDisabled}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
            >
              <Grid item>
                <LinkComponent path={appRoutes.index}>
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
