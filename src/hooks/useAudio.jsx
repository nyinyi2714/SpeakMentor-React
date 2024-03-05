import { useState, useRef } from "react";
import useGoogleTTS from "../hooks/useGoogleTTS";
import MicRecorder from "mic-recorder-to-mp3";
import useSpeechSuper from "./useSpeechSuper";
import useBackend from "./useBackend";

function useAudio({ word }) {

  const { sendAudioToSpeechSuperAPI } = useSpeechSuper();
  const { speak, isSpeaking } = useGoogleTTS();
  const { getFeedback } = useBackend();

  const [audioURL, setAudioURL] = useState(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [result, setResult] = useState(null);

  const audioElement = useRef();
  const soundEffectElement = useRef();

  const textToSpeech = (word) => {
    if (isRecording || isReplaying || isSpeaking) return;
    speak(word, isSlow);
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
          sendAudioToServer(blob);
        })
        setIsRecording(false);
    }, [3000])
  }

  const sendAudioToServer = async (audioBlob) => {
    setIsAnalyzing(true);
    const resultData = await sendAudioToSpeechSuperAPI(audioBlob, word, true);
    setResult(resultData);
    setIsAnalyzing(false);
  };

  const playAudio = () => {
    if (isRecording || isSpeaking) return;
    setIsReplaying(true);
    audioElement.current.play();
    audioElement.current.addEventListener("ended", () => {
      setIsReplaying(false);
    });
  };

  return {
    audioURL,
    isRecording,
    isSpeaking,
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
