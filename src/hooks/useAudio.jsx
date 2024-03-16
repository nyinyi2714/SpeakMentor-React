import { useState, useRef } from "react";
import useGoogleTTS from "../hooks/useGoogleTTS";
import MicRecorder from "mic-recorder-to-mp3";
import useSpeechSuper from "./useSpeechSuper";
import config from "../config";

function useAudio({ word }) {

  const { sendAudioToSpeechSuperAPI } = useSpeechSuper();
  const { speak, isSpeaking } = useGoogleTTS();

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

  const recordForChatBot = () => {
    if(!checkMicrophonePermission()) return;
    playSound();

    setIsRecording(true);

    const Mp3Recorder = new MicRecorder({ bitRate: 128 });
    Mp3Recorder.start();

    const sendUserAudio = async (audioBlob) => {
      try {
        const formData = new FormData();
        formData.append('audio', new Blob([audioBlob], { type: "audio/mp3" }), 'audio.mp3');

        let response = await fetch(config.backendUrl + "/chatbot", {
          method: "POST",
          body: formData
        });

        response = await response.json();
        return response;
        
      } catch(err) {
        console.error(err);
      }
    };
  
    const endRecording = () => {
      Mp3Recorder
        .stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const res = sendUserAudio(blob);
          setIsRecording(false);
          return res;
        })  
    }

    return endRecording;
  };

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
    recordForChatBot,
  };
}

export default useAudio;
