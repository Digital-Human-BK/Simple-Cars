import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Catalog from "./pages/Catalog/Catalog";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./helpers/muiTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
    <Routes>
      <Route
        path="/"
        element={<SignIn />}
      />
      <Route
        path="/sign-up"
        element={<SignUp />}
      />
      <Route
        path="/catalog"
        element={<Catalog />}
      />
    </Routes>
    </ThemeProvider>
  );
}

export default App;
