import { useState, useRef } from "react";
import { backendUrl } from "../config";

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

  const textToSpeech = (word, isAmerican) => {
    if(isRecording || isReplaying) return;

    setIsPronouncing(true);

    const voices = synth.getVoices();
    const utterThis = new SpeechSynthesisUtterance(word);

    // Choose ascent and speak rate
    if(isAmerican) {
      utterThis.voice = voices[4];
      if(isSlow) utterThis.rate = 0.5;
    } else {
      utterThis.voice = voices[5];
      if(isSlow) utterThis.rate = 0.8;
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
    if(isPronouncing || isReplaying) return;
    // Play the sound effect
    playSound();

    // Reset the result
    setResult(null);
    setAudioURL(null);

    const device = navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    const items = [];
    let audioStream;

    device.then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state === "inactive") {
          let blob = new Blob(items, { type: "audio/wav" });
          blob = URL.createObjectURL(blob);
          setAudioURL(blob);
          sendAudioToServer(blob);
        }
      };
      recorder.start();
      setIsRecording(true);
      audioStream = stream;

      setTimeout(() => {
        recorder.stop();
        if (audioStream) {
          const audioTracks = audioStream.getTracks();
          audioTracks.forEach((track) => {
            track.stop();
            setIsRecording(false);
          });
        }
      }, 3000);
    }).catch((error) => {
      console.log(setMicPermission)
      setIsPopupOpen(true);
      setMicPermission(false);
      console.error("Error accessing the microphone:", error);
    });
  };

  const sendAudioToServer = async (audioURL) => {
    if (!audioURL) return;

    try {
      setIsAnalyzing(true);
      let response = await fetch(audioURL);
      const audio = await response.blob();
      const formData = new FormData();
      formData.append("refText", word);
      formData.append("audioFile", audio, "audio.wav");

      // TODO: Delete. To stimulate sending audio to backend
      // setTimeout(() => {
      //   setResult({data: "string"});
      //   setIsAnalyzing(false);
      // }, 2000);
      // return;

      response = await fetch("http://localhost:8000/send_audio_to_speechsuper", {
        method: "POST",
        body: formData,
      });

      response = await response.json();
      if (response.ok) {
        console.log("Audio sent to server successfully.");
        setResult(response);
        setIsAnalyzing(false);
      } else {
        console.error("Error sending audio to server.");
      }
    } catch (error) {
      console.error("Error sending audio to server:", error);
    }
  };

  const playAudio = () => {
    if(isRecording || isPronouncing) return;
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
