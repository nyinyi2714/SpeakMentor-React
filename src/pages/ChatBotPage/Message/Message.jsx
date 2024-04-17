import { useGoogleTTS, useSpeechSuper } from "../../../hooks";
import { useState } from 'react';
import TipIcon from '../../../assets/info.svg';
import "./Message.css";

export default function Message({ message, setPopupWord }) {
  const { speak, isSpeaking } = useGoogleTTS(1);
  const { chooseColorsForScores } = useSpeechSuper();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleTextToSpeech = (e) => {
    const text = e.target.dataset.value;
    if(text?.length > 0) speak(text);
  };

  const openTip = () => {
    setIsPopoverOpen(true);
  }

  const closeTip = () => {
    setIsPopoverOpen(false);
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

    if (resultData && resultData.Words) {
      convertSentenceIntoWords(resultData.Words, words);
    }

    return words;
  };


  return (
    <div className="message-container" style={message.sender === 'user' && isPopoverOpen ? { zIndex: 2 }: {}}>
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
        {
          message.sender === "chatbot" ?
          message.text :
          <span>{generateResultForSentences(message.resultData)}</span>
        }

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
          message.resultData?.PronunciationAssessment.FluencyScore < 90 && 
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
          message.resultData?.PronunciationAssessment.FluencyScore < 90 && 
          <div className={`popover ${isPopoverOpen && 'open'}`}>
            <h4>Fluency Tip</h4>
            <span>{message.feedback}</span>
          </div>
        }
      </div>
    </div>
  );
}