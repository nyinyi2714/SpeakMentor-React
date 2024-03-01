import React, { useEffect, useState, useRef } from "react";

import { Link } from "react-router-dom";
import { useSpeechRecognizer, useGoogleTTS, useSpeechSuper } from "../../hooks";

import { PopUp, Spinner, DisplaySteps, HelpSection } from "./index";
import { Pronounce, Navbar } from "../../components";

import MicRecorder from "mic-recorder-to-mp3";
import "./AnalyzeSentences.css";

function AnalyzeSentences() {
  const {
    startRecording,
    stopRecording,
    resetTranscript,
    listening,
    transcript
  } = useSpeechRecognizer();

  const { speak, stop, isSpeaking } = useGoogleTTS(1);
  const { sendAudioToSpeechSuperAPI, chooseColorsForScores } = useSpeechSuper();

  const pageStates = {
    isRecording: "Record",
    isEditing: "Edit",
    isAnalyzing: "Analyze",
    analyzed: "Practice",
  };

  const currStep = {
    "Record": 1,
    "Edit": 2,
    "Analyze": 2,
    "Practice": 3,
  }

  const messages = {
    recordNow: "Please record yourself before clicking \"Next\".",
    editNow: "You can edit your transcript now if there's any mistake in speech recognization.",
    practiceNow: "You can click on words to practice them."
  };

  const [editedTranscript, setEditedTranscript] = useState("");
  const [audioURL, setAudioURL] = useState("");
  const [audioBlob, setAudioBlob] = useState(null); // Store the audio blob
  const [recordedAudioData, setRecordedAudioData] = useState([]); // Store recorded audio data blobs
  const [Mp3Recorder, setMp3Recorder] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [currPageState, setCurrPageState] = useState(pageStates.isRecording);
  const [message, setMessage] = useState(messages.recordNow);
  const [displayHelp, setDisplayHelp] = useState(false);
  const [currWordResult, setCurrWordResult] = useState(null);
  const [speechSuperResultData, setSpeechSuperResultData] = useState(null);
  const [isListeningToYourSelf, setIsListeningToYourself] = useState(false);

  const userRecording = useRef();
  const linkToHelpSection = useRef();

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
    if (recordedAudioData.length <= 0) return;
    const audioBlob = new Blob(recordedAudioData);
    setAudioBlob(audioBlob);
    const concatenatedBlob = new Blob(recordedAudioData);
    const blobURL = URL.createObjectURL(concatenatedBlob);
    setAudioURL(blobURL);
  }, [recordedAudioData]);

  // Update the trascript
  useEffect(() => {
    if (transcript.length <= 0) setEditedTranscript("Click Record to start");
    else setEditedTranscript(transcript);
  }, [transcript]);

  const listenToGoogleTTS = () => {
    if (isSpeaking) stop();
    else speak(editedTranscript);
  };

  const listenToYourself = () => {
    const audio = userRecording.current;
    if (isListeningToYourSelf) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsListeningToYourself(prev => !prev);
  };

  useEffect(() => {
    const handleAudioEnded = () => {
      setIsListeningToYourself(false);
    };

    // Add the 'ended' event listener when the component mounts
    userRecording.current.addEventListener('ended', handleAudioEnded);

    // Remove the event listener when the component unmounts
    return () => {
      if(!userRecording.current) return;
      userRecording.current.removeEventListener('ended', handleAudioEnded);
    };
  }, []);

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
    sendAudioToSpeechSuperAPI(audioBlob, editedTranscript, false).then(resultData => {

      setSpeechSuperResultData(resultData);
      setCurrPageState(pageStates.analyzed);
      setMessage(messages.practiceNow);
    })
  };

  function stripNonLetters(word) {
    // Remove any characters that aren't letters
    return word.replace(/[^a-zA-Z]/g, '');
  }

  const generateResultForSentences = (resultData) => {
    // console.log("resultdata: ",resultData);
    if (!resultData) return;
    let words = [];
  
    // Assuming 'chooseColorsForScores' and 'setCurrWordResult' are defined elsewhere in your code
    const chooseColorsForScores = (score) => {
      // Define your logic for choosing colors based on score
      // This is a placeholder function
      if (score >= 90) return 'green';
      else if (score >= 75) return 'orange';
      else return 'red';
    };
  
    const stripNonLetters = (word) => {
      // Presumably, you have this function defined to strip non-letter characters
      return word.replace(/[^a-zA-Z]+/g, '');
    };
  
    const convertSentenceIntoWords = (sentence, wordsArray) => {
      sentence.forEach((wordData, index) => {
        const overallScore = wordData.PronunciationAssessment ? wordData.PronunciationAssessment.AccuracyScore : 0;
        wordsArray.push(
          <span
            style={{ color: chooseColorsForScores(overallScore) }}
            key={index}
            onClick={() => setCurrWordResult(stripNonLetters(wordData.Word))}
          >
            {wordData.Word + " "}
          </span>
        );
      });
    };
  
    // Assuming the best result is the first in the NBest array
    const bestResult = resultData.NBest[0];
    console.log("bestResult: ", bestResult);
    if (bestResult && bestResult.Words) {
      convertSentenceIntoWords(bestResult.Words, words);
    }
  
    return words;
  };
  

  const openHelpSection = () => {
    if(!displayHelp) {
      setTimeout(() => {
        linkToHelpSection.current.click();
      }, 400);
    }

    setDisplayHelp(prevState => !prevState);
  };

  const closePopUp = () => {
    setCurrWordResult(null);
  };

  // Close popup box with outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (e.target.id === "popup-wrapper") {
        closePopUp();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMp3Recorder(new MicRecorder({ bitRate: 128 }));
  }, []);

  return (
    <React.Fragment>
      <div className="analyze-sentences">
        <DisplaySteps currentStep={currStep[currPageState]} />
        <div className="analyze-sentences__analyzer">
          {isRecording &&
            <div className="recording-icon">
              REC
              <div className="circle" />
            </div>
          }

          {currPageState !== pageStates.analyzed &&
            <textarea
              type="text"
              value={editedTranscript}
              readOnly={currPageState === pageStates.isRecording}
              onChange={editTranscript}
            />
          }
          {currPageState === pageStates.analyzed &&
            <div className="textarea">
              {generateResultForSentences(speechSuperResultData)}
            </div>
          }

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
                  disabled={transcript.length <= 0 || isRecording}
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
                  {userRecording.current && (isListeningToYourSelf ? "Pause" : "Listen to yourself")}
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
        <HelpSection displayHelp={displayHelp} />
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
        {(currPageState === pageStates.analyzed &&
          currWordResult !== null) &&
          <PopUp
            content={<Pronounce word={currWordResult} />}
            closePopUp={closePopUp}
          />
        }
      </div>
      <a href="#help-section" style={{ display: "none" }} ref={linkToHelpSection}></a>
    </React.Fragment>
  );
}

export default AnalyzeSentences;

