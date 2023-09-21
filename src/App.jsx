import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { login } from "./hooks/useAutheticate";
import { useStateContext } from "./StateContext";
import useRoute from "./hooks/useRoute";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Assessment from "./pages/Assessment/Assessment";
import Tutorial from "./pages/Tutorial/Tutorial";

import './App.css';

function App() {
  const { user, setUser } = useStateContext();
  const { authenticationRoute, homepageRoute } = useRoute();

  useEffect(() => {
    if(!user) {
      // TODO: get user from localStorage
    }
  }, []);

  

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={homepageRoute(true, Homepage)} />
        <Route path="/login" element={authenticationRoute(false, Login)} />
        <Route path="/register" element={authenticationRoute(false, Register)} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/tutorial" element={<Tutorial />} />
      </Routes>
    </div>
  );
}

export default App;

