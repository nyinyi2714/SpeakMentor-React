import { useState } from "react";
import "./ToggleSwitch.css";

function ToggleSwitch(props) {
  const { isSlow, handleSlow } = props;
  const [isSwitchOn, setIsSwitchOn] = useState(false);  

  const handleToggleSwitch = () => {
    setIsSwitchOn(state => !state);
  };

  return(
    <div className={`toggle-switch ${isSlow && "on"}`} onClick={handleSlow} >
      <div className={`toggle-switch__btn ${isSlow && "on"}`}/>
    </div>
  );
}

export default ToggleSwitch;