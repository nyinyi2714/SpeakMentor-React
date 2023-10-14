import React, { useState, useEffect, useRef } from "react";
import useAPI from "../../hooks/useAPI";
import Pronounce from "../../components/Pronounce/Pronounce";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [micPermission, setMicPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [wordNotFound, setWordNotFound] = useState("");

  const { checkWord } = useAPI();

  const wordInput = useRef();

  const requestMicPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      stream.getTracks().forEach(track => track.stop());
      closePopup();
    } catch(err) {
      setIsPopupOpen(true);
      setMicPermission(false);
    }
  };

  const searchWordInput = async () => {
    // Check if word exists using dictionary API
    const isWordFound = await checkWord(wordInput.current.value);
    
    if(isWordFound) {
      setWordNotFound("");
      setIsPopupOpen(false);
      setWord(wordInput.current.value);
    } else {
      setWordNotFound(wordInput.current.value);
      setIsPopupOpen(true);
    }
  };

  const searchWordWithEnter = (e) => {
    if(e.code === "Enter") searchWordInput();
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
      
      {isLoading && <Spinner />}
      <Navbar />
      <div className={`homepage ${isLoading && "loading"}`}>
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
        
        {isPopupOpen && 
          <Popup 
            micPermission={micPermission} 
            closePopup={closePopup}
            wordNotFound={wordNotFound}
          />
        }

        <Pronounce 
          word={word} 
          setIsPopupOpen={setIsPopupOpen} 
          setMicPermission={setMicPermission} 
        />
      </div> 

      <Link to="/assessment">
        <button className="homepage__btn" type="button">
          Assessment
        </button>
      </Link>
    </React.Fragment>
  );
  
}

export default Homepage;