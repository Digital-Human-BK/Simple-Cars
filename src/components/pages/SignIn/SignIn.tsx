import {  useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";


import logo from "../../../assets/logo.png";
import image from "../../../assets/landing.jpg";
import Copyright from "../../common/Copyright/Copyright";

export default function SignIn() {
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      password: data.get("password"),
    });
  };

  return (
    <Box
      component="main"
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `url(${image}) no-repeat center center/cover`,
      }}
    >
      <Container
        component="section"
        maxWidth="xs"
        sx={{
          padding: "2rem 1rem",
          borderRadius: "0.25rem",
          backgroundColor: "rgba(255,255,255, 0.75)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
                />
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
                <Link
                  onClick={() => navigate("/sign-up")}
                  variant="body2"
                  underline="hover"
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  Don't have an account? Sign Up
                </Link>
              </Grid>
              <Grid
                item
                xs={12}
              >
                <Link
                  onClick={() => navigate("/catalog")}
                  variant="body2"
                  underline="hover"
                  sx={{
                    cursor: "pointer"
                  }}
                >
                  Continue to Catalog
                </Link>
              </Grid>
              <Box
                sx={{
                  width: "100%",
                  objectFit: "contain",
                  mt: 8,
                }}
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
