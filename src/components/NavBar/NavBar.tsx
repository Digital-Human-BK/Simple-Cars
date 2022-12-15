import { useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import logo from "../../assets/logo.png";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { logout, selectUser } from "../../store/auth-slice";

export default function NavBar() {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            sx={{ width: "150px", ml: 8 }}
            component="img"
            alt="Car logo"
            src={logo}
          />
          {!user && (
            <Button
              color="inherit"
              sx={{ mr: 8 }}
              onClick={() => navigate("/")}
            >
              Login
            </Button>
          )}
          {user && (
            <Button
              color="inherit"
              sx={{ mr: 8 }}
              onClick={()=> dispatch(logout())
              }
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
