import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { useStateContext } from "./StateContext";
import useRoute from "./hooks/useRoute";

import Homepage from "./pages/Homepage/Homepage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Assessment from "./pages/Assessment/Assessment";
import Instructions from "./pages/Instructions/Instructions";
import AnalyzeSentences from "./pages/AnalyzeSentences/AnalyzeSentences";

import LoadingAnimation from "./components/LoadingAnimation/LoadingAnimation";
import Popup from "./components/Popup/Popup";

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
        <Route exact path="/" element={<Homepage setIsPopupOpen={setIsPopupOpen} setWordNotFound={setWordNotFound} />} />
        <Route path="/login" element={authenticationRoute(false, Login)} />
        <Route path="/register" element={authenticationRoute(false, Register)} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/analyze-sentences" element={<AnalyzeSentences />} />
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

