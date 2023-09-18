import { useState, useMemo, useRef } from "react";
import { backendUrl } from "../config";

function useAudio() {
  const [audioURL, setAudioURL] = useState(null);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const synth = window.speechSynthesis;

  const audioElement = useRef();

  const textToSpeech = (word, isAmerican) => {
    if(isRecording || isReplaying) return;

    setIsPronouncing(true);

    const voices = synth.getVoices();
    console.log(voices);
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

  const record = () => {
    if(isPronouncing || isReplaying) return;
    const device = navigator.mediaDevices.getUserMedia({ audio: true });
    const items = [];
    let audioStream;

    device.then((stream) => {
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        items.push(e.data);
        if (recorder.state === "inactive") {
          let blob = new Blob(items, { type: "audio/webm" });
          blob = URL.createObjectURL(blob);
          setAudioURL(blob);
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
    });
  };

  const sendAudioToServer = async () => {
    if (!audioURL) return;
    try {
      let response = await fetch(audioURL);
      const audioBlob = await response.blob();
      const formData = new FormData();
      formData.append("audio", audioBlob);

      response = await fetch(backendUrl, {
        method: "POST",
        body: formData,
      });

      response = await response.json();
      if (response.ok) {
        console.log("Audio sent to server successfully.");
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
    audioElement,
    isSlow,
    textToSpeech,
    record,
    sendAudioToServer,
    playAudio,
    setIsSlow
  };
}

export default useAudio;
