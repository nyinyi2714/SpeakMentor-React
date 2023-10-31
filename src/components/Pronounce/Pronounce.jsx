import { useState, useEffect, useRef } from "react";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import useAudio from "../../hooks/useAudio";
import soundEffect from "../../assets/rec.m4a";
import { backendUrl } from "../../config";
import Boxicons from "boxicons";
import "./Pronounce.css";

function Pronounce(props) {
  const [laymanPhonetic, setLaymanPhonetic] = useState("");
  const [message, setMessage] = useState("Practice");
  const [isAmerican, setIsAmerican] = useState(true);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const { word, setIsPopupOpen, setMicPermission } = props;

  const pronounceResult = useRef();
  const chooseAscentBox = useRef();
  const resultContainer = useRef();
  const resultDisplay = useRef();
  const analyzingMessage = useRef();

  const {
    audioURL,
    isRecording,
    audioElement,
    soundEffectElement,
    isSlow,
    isPronouncing,
    isReplaying,
    isAnalyzing,
    textToSpeech,
    record,
    result,
    playAudio,
    setIsSlow,
  } = useAudio({ word, setIsPopupOpen, setMicPermission });

  // TODO: Use result which contains feedback from backend
  const generateResult = () => {
    const letters = [];
    for (let i = 0; i < word.length; i++) {
      letters.push(
        <span
          key={i}
          style={{ color: word.charAt(i) == "r" ? "red" : "green" }}
        >
          {word.charAt(i)}
        </span>
      );
    }
    return letters;
  };

  const openDropDown = () => {
    setIsDropDownOpen(true);
  };

  const changePronunciation = () => {
    setIsAmerican(state => !state);
    setIsDropDownOpen(false);
  };

  const handleSlow = () => {
    setIsSlow(state => !state);
  };

  const displayPractice = () => {
    setMessage(isRecording ? "Speak Now" : "Practice");
  };

  useEffect(() => {
    if (isRecording) setTimeout(displayPractice, 200);
    else displayPractice();
  }, [isRecording]);

  useEffect(() => {
    function handleClickOutside(event) {
      // Close choose ascent box with outside click
      if (chooseAscentBox.current && !chooseAscentBox.current.contains(event.target)) {
        setIsDropDownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if(audioURL && !isRecording) resultContainer.current.classList.add("open");
    else resultContainer.current.classList.remove("open");
  }, [audioURL]);

  useEffect(() => {
    if(isAnalyzing) analyzingMessage.current.classList.add("show");
    else setTimeout(() => analyzingMessage.current.classList.remove("show"), 400);
    
    if(isAnalyzing || result === null) {
      resultDisplay.current.classList.remove("show");
    } else {
      resultContainer.current.classList.remove("open");
      setTimeout(() => resultDisplay.current.classList.add("show"), 400);
      setTimeout(() => resultContainer.current.classList.add("open"), 400);
    }
  }, [isAnalyzing]);

  const getLaymanPhonetic = async () => {
    try {
      let response = await fetch(backendUrl, {
        method: "POST",
        body: { word },
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
        <div className="pronounce__word-grid">
          <h2 className="pronounce__word">{word}</h2>
          <div className="pronounce__dropdown-wrapper">
            <button
              type="button"
              onClick={openDropDown}
              className="pronounce__dropdown-btn"
            >
              {isAmerican ? "American" : "British"} Pronunciation
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.178 19.569a.998.998 0 0 0 1.644 0l9-13A.999.999 0 0 0 21 5H3a1.002 1.002 0 0 0-.822 1.569l9 13z"></path></svg>
            </button>
            <div className={`pronounce__dropdown-content ${isDropDownOpen && "active"}`} ref={chooseAscentBox}>
              <button type="buttton" className={isAmerican ? "active" : undefined} onClick={changePronunciation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                American Pronunciation
              </button>
              <button type="buttton" className={!isAmerican ? "active" : undefined} onClick={changePronunciation}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path></svg>
                British Pronunciation
              </button>
            </div>
          </div>
        </div>

        <div>Sounds like</div>
        <div className="pronounce__layman-pronunciation">
          kaar <span className="pronounce__dot">.</span> puht
          <button
            className="pronounce__icon"
            onClick={() => textToSpeech(word, isAmerican)}
            disabled={isPronouncing}
          >
            <box-icon name="volume-full" size="16px" color="#4285f4" />
          </button>

        </div>

        <div className="pronounce__toggle-btn">
          <ToggleSwitch isSlow={isSlow} handleSlow={handleSlow} />
          <span>Slow</span>
        </div>

      </div>

      <div className="pronounce__practice">
        <div className="expandable-wrapper" ref={resultContainer}>
          <div className="expandable-content">
            <div className="pronounce__result-container" ref={resultDisplay}>
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
              <div className="pronounce__result" ref={pronounceResult}>
                {generateResult()}
              </div>
            </div>
            <div className="pronounce__analyzing" ref={analyzingMessage}>
              Analyzing
              <span className="pronounce__loader" />
            </div>
          </div>
          
        </div>

        <button
          className={`pronounce__icon practice ${isRecording && "is-recording"}`}
          onClick={record}
          disabled={isRecording || isAnalyzing} // when recording and analyzing
        >
          <box-icon type="solid" name="microphone" size="16px" color="#4285f4" />
          <span>{message}</span>
        </button>

      </div>

      <audio src={audioURL} ref={audioElement} className="hidden" />
      <audio src={soundEffect} ref={soundEffectElement} className="hidden" />

    </div>
  );
}

export default Pronounce;