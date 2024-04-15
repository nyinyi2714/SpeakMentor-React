import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../StateContext";
import config from "../../config";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useStateContext();

  const [loginText, setLoginText] = useState("Log In");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
        const userObject = JSON.parse(userString);
        const username = userObject.username;
        setUsername(username);
        setLoginText("Log Out");
    } else {
        console.log("No user data found in localStorage.");
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = async () => {
    try {
        let response = await fetch(`${config.backendUrl}/api/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",  // Corrected content type
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
        });
        if (response.status === 200) {
            console.log("Logout successfully.");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUsername("");      // Reset username state
            setLoginText("Log In"); // Update login text
        } else {
            console.error("Error logging out. Status code:", response.status);
        }
    } catch (error) {
        console.error("Error logging out:", error);
    }
  }

  const NavButtons = ({ isMobileNav }) => {
    return (
      <ul>
        <li><Link to="/words" onClick={() => setIsMenuOpen(false)}>Single Word</Link></li>
        <li><Link to="/analyze-sentences" onClick={() => setIsMenuOpen(false)}>Sentences</Link></li>
        <li><Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>Practice with AI</Link></li>
        <li><Link to="/subscriptions" onClick={() => setIsMenuOpen(false)}>Pricing</Link></li>
        <li><Link to={username.length==0 ? "/" : "/words"} onClick={handleLogOut}>{loginText}</Link></li>
        <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
      </ul>
    );
  };

  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
        </div>
        {username && (
          <div className="user">
            <Link to="/words">{username}</Link>
          </div>
        )}
        <div className={`main_list desktop ${isMenuOpen ? "show" : ""}`} id="mainListDiv">
          <NavButtons isMobileNav={false} />
        </div>
        <div className="media_button">
          <button className="main_media_button" id="mediaButton" onClick={toggleMenu}>
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
      <div className={`main_list mobile ${isMenuOpen ? "show" : ""}`} id="mainListDiv">
        <NavButtons isMobileNav={true} />
      </div>
    </div>
  );
}

export default Navbar;
