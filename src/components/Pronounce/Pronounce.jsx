import { useState, useEffect, useRef } from "react";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import useSpeechSuper from "../../hooks/useSpeechSuper";
import useAudio from "../../hooks/useAudio";
import soundEffect from "../../assets/rec.m4a";
import config  from "../../config";
import "boxicons";
import "./Pronounce.css";

function Pronounce(props) {
  const [laymanPhonetic, setLaymanPhonetic] = useState("");
  const [message, setMessage] = useState("Practice");
  const { word } = props;

  const pronounceResult = useRef();
  const resultContainer = useRef();
  const resultDisplay = useRef();
  const analyzingMessage = useRef();

  const {
    audioURL,
    isRecording,
    audioElement,
    soundEffectElement,
    isSlow,
    isSpeaking,
    isReplaying,
    isAnalyzing,
    result,
    textToSpeech,
    record,
    playAudio,
    setIsSlow,
    reset
  } = useAudio({ word });

  const { generateResult, checkIsPerfectScore } = useSpeechSuper();

  let speechSuperResult = result;

  // TODO handle Slow
  const handleSlow = () => {
    setIsSlow(state => !state);
  };

  const displayPractice = () => {
    setMessage(isRecording ? "Speak Now" : "Practice");
  };

  useEffect(() => {
    if(props.speechSuperResult) {
      speechSuperResult = props.speechSuperResult;
    }
  }, []);

  useEffect(() => {
    resultContainer.current.classList.remove("open");
    reset();
  }, [word]);

  useEffect(() => {
    if (isRecording) setTimeout(displayPractice, 200);
    else displayPractice();
  }, [isRecording]);

  useEffect(() => {
    if(audioURL && !isRecording) resultContainer.current.classList.add("open");
    else resultContainer.current.classList.remove("open");
  }, [audioURL]);

  useEffect(() => {
    if(isAnalyzing) analyzingMessage.current.classList.add("show");
    else setTimeout(() => analyzingMessage.current.classList.remove("show"), 400);
    
    if(isAnalyzing || speechSuperResult === null) {
      resultDisplay.current.classList.remove("show");
    } else {
      resultContainer.current.classList.remove("open");
      setTimeout(() => resultDisplay.current.classList.add("show"), 400);
      setTimeout(() => resultContainer.current.classList.add("open"), 400);
    }
  }, [isAnalyzing]);

  const getLaymanPhonetic = async () => {
    try {
      let response = await fetch(`${config.backendUrl}/search`, {
        method: "POST",
        body: { 
          search: word 
        },
      });

      response = await response.json();
      if (response.ok) {
        // TODO: check the backend json key (laymanPhonetic)
        setLaymanPhonetic(response.laymans);
        console.log(response);
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

        <div>Sounds like</div>
        <div className="pronounce__layman-pronunciation">
          kaar <span className="pronounce__dot">.</span> puht
          <button
            className="pronounce__icon"
            onClick={() => textToSpeech(word)}
            disabled={isSpeaking}
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
                <span>Your Pronunciation</span>
                {checkIsPerfectScore(speechSuperResult) && <span className="flex-right">Good Job!</span>}
              </div>
              
              <div className="pronounce__result" ref={pronounceResult}>
                {generateResult(speechSuperResult)}
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