import { useEffect, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { login } from "./hooks/useAutheticate";
import { useStateContext } from "./StateContext";
import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Assessment from "./pages/Assessment/Assessment";
import './App.css';

function App() {
  const { user, setUser } = useStateContext;

  useEffect(() => {
    if(!user) {
      // TODO: get user from localStorage
    }
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </div>
  );
}

export default App;

{/* <ProtectedRoute
  path="/protected"
  component={ProtectedComponent}
  isAuthenticated={ Check user authentication status }
/> */}

