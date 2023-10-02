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
      <div className="popup__content">
        <h2>Reminder</h2>

        This website needs microphone permission to function properly.
        Please click "allow" when prompted. 

        {closeBtn()}
      </div>
    );
  };

  const denied = () => {
    return(
      <div className="popup__content">
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
      <div className="popup__content">
        <h2>Word Not Found</h2>
        Sorry. "{wordNotFound}" is not found in the database.
        {closeBtn()}
      </div>
    );
  };

  let popupContent;
  if(wordNotFound) popupContent = wordNotFoundMessage();
  else if(micPermission) popupContent = prompted();
  else popupContent = denied();

  return(
    <div className="popup">
      {popupContent}
    </div>
  );
}

export default Popup;