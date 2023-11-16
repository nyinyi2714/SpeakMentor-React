import { useEffect, useState, useRef } from "react";
import useSpeechRecognizer from "../../hooks/useSpeechRecognizer";
import MicRecorder from "mic-recorder-to-mp3";
import useGoogleTTS from "../../hooks/useGoogleTTS";
import PopUp from "./PopUp/PopUp";
import Spinner from "./Spinner/Spinner";
import HelpSection from "./HelpSection/HelpSection";
import "boxicons";
import "./AnalyzeSentences.css";

function AnalyzeSentences() {
  const { 
    startRecording,
    stopRecording,
    resetTranscript,
    listening,
    transcript 
  } = useSpeechRecognizer();

  const { speak, stop, isSpeaking } = useGoogleTTS();

  const pageStates = {
    isRecording: "isRecording",
    isEditing: "isEditing",
    isAnalyzing: "isAnalyzing",
    analyzed: "analyzed",
  };

  const messages = {
    recordNow: "Please record yourself before clicking \"Next\".",
    editNow: "You can edit your transcript now if there's any mistake.",
  };

  const [editedTranscript, setEditedTranscript] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [recordedAudioData, setRecordedAudioData] = useState([]); // Store recorded audio data blobs
  const [Mp3Recorder, setMp3Recorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currPageState, setCurrPageState] = useState(pageStates.isRecording);
  const [message, setMessage] = useState(messages.recordNow);
  const [displayHelp, setDisplayHelp] = useState(false);

  const userRecording = useRef();

  const record = () => {
    // Reset the result
    setAudioURL(null);
    setIsRecording(true);
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
    setIsRecording(false);
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
    if(transcript.length <= 0) setEditedTranscript("Click Record to start");
    else setEditedTranscript(transcript);
  }, [transcript]);

  useEffect(() => {
    setMp3Recorder(new MicRecorder({ bitRate: 128 }));
  }, []);

  const listenToGoogleTTS = () => {
    if(isSpeaking) stop();
    else speak(transcript);
  };

  const listenToYourself = () => {
    const audio = userRecording.current;
  
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  // Go to next stage of the voice analysis
  const nextPageState = () => {
    setMessage(messages.editNow);
    setCurrPageState(pageStates.isEditing);
  };

  const prevPageState = () => {
    setMessage(messages.recordNow);
    reset();
    setCurrPageState(pageStates.isRecording);
  };

  const analyze = () => {
    // use useSpeechSuper API
    setCurrPageState(pageStates.isAnalyzing);
  };

  const openHelpSection = () => {
    setDisplayHelp(prevState => !prevState);
  };

  return(
    <div className="analyze-sentences">
      <div className="analyze-sentences__analyzer">
        {isRecording && <div className="recording-icon">
          REC
          <div className="circle" />
        </div>}
        <textarea 
          type="text" 
          value={editedTranscript} 
          readOnly={currPageState === pageStates.isRecording}
          onChange={editTranscript} 
        />
        {message && message.length > 0 && <p className="analyze-sentences__message">
          <box-icon name="error-circle" color="#5d5d5d" size="20px" />
          {message}
          </p>
        }
        <div className="analyze-sentences__btn-container">
          {currPageState === pageStates.isRecording &&
            <>
              <button 
                onClick={listening ? pause : record}
                className="btn"
              >
                {listening ? "Pause" : "Record"}
              </button>
              <button 
                className="btn" 
                onClick={reset}
                disabled={isRecording}
              >
                Reset
              </button>
              <button 
                className="btn" 
                onClick={nextPageState}
                // disabled={transcript.length <= 0 || isRecording}
              >
                Next
              </button>
            </>
          }
          {currPageState !== pageStates.isRecording && 
            <>
              <button className="btn" onClick={listenToGoogleTTS}>
                {isSpeaking ? "Stop" : "Text to Speech"}
              </button>
              <button className="btn" onClick={listenToYourself}>
                {userRecording.current.paused ? "Listen to yourself" : "Pause"}
              </button>
              <button className="btn" onClick={prevPageState}>
                Reset
              </button>
              {currPageState !== pageStates.analyzed && 
                <button className="btn" onClick={analyze}>Analyze</button> 
              }
            </>
          }
          
        </div>
      </div>
      {displayHelp && <HelpSection />}
      <button 
        onClick={openHelpSection}
        className="btn analyze-sentences__help-btn"
      >
        <div>
          <box-icon name="question-mark" color="#4285f4" size="20px" />
        </div>
      </button>
      {/* User's audio recording */}
      <audio src={audioURL} ref={userRecording} />

      {/* Display Spinner while analyzing the audio */}
      {currPageState === pageStates.isAnalyzing && 
        <PopUp content={Spinner()} />
      }

      {/* Display the popup pronounce component */}
      {/* TODO */}
    </div>
  );
}

export default AnalyzeSentences;