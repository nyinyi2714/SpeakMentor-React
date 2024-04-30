import { useEffect, useState } from "react";
import { useGoogleTTS } from "../../../hooks";
import config from "../../../config";
import Cookies from 'js-cookie';

import "./SuggestedWords.css";

export default function SuggestedWords({ setWord }) {
  const { speak, isSpeaking } = useGoogleTTS();
  const [ suggestedWords, setSuggestedWords ] = useState(['communication', 'vegetables', 'chocolate', 'crisps', 'film'])
  const [ isFetchingWords, setIsFetchingWords ] = useState(false)

  const handleSpeak = (e) => {
    if(isSpeaking) return;
    const word = e.target.dataset.value;
    speak(word);
  }

  const getPracticeList = async () => {
    setIsFetchingWords(true)
    try {
      const token = localStorage.getItem("token");
      let headers;
      if (token) {
        headers = {
          "Authorization": `Token ${token}`,
          "X-CSRFToken": Cookies.get('csrftoken')
        };
      } else {
        headers = {"X-CSRFToken": Cookies.get('csrftoken')};
      }
      let response = await fetch(config.backendUrl + "/api/get-practice-list", {
        method: "GET",
        headers: headers,
        credentials: "include",
      });
      response = await response.json();
     // console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
    setIsFetchingWords(false)
  }

  const updateSuggstedWords = async () => {
    setIsFetchingWords(true)
    const suggestedWordsData = await getPracticeList()
    setSuggestedWords(suggestedWordsData)
    setIsFetchingWords(false)
  }

  useEffect(() => {
    updateSuggstedWords()
  }, [])

  return (
    <div className="suggested-words">
      <h2>Word Suggestion</h2>
      <h3>Click the refresh button to get new words!</h3>
      <button 
        className={`refresh-btn ${isFetchingWords && 'loading'}`} 
        onClick={updateSuggstedWords} 
        disabled={isFetchingWords}
      >
        <box-icon name='sync' color="#4285f4" size="35px" />
      </button>

      <div className="word-list">
        {
          suggestedWords.length > 0 && !isFetchingWords &&
          suggestedWords.map((word, index) => {
            return (
              <div className={`word ${isSpeaking && "disabled"}`} key={index} >
                <box-icon onClick={handleSpeak} data-value={word} name="volume-full" size="16px" color="#4285f4" />
                {word}
                <button 
                  className="practice-btn" 
                  disabled={isSpeaking}
                  onClick={() => setWord(word)}
                >
                  Practice
                </button>
              </div>
            )
          })
        }

        {
          isFetchingWords && 
          <>
            <div className="word-skeleton">
              <span className="circle" />
              <span className="rectangle" />
              <span className="button" />
            </div>
            <div className="word-skeleton">
              <span className="circle" />
              <span className="rectangle" />
              <span className="button" />
            </div>
            <div className="word-skeleton">
              <span className="circle" />
              <span className="rectangle" />
              <span className="button" />
            </div>
            <div className="word-skeleton">
              <span className="circle" />
              <span className="rectangle" />
              <span className="button" />
            </div>
            <div className="word-skeleton">
              <span className="circle" />
              <span className="rectangle" />
              <span className="button" />
            </div>
          </>
        }
      </div>

    </div>
  );
}