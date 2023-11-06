import { useState, useRef } from "react";
import { backendUrl } from "../config";
import FormData from 'form-data';
import MicRecorder from 'mic-recorder-to-mp3';

function useAudio({ word, setIsPopupOpen, setMicPermission }) {
  const [audioURL, setAudioURL] = useState(null);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [result, setResult] = useState(null);
  const synth = window.speechSynthesis;

  const audioElement = useRef();
  const soundEffectElement = useRef();

  const Mp3Recorder = new MicRecorder({ bitRate: 128 });

  const textToSpeech = (word, isAmerican) => {
    if (isRecording || isReplaying) return;

    setIsPronouncing(true);

    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(word);

    // Choose ascent and speak rate
    if (isAmerican) {
      utterThis.voice = voices[4];
      if (isSlow) utterThis.rate = 0.5;
    } else {
      utterThis.voice = voices[5];
      if (isSlow) utterThis.rate = 0.8;
      else utterThis.rate = 1.2;
    }

    utterThis.addEventListener("end", () => {
      setIsPronouncing(false);
    });

    synth.speak(utterThis);
  };

  const playSound = () => {
    soundEffectElement.current.play();
  };

  const record = () => {
    playSound();

    // Reset the result
    setResult(null);
    setAudioURL(null);

    const Mp3Recorder = new MicRecorder({ bitRate: 128 });
    Mp3Recorder.start();
    setTimeout(() => {
      Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const blobURL = URL.createObjectURL(blob);
          setAudioURL(blobURL);
          sendAudioToServer(blobURL);
        })
    }, [3000])
  }

  const sendAudioToServer = async (audioURL) => {
    if (!audioURL) return;

    try {
      setIsAnalyzing(true);
      let response = await fetch(audioURL);
      const audio = await response.blob();
      const formData = new FormData();
      formData.append("refText", word);
      formData.append("audioFile", audio, "audio.mp3");

      response = await fetch("http://localhost:8000/send_audio_to_speechsuper", {
        method: "POST",
        body: formData,
      });

      response = await response.json();
      console.log("Audio sent to server successfully.");
      // setResult(response);

    } catch (error) {
      console.error("Error sending audio to server:", error);
    }
    setIsAnalyzing(false);
  };

  const playAudio = () => {
    if (isRecording || isPronouncing) return;
    setIsReplaying(true);
    audioElement.current.play();
    audioElement.current.addEventListener("ended", () => {
      setIsReplaying(false);
    });
  };

  return {
    audioURL,
    isRecording,
    isPronouncing,
    isReplaying,
    isAnalyzing,
    audioElement,
    soundEffectElement,
    isSlow,
    result,
    textToSpeech,
    record,
    playAudio,
    setIsSlow
  };
}

export default useAudio;
