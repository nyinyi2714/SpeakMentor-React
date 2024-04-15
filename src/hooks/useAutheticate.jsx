import { useStateContext } from "../StateContext";
import { useNavigate } from "react-router-dom";
import config from "../config";

function useAuthenticate() {
  const navigate = useNavigate();
  const { setUser } = useStateContext();

  const saveUser = (user) => {
    setUser(user);
  };

  const login = async (email, password) => {
    try {

      let response = await fetch(`${config.backendUrl}/api/login`, {
        method: "POST", // Method is part of the options object
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), // Ensure the body is a string
      });

      if (response.status === 200) {
        const responseData = await response.json(); // Convert to JSON here
        localStorage.setItem("token", responseData.token);
        localStorage.setItem("user", JSON.stringify(responseData.user));
        localStorage.setItem("user_data", JSON.stringify(responseData.user_data));
        saveUser(responseData.user);
        console.log("login successfully.");
        navigate("/words");
      } else {
        console.error("Error logging in. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const register = async (username, email, password) => {
    try {
      let response = await fetch(`${config.backendUrl}/signup`, {
        method: "POST", // Method is part of the options object
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // Ensure the body is a string
      });
  
      if (response.status === 201) {
        const responseData = await response.json(); // Convert to JSON here
        console.log(responseData);
        saveUser(responseData.user);
        console.log("register successfully.");
        navigate("/questions");
      } else {
        console.error("Error registering. Status code:", response.status);
      }
    } catch (error) {
      console.error("Error registering:", error);
    }
  };
  
  return({login,register});
}

export default useAuthenticate;