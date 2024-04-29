import { useState, useRef } from "react";
import useGoogleTTS from "../hooks/useGoogleTTS";
import MicRecorder from "mic-recorder-to-mp3";
import useSpeechSuper from "./useSpeechSuper";
import config from "../config";

import Cookies from 'js-cookie';
function useAudio({ word }) {

  const { sendAudioToSpeechSuperAPI } = useSpeechSuper();
  const { speak, isSpeaking } = useGoogleTTS();

  const [audioURL, setAudioURL] = useState(null);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [result, setResult] = useState(null);

  const Mp3Recorder = useRef();
  const audioElement = useRef();
  const soundEffectElement = useRef();

  const textToSpeech = (word) => {
    if (isRecording || isReplaying || isSpeaking) return;
    speak(word, isSlow);
  };

  const playSound = () => {
    soundEffectElement.current.play();
  };

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

    Mp3Recorder.current = new MicRecorder({ bitRate: 128 });
    Mp3Recorder.current.start();
  };

  function getCsrfToken() {
    return document.cookie.split('; ')
      .find(row => row.startsWith('csrftoken'))
      ?.split('=')[1];
  }

  function getThreadIdCookie() {
    return document.cookie.split('; ')
      .find(row => row.startsWith('thread_id'))
      ?.split('=')[1];
  }

  const endChatbotRecording = async () => {

    const sendUserAudio = async (audioBlob) => {
      try {

        const formData = new FormData();
        formData.append('audio', new Blob([audioBlob], { type: "audio/mp3" }), 'audio.mp3');

        const thread_id = localStorage.getItem("thread_id");
        if (thread_id) {
          formData.append('thread_id', thread_id);
        } else {
          formData.append('thread_id', "");
        }

        const token = localStorage.getItem("token");
        //console.log("Token:", token);
        //console.log("CsrfToken:", getCsrfToken());

        let headers;
        if (token) {
          headers = {
            "Authorization": `Token ${token}`,
            "X-CSRFToken": getCsrfToken()
          };
        } else {
          headers = {"X-CSRFToken": Cookies.get('csrftoken')};
        }

        let response = await fetch(config.backendUrl + "/process?type=chatbot", {
          method: "POST",
          headers: headers,
          credentials: "include",
          body: formData,
        });

        response = await response.json();
        
        //console.log(response);
        localStorage.setItem("thread_id", response.thread_id);

        return response;

      } catch (err) {
        console.error(err);
      }
    };

    try {
      const [buffer, blob] = await Mp3Recorder.current.stop().getMp3();
      setIsRecording(false);

      const res = await sendUserAudio(blob);
      return res;
    } catch (error) {
      console.error(error);
      setIsRecording(false);
      return null;
    }
  }

  const sendAudioToServer = async (audioBlob) => {
    setIsAnalyzing(true);
    // TODO: delete dummy data
    // const resultData = {
    //   laymans: [
    //     {phrase: 'uhg', score: 80},
    //     {phrase: 'zam', score: 60},
    //     {phrase: 'pl', score: 95},
    //   ],
    //   feedbacks: [
    //     {phrase: 'uhg', suggestion: 'make sure your tongue is on the bottom of the mouth as you make a  very shot "uh" sound.'},
    //     {phrase: 'zam', suggestion: 'try to open your mouth and pull your lips slightly to the side. Your tongue should be low in the front and high in the back.'},
    //   ]
    // }
    // setTimeout(() => {
    //   setResult(resultData)
    //   setIsAnalyzing(false);
    // }, 1000)
    
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
    endChatbotRecording,
  };
}

export default useAudio;
