import { useState, useEffect, useRef } from "react";
import ToggleSwitch from "./ToggleSwitch/ToggleSwitch";
import { useSpeechSuper, useAudio } from "../../hooks";
import soundEffect from "../../assets/rec.m4a";
import "boxicons";
import "./Pronounce.css";

function Pronounce(props) {
  const [laymanPhonetic, setLaymanPhonetic] = useState();
  const [message, setMessage] = useState("");
  const [displayCompliment, setDisplayCompliment] = useState(false);
  const [tempResult, setTempResult] = useState(null);
  const { word } = props;

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

  let speechSuperResult = result;

  const { generateResult, generateFeedback, checkIsPerfectScore, getPhonetics, phoneticsObjToHtml } = useSpeechSuper();

  // TODO handle Slow
  const handleSlow = () => {
    setIsSlow(state => !state);
  };

  const displayPractice = () => {
    setMessage(isRecording ? "Speak Now" : "Practice");
  };

  // Get phonetic from backend when word is changed
  useEffect(() => {
    setLaymanPhonetic(null);
    getPhonetics(word)
     .then(data => {
      setLaymanPhonetic(data);
     })
  }, [word]);

  useEffect(() => {
    if (props.speechSuperResult) {
      speechSuperResult = props.speechSuperResult;
    }
  }, []);

  useEffect(() => {
    if (!resultContainer.current) return;
    resultContainer.current.classList.remove("open");
    reset();
  }, [word]);

  useEffect(() => {
    if (isRecording) setTimeout(displayPractice, 200);
    else displayPractice();
  }, [isRecording]);

  useEffect(() => {
    if (!resultContainer.current) return;
    if (audioURL && !isRecording) resultContainer.current.classList.add("open");
    else resultContainer.current.classList.remove("open");
  }, [audioURL]);

  useEffect(() => {
    if (!analyzingMessage.current || !resultDisplay.current || !resultContainer.current) return;
    if (isAnalyzing && audioURL && analyzingMessage.current) analyzingMessage.current.classList.add("show");
    else setTimeout(() => analyzingMessage.current.classList.remove("show"), 400);

    if (isAnalyzing || speechSuperResult === null) {
      resultDisplay.current.classList.remove("show");
    } else {
      resultContainer.current.classList.remove("open");
      setTimeout(() => {
        resultDisplay.current.classList.add("show");
        resultContainer.current.classList.add("open");
      }, 400);
    }
  }, [isAnalyzing]);

  useEffect(() => {
    setTimeout(() => {
      if (checkIsPerfectScore(speechSuperResult)) setDisplayCompliment(true);
      else setDisplayCompliment(false);
    }, 400)

    if(speechSuperResult) {
      setTempResult(speechSuperResult)
    }
  }, [speechSuperResult])

  return (
    <div className="pronounce">
      <div className="pronounce__text-to-speech">
        <h2 className="pronounce__word">{word}</h2>

        <div>Sounds like</div>
        {/* Display laymanPhonetic if it is not null */}
        {laymanPhonetic &&
          <div className="pronounce__layman-pronunciation">
            {phoneticsObjToHtml(laymanPhonetic)}
            <button
              className="pronounce__icon"
              onClick={() => textToSpeech(word)}
              disabled={isSpeaking}
            >
              <box-icon name="volume-full" size="16px" color="#4285f4" />
            </button>
          </div>
        }

        {/* If laymanPhonetic is null, it's still loading. Display skeleton loading */}
        {laymanPhonetic === null &&
          <div className="pronounce__layman-pronunciation--skeleton">
            <div className="layman-phonetic" />
            <div className="pronounce-word" />
          </div>
        }


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
                {displayCompliment && <span className="flex-right">Good Job!</span>}
              </div>

              <div className="pronounce__result">
                {generateResult(tempResult, laymanPhonetic)}

                {
                  !checkIsPerfectScore(tempResult) &&
                  <>
                    <p>You may have mispronounced: </p>
                    <div className="pronounce__feedback--wrapper">
                      {generateFeedback(tempResult)}
                    </div>
                  </>
                }
                
              </div>

            </div>
            <div className="pronounce__analyzing" ref={analyzingMessage}>
              <div className="pronounce__spinner-container">
                Analyzing <div className="pronounce__spinner" />
              </div>
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