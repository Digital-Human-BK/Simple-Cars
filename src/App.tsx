import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Catalog from "./pages/Catalog/Catalog";

import { theme } from "./utils/muiTheme";
import { ThemeProvider } from "@mui/material/styles";
import { appRoutes } from "./constants/appRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route
          path={appRoutes.index}
          element={<SignIn />}
        />
        <Route
          path={appRoutes.signUp}
          element={<SignUp />}
        />
        <Route
          path={appRoutes.catalog}
          element={<Catalog />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
