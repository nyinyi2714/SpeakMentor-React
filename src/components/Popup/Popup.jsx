import { Link } from "react-router-dom";
import "./Popup.css";  

function Popup({ micPermission, closePopup }) {

  const prompted = () => {
    return(
      <div className="popup__content">
        <h2>Reminder</h2>

        This website needs microphone permission to function properly.
        Please click "allow" when prompted. 

        <button className="btn" type="button" onClick={closePopup}>
          Close
        </button>
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
        <button className="btn" type="button" onClick={closePopup}>
          Close
        </button>
      </div>
    );
  };

  return(
    <div className="popup">
      {micPermission ? prompted() : denied()}
    </div>
  );
}

export default Popup;