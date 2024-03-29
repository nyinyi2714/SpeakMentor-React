import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from '../../assets/SpeakMentor.svg';
import './Navbar.css';

const Navbar = () => {

  const location = useLocation(); 
  const isHome = location.pathname === '/';
  const navigate = useNavigate();
  const goToInternalLink = (path) => {
    navigate(path);
  };

  // if isHome is true, show the buttons and change the background color to var(--s-e-v-e-n-t-h)


  return (
    <div className={`navbar ${!isHome ? 'not-home' : ''}`}>
      <div className='navbar-inner'>
        <div className='logo-div'>
          <button className='logo-button' onClick={() => goToInternalLink('/')}>
            <Logo className='logo'></Logo>
          </button>
        </div>

        {/* Conditional rendering based on isHome */}
        {!isHome && ( // If not home, show these buttons and change the background color to var(--s-e-v-e-n-t-h)
          <div className='user-buttons'>
            <button id='words-button' onClick={() => goToInternalLink('/words')}>Words</button>
            <button id='sentence-button' onClick={() => goToInternalLink('/analyze-sentences')}>Sentence</button>
            <button id='chatbot-button' onClick={() => goToInternalLink('/chatbot')}>Chatbot</button>
            <button id='pricing-button' onClick={() => goToInternalLink('/subscriptions')}>Pricing</button>
          </div>
        )}

        <div className='user-buttons'>
          <button id='login-button' onClick={() => goToInternalLink('/login')}>Log In</button>
          <button id='signup-button' onClick={() => goToInternalLink('/register')}>Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
