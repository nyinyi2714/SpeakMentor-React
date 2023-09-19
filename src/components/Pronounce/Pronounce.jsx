import { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import useAudio from "../../hooks/useAudio";
import { backendUrl } from "../../config";
import Boxicons from "boxicons";
import "./Pronounce.css";

function Pronounce(props) {
  const [laymanPhonetic, setLaymanPhonetic] = useState("");
  const [message, setMessage] = useState("Practice");
  const [isAmerican, setIsAmerican] = useState(true);

  const { word } = props;

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
    <div className="pronounce">
      <div className="pronounce__text-to-speech">

        <h2 className="pronounce__word">{word}</h2>
        <button type="button" onClick={changePronunciation} className="pronounce__ascent">
          {isAmerican ? "American" : "British"} Pronunciation
        </button>

        <div>Sounds like</div>
        <div className="pronounce__layman-pronunciation">
          kaar <span className="pronounce__dot">.</span> puht
          <button
            className="pronounce__icon"
            onClick={() => textToSpeech(word, isAmerican)}
            disabled={isPronouncing}
          >
            <box-icon name="volume-full" size="16px" />
          </button>

        </div>

        <div className="pronounce__toggle-btn">
          <ToggleSwitch isSlow={isSlow} handleSlow={handleSlow} />
          <span>Slow</span>
        </div>

      </div>

      <div className="pronounce__practice">
        <div className={`expandable-wrapper ${audioURL !== null && "open"}`}>
          <div className="flex">
            <button
              className="pronounce__icon"
              onClick={playAudio}
              disabled={isReplaying}
            >
              <box-icon name="volume-full" size="16px" color="#4285f4" />
            </button>
            Sounds like you said
          </div>
        </div>

        <button
          className="pronounce__icon practice"
          onClick={record}
          disabled={isRecording}
        >
          <box-icon type="solid" name="microphone" size="16px" color="#4285f4" />
          <span>{message}</span>
        </button>

      </div>

      <audio src={audioURL} ref={audioElement} className="hidden" />

    </div>
  );
}

export default Pronounce;