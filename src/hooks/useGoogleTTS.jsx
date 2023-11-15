import config from "../config";
import axios from "axios";

function useGoogleTTS() {
  const speak = (word) => {
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
      console.log(response)
      const audioBlob = new Blob([Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))], { type: 'audio/mp3' });
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audio.play().catch(e => console.error("Error playing audio: ", e));
    })
    .catch(error => {
      console.error("Error with the Text-to-Speech API", error.message);
    });
  };

  return {
    speak
  };
}

export default useGoogleTTS;