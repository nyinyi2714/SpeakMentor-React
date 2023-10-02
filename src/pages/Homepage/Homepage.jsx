import React, { useState, useEffect, useRef } from "react";
import Pronounce from "../../components/Pronounce/Pronounce";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
import { Link } from "react-router-dom"; // Import Link from React Router (if you're using it)
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [micPermission, setMicPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const wordInput = useRef();

  const searchWordInput = () => {
    setWord(wordInput.current.value);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };
  
  // Open popup reminder if user visits for first time
  useEffect(() => {
    const isVisited = localStorage.getItem("isVisited");

    if (isVisited !== "true") {
      setIsPopupOpen(true);
      localStorage.setItem("isVisited", "true");
    }

    // Prepopulation the word search input
    wordInput.current.value = "carpet";
  }, []);
  
  return (
    <React.Fragment>
      
      {isLoading && <Spinner />}
      <div className={`homepage ${isLoading && "loading"}`}>
        <div className="homepage__search-word">
          <input 
            type="text" 
            className="homepage__input"
            ref={wordInput}
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