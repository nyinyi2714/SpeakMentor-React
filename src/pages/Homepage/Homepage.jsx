import { useEffect, useState} from "react";
import useAudio from "../../hooks/useAudio";
import ToggleSwitch from "../../components/ToggleSwitch/ToggleSwitch";
import { backendUrl } from "../../config";
import Boxicons from "boxicons";
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [laymanPhonetic, setLaymanPhonetic] = useState("");
  const [message, setMessage] = useState("Practice");
  const [isAmerican, setIsAmerican] = useState(true);

  const {
    audioURL,
    isRecording,
    audioElement,
    isSlow,
    isPronouncing,
    isReplaying,
    textToSpeech,
    record,
    sendAudioToServer,
    playAudio,
    setIsSlow,
  } = useAudio();

  const handleWordInput = (e) => {
    setWord(e.target.value);
  };

  const changePronunciation = () => {
    setIsAmerican(state => !state);
  };

  const handleSlow = () => {
    setIsSlow(state => !state);
  };

  const displayPractice = () => {
    setMessage(isRecording ? "Speak Now" : "Practice");
  };

  useEffect(() => {
    if(isRecording) setTimeout(displayPractice, 200);
    else displayPractice();
  }, [isRecording]);

  const getLaymanPhonetic = async () => {
    try {
      let response = await fetch(backendUrl, {
        method: "POST",
        body: {word},
      });

      response = await response.json();
      if (response.ok) {
        // TODO: check the backend json key (laymanPhonetic)
        setLaymanPhonetic(response.laymanPhonetic);
        console.log("fetched layman's phonetic successfully.");
      } else {
        console.error("Error fetching layman's phonetic.");
      }
    } catch (error) {
      console.error("Error fetching layman's phonetic:", error);
    }
  };
  
  return (
    <div className="homepage">
      <input 
        type="text" 
        className="homepage__input" 
        value={word} 
        onChange={handleWordInput} 
      />
      <div className="homepage__layout">
        <div className="homepage__pronounce">

          <h2 className="homepage__word">{word}</h2>
          <button type="button" onClick={changePronunciation} className="homepage__ascent">
            {isAmerican ? "American" : "British"} Pronunciation
          </button>

          <div>Sounds like</div>
          <div className="homepage__flex">
            kaar <span className="homepage__dot">.</span> puht
            <button 
              className="homepage__icon" 
              onClick={() => textToSpeech(word, isAmerican)}
              disabled={isPronouncing}
            >
            <box-icon name ="volume-full" size="16px" />
            </button>

          </div>

          <div className="homepage__toggle-btn">
            <ToggleSwitch isSlow={isSlow} handleSlow={handleSlow} />
            <span>Slow</span>
          </div>       

          <svg className="homepage__hidden" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"></path>
          </svg>

        </div>

        <div className="homepage__practice">
          <div className={`expandable-wrapper ${audioURL !== null && "open"}`}>
            <div className="flex">
              <button 
                className="homepage__icon" 
                onClick={playAudio}
                disabled={isReplaying}
              >
                <box-icon name="volume-full" size="16px" color="#4285f4" />
              </button>
              Sounds like you said
            </div>
          </div>
            
          <button 
            className="homepage__icon practice" 
            onClick={record}
            disabled={isRecording}
          >
            <box-icon type="solid" name="microphone" size="16px" color="#4285f4" />
            <span>{message}</span>
          </button>
          
        </div>
      </div>
      
      <audio src={audioURL} ref={audioElement} className="homepage__hidden" />
    </div> 
  );
}

export default Homepage;