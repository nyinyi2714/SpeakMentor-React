import React, { useState, useEffect, useRef } from "react";
import useDictionaryAPI from "../../hooks/useDictionaryAPI";

import { Pronounce, Navbar } from "../../components";
import { useRedirect } from "../../hooks";
import SuggestedWords from "./SuggestedWords/SuggestedWords";
import "./Homepage.css";

function Homepage(props) {
  const { loginRedirect } = useRedirect();
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
    wordInput.current.value = word;
  }, [word])

  useEffect(() => { 
    // Prepopulation the word search input
    wordInput.current.value = "example"; 
    loginRedirect()
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <div className="homepage-wrapper">
        <div className="flex-container">
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
        <SuggestedWords setWord={setWord} />
        </div>
        
      </div>
    </React.Fragment>
  );

}

export default Homepage;