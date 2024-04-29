import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "../../components";
import { useGoogleTTS ,useAudio, useBackend, useRedirect } from "../../hooks";
import soundEffect from "../../assets/rec.m4a";
import { ThreeDots } from 'react-loader-spinner';
import 'js-cookie';

import { ModalComponent } from "../../components";
import { PopUp } from "../AnalyzeSentences";
import { Pronounce } from '../../components';
import Message from "./Message/Message";
import ConversationsContainer from "./ConversationsContainer/ConversationsContainer";
import "./ChatBotPage.css";

export default function ChatBotPage() {
  const { speak, isSpeaking } = useGoogleTTS(1);
  const { isRecording, recordForChatBot, endChatbotRecording, soundEffectElement } = useAudio({ word: null });
  const { getSavedConversations, saveConversation } = useBackend();
  const { loginRedirect } = useRedirect();

  const [currConversationTitle, setCurrConversationTitle] = useState('');
  const [messages, setMessages] = useState([
    { sender: "chatbot", text: "Hello! What do you want to talk about today?" },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [savedConversations, setSavedConversations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [popupWord, setPopupWord] = useState(null);
  const [isMessagesOverridden, setIsMessagesOverridden] = useState(false);

  const handleCurrConversationTitle = (e) => {
    const value = e.target.value;
    // Truncate if length is more than 35 characters
    const truncatedValue = value.slice(0, 35);
    setCurrConversationTitle(truncatedValue);
  }

  const saveCurrConversation = async () => {
    const newConversation = {
      title: currConversationTitle,
      messages: messages,
    }

    // Update the saved Conversation list on server
    await saveConversation(newConversation);
    
    // refresh saved conversation list 
    await fetchSavedConversations();

    setIsModalOpen(false);
  }

  const fetchSavedConversations = async () => {
    const savedConversationsData = await getSavedConversations();
    setSavedConversations(savedConversationsData);
  }

  const restoreConversation = (e) => {
    const conversationId = e.target.id;

    // loop through savedConversations to find the one whose id matches conversationId
    for (const conversation of savedConversations) {
      if (conversation.id == conversationId) {
        setMessages(conversation.chat);
        setCurrConversationTitle(conversation.title);
        break;
      }
    }

    // save current conversation after retoring saved conversations
    if(!isMessagesOverridden) {
      const newConversation = {
        id:"curr",
        title: 'Current Conversation',
        chat: messages,
      }

      setSavedConversations(prevConversations => [newConversation, ...prevConversations]);
      setIsMessagesOverridden(true);
    }

    setIsDropDownOpen(false);
  }

  const handleSavingUserAudio = () => {
    recordForChatBot();
  };

  const handleEndingUserAudio = async () => {
    setIsLoading(true)
    const result = await endChatbotRecording();
  
    setMessages(prev => ([
      ...prev,
      {sender: 'user', text: result.user_message, resultData: result.result_json.NBest[0], feedback: result.feedback},
    ]))
    setIsLoading(false);

    setTimeout(() => {
      setMessages(prev => ([
        ...prev,
        {sender: 'chatbot', text: result.chatbot_response},
      ]))
      speak(result.chatbot_response);
    }, 1000)
  };

  // Function to scroll the messages container to the bottom
  const messagesContainer = useRef();
  const scrollToBottom = () => {
    if (messagesContainer.current) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight;
    }
  };

  useEffect(scrollToBottom, [messages]);

  // fetch saved conversations from backend
  useEffect(() => {
    fetchSavedConversations();
    loginRedirect();
  }, []);

  const closePopUp = () => {
    setPopupWord(null);
  }

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
            conversations={savedConversations}
            isOpen={isDropDownOpen}
            restoreConversation={restoreConversation}
          />

          {/* Chat Messages */}
          <div className="messages">
            {messages.length > 0 &&
              messages.map((message, index) => (
                <Message setPopupWord={setPopupWord} setIsLoading={setIsLoading} message={message} key={index} />
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
                <button className="chatbot-button icon microphone" onClick={handleSavingUserAudio} disabled={isLoading || isSpeaking}>
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
            <h3>Enter Conversation Title</h3>
            <input type="text" value={currConversationTitle} onChange={handleCurrConversationTitle} />
          </article>
        </ModalComponent>
      }

      {/* PopUp Pronounce Component */}
      {
        popupWord !== null &&
        <PopUp
          content={<Pronounce word={popupWord} />}
          closePopUp={closePopUp}
        />
      }

    </React.Fragment>
  );
}
