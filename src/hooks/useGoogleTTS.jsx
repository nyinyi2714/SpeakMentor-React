import { useState, useEffect } from "react";
import config from "../config";
import axios from "axios";

function useGoogleTTS(speakingSpeed) {
  const [audio, setAudio] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (word, isSlow) => {
    setIsSpeaking(true);

    const body = {
      audioConfig: {
        audioEncoding: "MP3"
      },
      input: {
        text: word
      },
      voice: {
        ssmlGender: "MALE",
        languageCode: "en-US"
      }
    };
  
    axios.post("https://texttospeech.googleapis.com/v1/text:synthesize", body, {
      headers: {
        "X-Goog-Api-Key": config.googleTTSKey
      }
    })
    .then(response => {
      const audioContent = response.data.audioContent;
      const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audioElement = new Audio(audioUrl);
      audioElement.playbackRate = isSlow ? 0.6 : 1.1;
      if(speakingSpeed) audioElement.playbackRate = speakingSpeed;

      // Attach an event listener for when the audio playback ends
      audioElement.addEventListener('ended', () => {
        setIsSpeaking(false);
      });

      audioElement.play().catch(e => console.error("Error playing audio: ", e));
      setAudio(audioElement);
    })
    .catch(error => {
      console.error("Error with the Text-to-Speech API", error.message);
    });
  };

  const stop = () => {
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup function to remove event listener when the component unmounts
      if (audio) {
        audio.removeEventListener('ended', () => setIsSpeaking(false));
      }
    };
  }, [audio]);

  return {
    speak,
    stop,
    isSpeaking
  };
}

export default useGoogleTTS;