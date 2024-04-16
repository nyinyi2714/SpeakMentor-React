import { useEffect } from "react";
import "./PopUp.css";

function PopUp({content, closePopUp, width}) {
  useEffect(() => {
    const closeWithEsc = (e) => {
      if(e.key === "Escape") {
        closePopUp();
      }
    };

    document.addEventListener("keydown", closeWithEsc);
    return () => {
      document.removeEventListener("keydown", closeWithEsc);
    }
  }, []);

  return(
    <div className="analyze-sentences--popup" id="popup-wrapper">
      <div className="popup" style={{ width: width ?? "100%" }}>
        {content}
      </div>
    </div>
  );
}

export default PopUp;