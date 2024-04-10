import React, { useEffect, useState, useRef } from "react";

import { useSpeechRecognizer, useGoogleTTS, useSpeechSuper } from "../../hooks";

import { PopUp, Spinner, DisplaySteps } from "./index";
import { Pronounce, Navbar } from "../../components";

import resetSvg from '../../assets/reset.svg';

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
    analyzed: "Analysis",
  };

  const currStep = {
    "Record": 1,
    "Edit": 2,
    "Analyze": 2,
    "Analysis": 3,
  }

  const messages = {
    recordNow: "Please record yourself before going to next step.",
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
    if (transcript.length <= 0) setEditedTranscript("Click the microphone icon to start recording.");
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
      if (!userRecording.current) return;
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

  const generateResultForSentences = (resultData) => {
    if (!resultData) return;
    let words = [];

    const stripNonLetters = (word) => {
      // function defined to strip non-letter characters
      return word.replace(/[^a-zA-Z]+/g, '');
    };

    const convertSentenceIntoWords = (sentence, wordsArray) => {
      sentence.forEach((wordData, index) => {
        const overallScore = wordData?.PronunciationAssessment.AccuracyScore ?? 0;
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
      <Navbar />
      <div className="analyze-sentences">
        <DisplaySteps currentStep={currStep[currPageState]} />
        <div className="analyze-sentences__analyzer">
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
                  className={`btn analyze-sentences_icon ${listening && 'border-red'}`}
                >
                  {listening ?
                    <span className="red-square" /> :
                    <box-icon type="solid" name="microphone" size="20px" color="#4285f4" />
                  }
                </button>

                <button
                  className="btn analyze-sentences_icon"
                  onClick={nextPageState}
                  disabled={transcript.length <= 0 || isRecording}
                >
                  <box-icon name='right-arrow-alt' color='#4285f4' />
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

                {currPageState !== pageStates.analyzed &&
                  <button
                    className="btn analyze-sentences_icon"
                    onClick={analyze}
                    disabled={transcript.length <= 0 || isRecording}
                  >
                    <box-icon name='right-arrow-alt' color='#4285f4' />
                  </button>
                }

              </>
            }
            <button
              className="btn analyze-sentences_icon reset"
              onClick={prevPageState}
              disabled={isRecording}
            >
              <img src={resetSvg} />
            </button>
          </div>
        </div>

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
    </React.Fragment>
  );
}

export default AnalyzeSentences;



