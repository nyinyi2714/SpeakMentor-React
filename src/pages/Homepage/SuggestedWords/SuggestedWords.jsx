import { useGoogleTTS } from "../../../hooks";

import "./SuggestedWords.css";

export default function SuggestedWords() {
  const { speak, isSpeaking } = useGoogleTTS();

  const handleSpeak = (e) => {
    if(isSpeaking) return;
    const word = e.target.dataset.value;
    speak(word);
  } 

  return (
    <div className="suggested-words">
      <h2>Suggested Words</h2>
      <h3>Based on your previous performance</h3>
      <div className="word-list">
        <div className={`word ${isSpeaking && "disabled"}`} >Communication
          <box-icon onClick={handleSpeak} data-value="communication" name="volume-full" size="16px" color="#4285f4" />
          <button className="practice-btn" disabled={isSpeaking}>Practice</button>
        </div>
        <div className="word">Treasure
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">Pearl
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">Vegetables
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          <button className="practice-btn">Practice</button>
        </div>
        <div className="word">Crisps
          <box-icon onClick={handleSpeak} name="volume-full" size="16px" color="#4285f4" />
          <button className="practice-btn">Practice</button>
        </div>
      </div>

    </div>
  );
}