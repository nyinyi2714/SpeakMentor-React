import "./ToggleSwitch.css";

function ToggleSwitch(props) {
  const { isMuted, setIsMuted } = props;

  return(
    <div className={`toggle-switch ${isMuted && "on"}`} onClick={() => setIsMuted(prev => !prev)} >
      <div className={`toggle-switch__btn ${isMuted && "on"}`}/>
    </div>
  );
}

export default ToggleSwitch;