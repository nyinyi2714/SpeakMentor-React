import React, { useState, useEffect, useRef } from "react";
import useDictionaryAPI from "../../hooks/useDictionaryAPI";
import Pronounce from "../../components/Pronounce/Pronounce";
import Popup from "../../components/Popup/Popup";
import CtaButton from "../../components/CtaButton/CtaButton";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [micPermission, setMicPermission] = useState(true);
  const [wordNotFound, setWordNotFound] = useState("");

  const { checkWord } = useDictionaryAPI();

  const wordInput = useRef();

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      stream.getTracks().forEach(track => track.stop());
      closePopup();
    } catch (err) {
      setIsPopupOpen(true);
      setMicPermission(false);
    }
  };

  const searchWordInput = async () => {
    // Check if word exists using dictionary API
    const isWordFound = await checkWord(wordInput.current.value);

    if (isWordFound) {
      setWordNotFound("");
      setIsPopupOpen(false);
      setWord(wordInput.current.value);
    } else {
      setWordNotFound(wordInput.current.value);
      setIsPopupOpen(true);
    }
  };

  const searchWordWithEnter = (e) => {
    if (e.code === "Enter") searchWordInput();
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  /*
    Open popup reminder and request mic permission
    if user visits for first time
   */
  useEffect(() => {
    const isVisited = localStorage.getItem("isVisited");

    if (isVisited !== "true") {
      setIsPopupOpen(true);
      localStorage.setItem("isVisited", "true");
      requestMicPermission();
    }

    // Prepopulation the word search input
    wordInput.current.value = "carpet";
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="homepage-wrapper">
        <div className="homepage">
          <div className="homepage__search-word">
            <input
              type="text"
              className="homepage__input"
              ref={wordInput}
              onKeyDown={searchWordWithEnter}
            />

            <button
              className="homepage__btn"
              type="button"
              onClick={searchWordInput}
            >
              Search
            </button>
          </div>
          <Pronounce
            word={word}
          />
        </div>
        <div className="homepage__welcome-section">
          <p>
            <img src="/images/main-logo.png" alt="logo" />
            Ready to enhance your pronunciation skills? Start practicing with phrases and sentences.
            <CtaButton text="Practice Now" />
          </p>
          <div className="image-wrapper">
            <img 
              src="/images/background-image--mic.png" 
              alt="background-mic"
            />
          </div>
        </div>
      </div>

        <Pronounce 
          word={word}
        />
      }
    </React.Fragment>
  );

}

export default Homepage;