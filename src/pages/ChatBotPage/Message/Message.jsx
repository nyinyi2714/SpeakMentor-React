import { useGoogleTTS, useSpeechSuper } from "../../../hooks";
import { useRef } from 'react';
import TipIcon from '../../../assets/info.svg';
import "./Message.css";

export default function Message({ message, setPopupWord }) {
  const { speak, isSpeaking } = useGoogleTTS(1);
  const { chooseColorsForScores } = useSpeechSuper();
  const popoverRef = useRef();

  const handleTextToSpeech = (e) => {
    const text = e.target.dataset.value;
    if(text?.length > 0) speak(text);
  };

  const openTip = () => {
    popoverRef.current.classList.add('open');
  }

  const closeTip = () => {
    popoverRef.current.classList.remove('open');
  }

  const generateResultForSentences = (resultData) => {
    if (!resultData) return;
    let words = [];

    const stripNonLetters = (word) => {
      // function defined to strip non-letter characters
      return word.replace(/[^a-zA-Z]+/g, '');
    };

    const convertSentenceIntoWords = (sentence, wordsArray) => {
      sentence.forEach((wordData, index) => {
        const overallScore = wordData?.PronunciationAssessment.AccuracyScore ?? 0;
        wordsArray.push(
          <span
            style={{ color: chooseColorsForScores(overallScore) }}
            key={index}
            onClick={() => setPopupWord(stripNonLetters(wordData.Word))}
          >
            {wordData.Word + " "}
          </span>
        );
      });
    };

    // Assuming the best result is the first in the NBest array
    const bestResult = resultData.NBest[0];
    console.log("bestResult: ", bestResult);
    if (bestResult && bestResult.Words) {
      convertSentenceIntoWords(bestResult.Words, words);
    }

    return words;
  };

  return (
    <div className="message-container">
      {
        message.sender === "chatbot" &&
        <span className="chatbot-profile">&#x1F916;</span>
      }
      <div
        className={
          `message ${message.sender === "chatbot" ? 'bot-message' : 'user-message'}`
        }
      >
        {/* TODO: get "analysis from backend" */}
        {/* {generateResultForSentences(message.analysis)} */}
        {message.text}
        {
          message.sender === "user" &&
          <button
            className="text-to-speech"
            onClick={handleTextToSpeech}
            data-value={message.text}
          >
            <box-icon
              name="volume-full"
              size="16px"
              color="#4285f4"
              data-value={message.text}
            />
          </button>
        }

        {
          message.feedback && 
          <span 
            id="fluency-tip"
            className="fluency-tip" 
            onClick={openTip} 
            onMouseEnter={openTip} 
            onMouseLeave={closeTip}
            data-tip="close"
          >
            <img src={TipIcon} /> Fluency Tip
          </span>
        }

        {
          message.feedback && 
          <div className="popover" ref={popoverRef}>
            <span>{message.feedback}</span>
          </div>
        }
      </div>
    </div>
  );
}