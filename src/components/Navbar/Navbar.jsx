import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const NavButtons = ({ isMobileNav }) => {
    if (isMobileNav) {
      return (
        <ul>
          <li>
            <Link to="/words" onClick={() => setIsMenuOpen(false)}>Single Word</Link>
          </li>
          <li>
            <Link to="/analyze-sentences" onClick={() => setIsMenuOpen(false)}>Sentences</Link>
          </li>
          <li>
            <Link to="/chatbot" onClick={() => setIsMenuOpen(false)}>Practice with AI</Link>
          </li>
          <li>
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Assessment</Link>
          </li>
          <li>
          <Link to="/subscriptions" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
          </li>
          <li>
            <Link to="#" onClick={() => setIsMenuOpen(false)}>Log In</Link>
          </li>
        </ul>
      );
    }

    return (
      <ul>
        <li>
          <Link to="/words">Single Word</Link>
        </li>
        <li>
          <Link to="/analyze-sentences">Sentences</Link>
        </li>
        <li>
          <Link to="/chatbot">Practice with AI</Link>
        </li>
        <li>
          <Link to="#">Assessment</Link>
        </li>
        <li>
          <Link to="/subscriptions">Pricing</Link>
        </li>
        <li>
          <Link to="#">Log In</Link>
        </li>
      </ul>
    );
  };


  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="container">
        <div className="logo">
          <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
        </div>

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
