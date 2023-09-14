import { useState } from "react";
import useAudio from "../../hooks/useAudio";
import Boxicons from "boxicons";
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [isAmerican, setIsAmerican] = useState(true);

  const {
    audioURL,
    isRecording,
    audioElement,
    textToSpeech,
    record,
    sendAudioToServer,
    playAudio,
  } = useAudio();

  const handleWordInput = (e) => {
    setWord(e.target.value);
  };

  const changePronunciation = () => {
    setIsAmerican(state => !state);
  };
  
  return (
    <div className="homepage">
      <input 
        type="text" 
        className="homepage__input" 
        value={word} 
        onChange={handleWordInput} 
      />

      <h2 className="homepage__word">{word}</h2>
      <button type="button" onClick={changePronunciation}>
        {isAmerican ? "American" : "British"} Pronunciation
      </button>
      <div className="homepage__record">
        <div>Sounds like</div>
        <div className="homepage__flex">
          kaar puht
          <button className="homepage__icon" onClick={textToSpeech}>
          <box-icon name ="volume-full" size="sm" />
          </button>
        </div>
        <button 
          className={`homepage__icon ${isRecording && "blinking"}`} 
          onClick={record}
        >
          <box-icon type="solid" name="microphone" size="sm" />
        </button>
        <button className="homepage__icon" onClick={playAudio}>
          <box-icon name="volume-full" size="sm" />
        </button>
      </div>
      <audio src={audioURL} ref={audioElement} className="homepage__hidden" />
    </div> 
  );
}

export default Homepage;