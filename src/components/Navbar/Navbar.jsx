import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  return (
    <div className={`navbar ${isMenuOpen ? "open" : ""}`}>
      <div className="container">
        <div className="logo">
        <Link to="/"><img src="/images/main-logo-alt.png" alt="logo" /></Link>
        </div>

        <div className={`main_list desktop ${isMenuOpen ? "show" : ""}`} id="mainListDiv">
          <ul>
            <li>
              <Link to="/">Single Word</Link>
            </li>
            <li>
              <Link to="/analyze-sentences">Sentences</Link>
            </li>
            <li>
              <Link to="#">Assessment</Link>
            </li>
            <li>
              <Link to="#">Profile</Link>
            </li>
            <li>
              <Link to="#">Log In</Link>
            </li>
          </ul>
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
          <ul>
            <li>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Single Word</Link>
            </li>
            <li>
              <Link to="/analyze-sentences" onClick={() => setIsMenuOpen(false)}>Sentences</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsMenuOpen(false)}>Assessment</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsMenuOpen(false)}>Profile</Link>
            </li>
            <li>
              <Link to="#" onClick={() => setIsMenuOpen(false)}>Log In</Link>
            </li>
          </ul>
      </div>
    </div>
  );
}

export default Navbar;
