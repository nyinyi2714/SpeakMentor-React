import { useEffect, useState } from "react";
import useSpeechRecognizer from "../../hooks/useSpeechRecognizer";
import MicRecorder from 'mic-recorder-to-mp3';
import "./AnalyzeSentences.css";

function AnalyzeSentences() {
  const { 
    startRecording,
    stopRecording,
    resetTranscript,
    listening,
    transcript 
  } = useSpeechRecognizer();

  const [editedTranscript, setEditedTranscript] = useState(transcript);
  const [audioURL, setAudioURL] = useState("");
  const [recordedAudioData, setRecordedAudioData] = useState([]); // Store recorded audio data blobs
  const [Mp3Recorder, setMp3Recorder] = useState(null);

  const record = () => {
    // Reset the result
    setAudioURL(null);
    Mp3Recorder.start();

    // Start the speech recognizer
    startRecording();
  }

  const pause = () => {
    // pause the audio Recording
    Mp3Recorder
    .stop()
    .getMp3()
    .then(([buffer, blob]) => {
      // Store the recorded audio data blob
      setRecordedAudioData((prevData) => [...prevData, blob]);
    })

    // Stop the speech recognizer recording
    stopRecording();
  }

  const reset = () => {
    resetTranscript();
    setAudioURL(null);
    setRecordedAudioData([]);
  };

  const editTranscript = (e) => {
    setEditedTranscript(e.target.value);
  };

  // Concatenate the audio blob after each pause
  useEffect(() => {
    if(recordedAudioData.length <= 0) return;
    const concatenatedBlob = new Blob(recordedAudioData);
    const blobURL = URL.createObjectURL(concatenatedBlob);
    setAudioURL(blobURL);
  }, [recordedAudioData]);

  // Update the trascript
  useEffect(() => {
    setEditedTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    setMp3Recorder(new MicRecorder({ bitRate: 128 }));
  }, []);

  return(
    <div className="analyze-sentences">
      <textarea type="text" value={editedTranscript} onChange={editTranscript} />
      <div className="analyze-sentences__btn-container">
        <button 
          onClick={listening ? pause : record}
          className="btn"
        >
          {listening ? "Pause" : "Practice"}
        </button>
        <button className="btn" onClick={reset}>Reset</button>
        <button className="btn">Submit</button>
      </div>
      <audio src={audioURL} controls></audio>
    </div>
  );
}

export default AnalyzeSentences;