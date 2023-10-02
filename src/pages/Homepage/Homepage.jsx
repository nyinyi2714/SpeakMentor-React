import React, { useState, useEffect, useRef } from "react";
import useAPI from "../../hooks/useAPI";
import Pronounce from "../../components/Pronounce/Pronounce";
import Popup from "../../components/Popup/Popup";
import Spinner from "../../components/Spinner/Spinner";
<<<<<<< HEAD
import { Link } from "react-router-dom"; // Import Link from React Router (if you're using it)
=======
import Navbar from "../../components/Navbar/Navbar";
>>>>>>> 94050116d307b592a68a0487d027a70dede186c0
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [micPermission, setMicPermission] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [wordNotFound, setWordNotFound] = useState("");

  const { checkWord } = useAPI();

  const wordInput = useRef();

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
      <Navbar />
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