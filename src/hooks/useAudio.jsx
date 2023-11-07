import { useState, useRef } from "react";
import { backendUrl } from "../config";
import FormData from "form-data";
import MicRecorder from "mic-recorder-to-mp3";
import useSpeechSuper from "./useSpeechSuper";

function useAudio({ word }) {

  const { sendAudioToSpeechSuperAPI } = useSpeechSuper();

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

  // TODO: handle recording when mic permission is denied
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // the user has granted microphone access permission.
      return true;
    } catch (error) {
      // the user has not granted microphone access permission.
      console.error("Microphone permission denied or an error occurred:", error);
      return false;
    }
  };  

  const reset = () => {
    setResult(null);
    setAudioURL(null);
  };

  const record = () => {
    if(!checkMicrophonePermission()) return;
    playSound();

    // Reset the result
    reset();
    setIsRecording(true);

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
        setIsRecording(false);
    }, [3000])
  }

  const sendAudioToServer = async (audioURL) => {
    setIsAnalyzing(true);
    const resultData = await sendAudioToSpeechSuperAPI(audioURL, word);
    setResult(resultData);
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
    setIsSlow,
    reset,
  };
}

export default useAudio;
