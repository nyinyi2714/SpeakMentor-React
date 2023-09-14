import { useState, useMemo, useRef } from "react";

function useAudio() {
  const [audioURL, setAudioURL] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const synth = window.speechSynthesis;
  const voices = useMemo(() => synth.getVoices(), [synth]);
  const audioElement = useRef();

  const textToSpeech = (word, isAmerican) => {
    const utterThis = new SpeechSynthesisUtterance(word);
    utterThis.voice = voices[isAmerican ? 2 : 5];
    synth.speak(utterThis);
  };

  const record = () => {
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
      }, 4000);
    });
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
    audioElement.current.play();
  };

  return {
    audioURL,
    isRecording,
    audioElement,
    textToSpeech,
    record,
    sendAudioToServer,
    playAudio,
  };
}

export default useAudio;
