import { useEffect, useState } from "react";
import { useGoogleTTS } from "../../../hooks";
import config from "../../../config";
import Cookies from 'js-cookie';

import "./SuggestedWords.css";

export default function SuggestedWords() {
  const { speak, isSpeaking } = useGoogleTTS();

  const handleSpeak = (e) => {
    if(isSpeaking) return;
    const word = e.target.dataset.value;
    speak(word);
  }



  const getPracticeList = async () => {
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
      console.log(response);
      return response;
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    console.log("Fetching practice list...");
    const practiceList = getPracticeList();
    console.log(practiceList);
  }, []);

  return (
    <div className="suggested-words">
      <h2>Word Suggestion</h2>
      <h3>Based on your practice history and previous performance</h3>
      <button>refresh</button>
      <div className="word-list">
        <div className={`word ${isSpeaking && "disabled"}`} >
          <box-icon onClick={handleSpeak} data-value="communication" name="volume-full" size="16px" color="#4285f4" />
          Communication
          <button className="practice-btn" disabled={isSpeaking}>Practice</button>
        </div>
        <div className="word">
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          Treasure
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          Pearl
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          Vegetables
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          Crisps
          <button className="practice-btn">Practice</button>
        </div>
      </div>

    </div>
  );
}