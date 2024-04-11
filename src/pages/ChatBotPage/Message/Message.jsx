import { useEffect } from "react";
import { useGoogleTTS } from "../../../hooks";

import "./Message.css";

export default function Message({ message, setPopupWord }) {
  const { speak, isSpeaking } = useGoogleTTS();

  const handleTextToSpeech = (e) => {
    const text = e.target.dataset.value;
    if(text?.length > 0) speak(text);
  };

  // TODO display each word individually and add setPopupWord handler to each of them

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
      </div>
    </div>
  );
}