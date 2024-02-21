import React, { useState, useEffect, useRef } from "react";
import { useGoogleTTS } from "../../hooks";
import { Navbar } from "../../components";

import "./ChatBotPage.css";

function ChatBotPage() {
  const { speak, isSpeaking } = useGoogleTTS();

  const [messages, setMessages] = useState([
    { sender: "chatbot", text: "Hello! How can I help you?" },
    { sender: "user", text: "I want to practice interview conversations." },
  ]);

  const [userPrompt, setUserPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleUserPrompt = (e) => {
    setUserPrompt(e.target.value);
  };

  const inputField = useRef();
  const sendUserPrompt = () => {
    // add user prompts to the list of messages
    const userMessage = { sender: "user", text: userPrompt };
    setMessages(prevList => [...prevList, userMessage]);
    setUserPrompt("");
    inputField.current.focus();

    // TODO: send the prompt to backend
  };  

  const handleTextToSpeech = (e) => {
    const text = e.target.dataset.value;
    if(text?.length > 0) speak(text);
  };

  // Send user's prompt with Enter key
  const handleSendWithEnter = (e) => {
    if(e.key === "Enter") sendUserPrompt();
  };

  const textInputContainer = useRef();
  const closeTextInput = () => {
    textInputContainer.current?.classList.remove("expanded");
  };

  const openTextInput = () => {
    textInputContainer.current?.classList.add("expanded");
    inputField.current.focus();
  };

  // Function to scroll the messages container to the bottom
  const messagesContainer = useRef();
  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages])

  useEffect(() => {
    setIsLoading(isSpeaking);
  }, [isSpeaking]);

  // TODO: add active class to microphone when recording

  return (
    <React.Fragment>
      <Navbar />
      <div className="chatbot-page">

        <div className="chatbot">
          <div className="messages" ref={messagesContainer}>
            {messages.length > 0 &&
              messages.map((message, index) => (
                <div
                className="message-container"
                  key={index}
                >
                  {
                    message.sender === "chatbot" &&
                    <span className="chatbot-profile">&#x1F916;</span>
                  }
                  <div
                    className={
                      message.sender === "chatbot"
                        ? "message bot-message"
                        : "message user-message"
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
              ))}
          </div>
          <div className="input-container" ref={textInputContainer}>
            <div className="text-input-container">
            <input
              type="text"
              className="input-field"
              value={userPrompt}
              onChange={handleUserPrompt}
              placeholder="Type your message..."
              onKeyUp={handleSendWithEnter}
              autoFocus
              ref={inputField}
            />
            <span className="btn-wrapper">
              <button onClick={sendUserPrompt} className="send-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" style={{fill: "#fff"}}>
                <path d="m21.426 11.095-17-8A1 1 0 0 0 3.03 4.242l1.212 4.849L12 12l-7.758 2.909-1.212 4.849a.998.998 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81z">
                </path>
              </svg>
              </button>
            </span>
            <span className="btn-wrapper">
              <button onClick={closeTextInput}>
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" style={{ fill: '#fff' }}>
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z">
                </path>
              </svg>
              </button>
            </span>
            
            </div>
            <button className="chatbot-button icon keyboard" onClick={openTextInput} disabled={isLoading}>
              <box-icon type='solid' name='keyboard' size="24px" color="#fff"></box-icon>
            </button>

            <button className="chatbot-button icon microphone" disabled={isLoading}>
              <box-icon type="solid" name="microphone" size="24px" color="#fff" />
            </button>

            
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ChatBotPage;