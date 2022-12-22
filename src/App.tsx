import { Routes, Route } from "react-router-dom";

import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Catalog from "./pages/Catalog/Catalog";
import NotFound from "./pages/NotFound/NotFound";

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
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
