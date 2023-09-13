import { useState, useRef, useMemo } from "react";
import Boxicons from "boxicons";
import "./Homepage.css";

function Homepage() {
  const [audioURL, setAudioURL] = useState(null);
  const [word, setWord] = useState("carpet");
  const [isRecording, setIsRecording] = useState(false);

  const [isAmerican, setIsAmerican] = useState(true);
  const synth = window.speechSynthesis;
  const voices = useMemo(() => synth.getVoices(), []);
  const audioElement = useRef();

  const handleChange = (e) => {
    setWord(e.target.value);
  };

  const textToSpeech = () => {
    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = voices[isAmerican ? 2 : 5];
    synth.speak(utterThis);
  };
  
  const record = () => {
    const device = navigator.mediaDevices.getUserMedia({audio: true});
    const items = [];
    let audioStream;
    device.then(stream => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => {
        items.push(e.data)
        if(recorder.state === "inactive") {
          let blob = new Blob(items, {type: "audio/webm"})
          blob = URL.createObjectURL(blob);
          setAudioURL(blob);
        }
      }
      recorder.start();
      setIsRecording(true);
      audioStream = stream;

      setTimeout(() => {
        recorder.stop();
        setIsRecording(false);
        if (audioStream) {
          const audioTracks = audioStream.getTracks();
          audioTracks.forEach(track => {
            track.stop();
          });
        }
      }, 4000)
    })
  };

  const playAudio = () => {
    audioElement.current.play();
  };

  const changePronunciation = () => {
    setIsAmerican(state => !state);
  };

  const sendAudioToServer = async () => {
    if (!audioURL) return;
    try {
      let response = await fetch(audioURL);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append("audio", audioBlob);

      // TODO: add backend url
      response = await fetch("/your-backend-endpoint", {
        method: "POST",
        body: formData,
      })

      response = await response.json();
      if (response.ok) {
        console.log("Audio sent to server successfully.");
      } else {
        console.error("Error sending audio to server.");
      }

    } catch(error) {
      console.error("Error sending audio to server:", error);
    };
  };
  
  return (
    <div className="homepage">
      <input 
        type="text" 
        className="homepage__input" 
        value={word} 
        onChange={handleChange} 
      />

      <h2 className="homepage__word">{word}</h2>
      <button type="button" onClick={changePronunciation}>
        {isAmerican ? "American" : "British"} Pronunciation
      </button>
      <div className="homepage__record">
        <div>Sounds like</div>
        <div className="homepage__flex">
          kaar puht
          <button className="homepage__icon" onClick={textToSpeech}>
          <box-icon name ="volume-full" size="sm" />
          </button>
        </div>
        <button 
          className={`homepage__icon ${isRecording && "blinking"}`} 
          onClick={record}
        >
          <box-icon type="solid" name="microphone" size="sm" />
        </button>
        <button className="homepage__icon" onClick={playAudio}>
          <box-icon name="volume-full" size="sm" />
        </button>
      </div>
      <audio src={audioURL} ref={audioElement} className="homepage__hidden" />
    </div> 
  );
}

export default Homepage;