import { useState } from "react";
import Pronounce from "../../components/Pronounce/Pronounce";
import "./Homepage.css";

function Homepage() {
  const [word, setWord] = useState("carpet");

  const handleWordInput = (e) => {
    setWord(e.target.value);
  };
  
  return (
    <div className="homepage">
      <input 
        type="text" 
        className="homepage__input" 
        value={word} 
        onChange={handleWordInput} 
      />
      
      <Pronounce word={word} />
    </div> 
  );
}

export default Homepage;