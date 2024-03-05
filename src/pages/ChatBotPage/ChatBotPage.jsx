import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components";

import Message from "./Message/Message";
import ConversationsContainer from "./ConversationsContainer/ConversationsContainer";
import "./ChatBotPage.css";

function ChatBotPage() {
  const [messages, setMessages] = useState([
    { sender: "chatbot", text: "Hello! How can I help you?" },
    { sender: "user", text: "I want to practice interview conversations." },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  // TODO: send the recorded audio to backend
  const sendUserPrompt = () => {
    // add user prompts to the list of messages
    const userMessage = { sender: "user", text: "" };
    setMessages(prevList => [...prevList, userMessage]);

  };  

  // Function to scroll the messages container to the bottom
  const messagesContainer = useRef();
  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  // TODO: fetch saved conversations from backend
  useEffect(() => {

  }, []);


  // TODO: add active class to microphone when recording

  return (
    <React.Fragment>
      <Navbar />
      <div className="chatbot-page">

        <div className="chatbot">
          <div className="messages">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <Message setIsLoading={setIsLoading} message={message} key={index} />
              ))}
          </div>
          <div className="input-container">
            <button className="chatbot-button icon microphone" disabled={isLoading}>
              <box-icon type="solid" name="microphone" size="24px" color="#fff" />
            </button>    
            <button className="chatbot-button float-right">
              Save Conversation
            </button>
          </div>
        </div>
        {/* <ConversationsContainer conversations={[]} /> */}
      </div>
    </React.Fragment>
  );
}

export default ChatBotPage;