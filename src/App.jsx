import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import { 
  Homepage, 
  Login, 
  Register, 
  AnalyzeSentences, 
  ChatBotPage, 
  SubscriptionPage,
  PaymentPage,
  PaymentComplete,
  LandingPage,
  Profile,
  Questions,
} from './pages';

import { LoadingAnimation, Popup } from "./components";

import "boxicons";
import 'react-circular-progressbar/dist/styles.css';
import './App.css';

function App() {
  const [micPermission, setMicPermission] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [wordNotFound, setWordNotFound] = useState("");

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const requestMicPermission = async (closePopup, setIsPopupOpen, setMicPermission) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      stream.getTracks().forEach(track => track.stop());
      closePopup();
    } catch (err) {
      setIsPopupOpen(true);
      setMicPermission(false);
    }
  };

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<LandingPage />} />
        <Route exact path="/words" element={<Homepage setIsPopupOpen={setIsPopupOpen} setWordNotFound={setWordNotFound} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/analyze-sentences" element={<AnalyzeSentences />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/subscriptions" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/questions" element={<Questions />} />
      </Routes>

      {<LoadingAnimation
        requestMicPermission={requestMicPermission}
        closePopup={closePopup}
        setIsPopupOpen={setIsPopupOpen}
        setMicPermission={setMicPermission}
      />}

      {isPopupOpen && <Popup
        micPermission={micPermission}
        closePopup={closePopup}
        wordNotFound={wordNotFound}
      />}
    </div>
  );
}

export default App;

