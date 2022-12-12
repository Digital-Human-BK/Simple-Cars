import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Catalog from "./pages/Catalog/Catalog";

function App() {
  return (
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
  );
}

export default App;
