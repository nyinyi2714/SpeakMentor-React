import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useStateContext } from "./StateContext";
import { useRoute } from "./hooks";
import { 
  Homepage, 
  Login, 
  Register, 
  Assessment, 
  Instructions, 
  AnalyzeSentences, 
  ChatBotPage, 
  SubscriptionPage,
  PaymentPage,
  PaymentComplete,
  LandingPage,
} from './pages';
import { LoadingAnimation, Popup } from "./components";

import "boxicons";
import './App.css';

function App() {
  const { user, setUser } = useStateContext();
  const { authenticationRoute } = useRoute();

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

  useEffect(() => {
    if (!user) {
      // TODO: get user from localStorage
    }

  }, []);

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<LandingPage />} />
        <Route path="/words" element={<Homepage setIsPopupOpen={setIsPopupOpen} setWordNotFound={setWordNotFound} />} />
        <Route path="/login" element={authenticationRoute(false, Login)} />
        <Route path="/register" element={authenticationRoute(false, Register)} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/analyze-sentences" element={<AnalyzeSentences />} />
        <Route path="/chatbot" element={<ChatBotPage />} />
        <Route path="/subscriptions" element={<SubscriptionPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-complete" element={<PaymentComplete />} />
      </Routes>

      {/* {<LoadingAnimation
        requestMicPermission={requestMicPermission}
        closePopup={closePopup}
        setIsPopupOpen={setIsPopupOpen}
        setMicPermission={setMicPermission}
      />} */}

      {isPopupOpen && <Popup
        micPermission={micPermission}
        closePopup={closePopup}
        wordNotFound={wordNotFound}
      />}
    </div>
  );
}

export default App;

