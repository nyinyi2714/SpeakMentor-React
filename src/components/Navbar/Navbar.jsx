import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../StateContext";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setUser } = useStateContext();

  const [loginText, setLoginText] = useState("Log In");
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      setLoginText("Log Out");
      setUsername(user.username);
    } else {
      setLoginText("Log In");
    }
  }, [user]); // Adding `user` as a dependency of this effect.

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogOut = () => {
    if (user) {
      setUser(null);
      setLoginText("Log In");
    }
  }

  const NavButtons = ({ isMobileNav }) => {
    return (
      <ul>
        <li><Link to="/words" onClick={() => setIsMenuOpen(false)}>Single Word</Link></li>
        <li><Link to="/analyze-sentences" onClick={() => setIsMenuOpen(false)}>Sentences</Link></li>
        <li><Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>Practice with AI</Link></li>
        <li><Link to="/subscriptions" onClick={() => setIsMenuOpen(false)}>Pricing</Link></li>
        <li><Link to={user ? "/" : "/login"} onClick={handleLogOut}>{loginText}</Link></li>
      </ul>
    );
  };

  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
        </div>
        {user && (
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
