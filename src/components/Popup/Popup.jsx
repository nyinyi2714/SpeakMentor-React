import { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Popup.css";  

function Popup({ micPermission, closePopup, wordNotFound }) {

  const closeBtn = () => {
    return(
      <button className="btn" type="button" onClick={closePopup}>
        Close
      </button>
    );
  };

  const prompted = () => {
    return(
      <div className="homepage-popup__content">
        <h2>Mic Permission</h2>

        This website needs microphone permission to function properly.
        Please click "Allow" when prompted. 

        {closeBtn()}
      </div>
    );
  };

  const denied = () => {
    return(
      <div className="homepage-popup__content">
        <div>
          Please allow the microphone permission first.
          <Link className="link" to="/instructions">See Instructions.</Link>
        </div>
        {closeBtn()}
      </div>
    );
  };

  const wordNotFoundMessage = () => {
    return(
      <div className="homepage-popup__content">
        <h2>Word Not Found</h2>
        Sorry. "{wordNotFound}" is not found in the database.
        {closeBtn()}
      </div>
    );
  };

  // Close popup box with outside click 
  useEffect(() => {
    function handleClickOutside(e) {   
      if (e.target.id === "popup-wrapper") {
        closePopup();
      } 
    }
  
    document.addEventListener('mousedown', handleClickOutside);
  
    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  let popupContent;
  if(wordNotFound) popupContent = wordNotFoundMessage();
  else if(micPermission) popupContent = prompted();
  else popupContent = denied();

  return(
    <div className="homepage-popup" id="popup-wrapper">
      {popupContent}
    </div>
  );
}

export default Popup;