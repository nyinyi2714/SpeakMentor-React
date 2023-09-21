import { useStateContext } from "../StateContext";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../config";

function useAuthenticate() {
  const navigate = useNavigate();
  const { setUser } = useStateContext();

  const saveUser = (user) => {
    setUser(user);
    // TODO: save in localStorage
  };

  const login = async (email, password) => {
    try {
      let response = await fetch(backendUrl, {
        method: "POST",
        body: {email, password},
      });

      response = await response.json();
      if (response.ok) {
        saveUser(response.user);
        console.log("login successfully.");
        navigate("/");
      } else {
        console.error("Error logging in.");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (username, email, password) => {
    try {
      let response = await fetch(backendUrl, {
        method: "POST",
        body: {username, email, password},
      });

      response = await response.json();
      if (response.ok) {
        saveUser(response.user);
        console.log("registered successfully.");
        navigate("/");
      } else {
        console.error("Error registering.");
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return({
    login,
    register,
  });
}

export default useAuthenticate;