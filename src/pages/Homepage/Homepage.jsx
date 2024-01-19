import React, { useState, useEffect, useRef } from "react";
import useDictionaryAPI from "../../hooks/useDictionaryAPI";

import Pronounce from "../../components/Pronounce/Pronounce";
import CtaButton from "../../components/CtaButton/CtaButton";
import Navbar from "../../components/Navbar/Navbar";
import "./Homepage.css";

function Homepage(props) {

  const { setIsPopupOpen, setWordNotFound } = props;

  const [word, setWord] = useState("example");
  const { checkWord } = useDictionaryAPI();

  const wordInput = useRef();

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

  useEffect(() => { 
    // Prepopulation the word search input
    wordInput.current.value = "example"; 
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
            <img id="logo" src="/images/main-logo.png" alt="logo" />
            Ready to enhance your pronunciation skills? Start practicing with phrases and sentences.
            <CtaButton text="Practice Now" />
          </p>
          <div className="image-wrapper">
            <img 
              id="background-mic"
              src="/images/background-image--mic.png" 
              alt="background-mic"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );

}

export default Homepage;