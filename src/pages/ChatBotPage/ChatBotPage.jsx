import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components";
import { useAudio } from "../../hooks";
import soundEffect from "../../assets/rec.m4a";
import { ThreeDots } from 'react-loader-spinner';

import { ModalComponent } from "../../components";
import Message from "./Message/Message";
import ConversationsContainer from "./ConversationsContainer/ConversationsContainer";
import "./ChatBotPage.css";

function ChatBotPage() {

  const { isRecording, recordForChatBot, soundEffectElement } = useAudio({ word: null });
  const endRecordingRef = useRef();

  const [currConversationTitle, setCurrConversationTitle] = useState('');
  const [messages, setMessages] = useState([
    { sender: "chatbot", text: "Hello! How can I help you?" },
    { sender: "user", text: "I want to practice interview conversations." },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [savedConversations, setSavedConversations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // TODO: send the recorded audio to backend
  const updateMessages = (newMessage) => {
    setMessages(prevList => [...prevList, newMessage]);
  };

  const handleCurrConversationTitle = (e) => {
    const value = e.target.value;
    // Truncate if length is more than 35 characters
    const truncatedValue = value.slice(0, 35);
    setCurrConversationTitle(truncatedValue);
  }

  const saveCurrConversation = () => {
    const newConversation = {
      title: currConversationTitle,
      messages: messages,
    }

    // Update the saved Conversation list on client-side
    setSavedConversations(prevConversations => [newConversation, ...prevConversations]);

    // TODO: set the new conversation to backend

    setIsModalOpen(false);
  }

  const restoreConversation = (e) => {
    const conversationId = e.target.id;
    // TODO: swap messages with the savedConversation.messages
  }

  const handleSavingUserAudio = () => {
    setIsLoading(prev => !prev);

    return
    endRecordingRef.current = recordForChatBot();
  };

  const handleEndingUserAudio = async () => {
    const endRecording = endRecordingRef.current;
    const result = await endRecording();
    // TODO display the result
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

  return (
    <React.Fragment>
      <Navbar />
      <div className="chatbot-page">
        <div className="chatbot">

          {/* Open dropdown to display saved conversations */}
          <button
            onClick={() => setIsDropDownOpen(prev => !prev)}
            className={`open-saved-conversations ${isDropDownOpen && 'open'}`}
          >
            Saved Conversations
            <box-icon name='chevron-down'></box-icon>
          </button>

          {/* Display Saved Conversations */}
          <ConversationsContainer
            conversations={[{ title: "this is a test" }, { title: "this is a test" }, { title: "this is a test" }, { title: "this is a test" }]}
            isOpen={isDropDownOpen}
            restoreConversation={restoreConversation}
          />

          {/* Chat Messages */}
          <div className="messages">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <Message setIsLoading={setIsLoading} message={message} key={index} />
            ))}

            <div className={`chatbot-loading ${isLoading && 'show'}`}>
              <ThreeDots
                height="50"
                width="40"
                color="#4285f4"
                ariaLabel="loading"
              />
            </div>

          </div>

          {/* Chat Controls and Audio Input */}
          <div className="input-container">
            {
              isRecording ?
                <button className="chatbot-button icon stop" onClick={handleEndingUserAudio}>
                  <box-icon name='stop-circle' color='#ff3030' size="35px" />
                </button> :
                <button className="chatbot-button icon microphone" onClick={handleSavingUserAudio} disabled={isLoading}>
                  <box-icon type="solid" name="microphone" size="24px" color="#fff" />
                </button>
            }
            <button onClick={() => setIsModalOpen(true)} className="chatbot-button float-right">
              Save
            </button>
          </div>

        </div>
      </div>

      {/* Sound effect */}
      <audio src={soundEffect} ref={soundEffectElement} className="hidden" />

      {/* Modal Element */}
      {
        isModalOpen &&
        <ModalComponent saveCurrConversation={saveCurrConversation} isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
          <article className="modal-conversation-title">
            <h3>Enter Conversation Name</h3>
            <input type="text" value={currConversationTitle} onChange={handleCurrConversationTitle} />
          </article>
        </ModalComponent>
      }

    </React.Fragment>
  );
}

export default ChatBotPage;