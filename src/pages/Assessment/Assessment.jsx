import React, { useState, useEffect, useRef } from "react";
import "./Assessment.css"; // Import the CSS file


function AssessmentPage() {
  const [paragraph, setParagraph] = useState("");
  const [spokenText, setSpokenText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const [pronunciationScore, setPronunciationScore] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);

  useEffect(() => {
    // Fetch a random word (for now, you can replace it with an API call later)
    fetchRandomWord()
      .then((randomWord) => setParagraph(randomWord))
      .catch((error) => console.error(error));
  }, []);

  const toggleRecording = () => {
    if (!isRecording) {
      // Start recording
      startRecording();
    } else {
      // Stop recording and analyze pronunciation
      stopRecording();
      analyzePronunciation();
    }
  };

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioStreamRef.current = stream;
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            const audioChunks = [];
            audioChunks.push(event.data);
            const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
            setAudioBlob(audioBlob);
          }
        };
        mediaRecorder.onstop = () => {
          setIsRecording(false);
          if (audioStreamRef.current) {
            audioStreamRef.current.getTracks().forEach((track) => track.stop());
            audioStreamRef.current = null;
          }
        };
        mediaRecorder.start();
        setIsRecording(true);
        mediaRecorderRef.current = mediaRecorder;
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const analyzePronunciation = () => {
    // Use an API or service to analyze pronunciation based on spokenText
    // and set the result in the state (pronunciationScore).
    // This part is similar to the previous example.
  };

  async function fetchRandomWord() {
    try {
      // Replace this with your API call or random word generation logic
      const randomWord = "example";
      return randomWord;
    } catch (error) {
      throw error;
    }
  }

  return (
    <div>
      <h2>Assessment Page</h2>
      <p>Word to Pronounce: {paragraph}</p>

      <button onClick={toggleRecording}>
        {isRecording ? "Stop Speaking" : "Start Speaking"}
      </button>

      <div>
        <textarea
          rows="4"
          cols="50"
          placeholder="Spoken text will appear here..."
          value={spokenText}
          onChange={(e) => setSpokenText(e.target.value)}
        ></textarea>
      </div>

      {pronunciationScore !== null && (
        <div>
          <h3>Results:</h3>
          <p>Pronunciation Score: {pronunciationScore}</p>
          {/* Display more detailed feedback if available */}
        </div>
      )}
    </div>
  );
}

export default AssessmentPage;
