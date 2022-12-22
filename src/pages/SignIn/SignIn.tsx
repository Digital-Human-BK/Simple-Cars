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

import { signInStyles } from "./styles";
import logo from "../../assets/logo.png";
import Toast from "../../components/common/Toast/Toast";
import Copyright from "../../components/common/Copyright/Copyright";
import LinkComponent from "../../components/common/LinkComponent/LinkComponent";

import useLogin from "../../hooks/useLogin";
import { appRoutes } from "../../constants/appRoutes";

export default function SignIn() {
  const {
    error,
    loading,
    showPassword,
    handleToggleShowPassword,
    handleMouseDownPassword,
    userCredentials,
    inputErrors,
    handleChange,
    handleLoginSubmit,
  } = useLogin();

  return (
    <Box
      component="main"
      sx={signInStyles.main}
    >
      <Toast
        error={error}
        loading={loading}
      />
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
            onSubmit={handleLoginSubmit}
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
                  onChange={(ev) => handleChange(ev)}
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
                    name="password"
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
                <LinkComponent path={appRoutes.signUp}>
                  Don't have an account? Sign Up
                </LinkComponent>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <LinkComponent path={appRoutes.catalog}>
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
