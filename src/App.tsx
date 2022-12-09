import { Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";

function App() {
  return (
    <Routes>
      <Route path='/' element={<SignIn />}/>
      <Route path='/sign-up' element={<SignUp />}/>
    </Routes>
  );
}

export default App;
