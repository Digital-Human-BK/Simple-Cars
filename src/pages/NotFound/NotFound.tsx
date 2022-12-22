import { useNavigate } from "react-router-dom";

import Box from "@mui/system/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { notFoundStyles } from "./styles";
import { appRoutes } from "../../constants/appRoutes";

function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      component="main"
      sx={notFoundStyles.main}
    >
      <Box sx={notFoundStyles.center}>
        <Typography
          component="h1"
          fontWeight={700}
          color="#fff"
          fontSize="60px"
          mb="20px"
        >
          404 PAGE NOT FOUND!
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate(appRoutes.catalog)}
        >
          Catalog
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;
