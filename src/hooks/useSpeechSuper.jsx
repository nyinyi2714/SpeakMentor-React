import { useState, useEffect } from 'react';
import config from "../config";

function useSpeechSuper() {
  const perfectScore = 90;

  const sendAudioToSpeechSuperAPI = async (audioBlob, word, isSingleWord) => {
    // Create a FormData object
    const formData = new FormData();
    // Append the audio blob to the form data. The 'audio' is the field name for the server to access the audio file.
    formData.append('audio', new Blob([audioBlob], { type: "audio/mp3" }), 'audio.mp3');
    // Append other fields to the form data
    formData.append('word', word);
    formData.append('isSingleWord', isSingleWord);

    let response;

    try {
      response = await fetch(config.backendUrl + "/process_audio", {
        method: "POST",
        // The Content-Type header is not needed here, 
        // as the browser will automatically set it with the correct boundary for multipart/form-data
        body: formData
      });

      if (response.ok) {
        response = await response.json();
        console.log(response);
        return response;
      } else {
        return new Error("Error fetching speech super result.");
      }
    } catch (error) {
      console.error("Error fetching speech super result:", error);
    }


  };

  const generateResult = (speechSuperResult) => {
    if (!speechSuperResult) return;
    const letters = [];
    const dot = <span className="pronounce__dot">.</span>;
    speechSuperResult.laymans.forEach((layman, index) => {
      letters.push(
        <span
          key={index}
          style={{ color: chooseColorsForScores(layman.score) }}
        >
          {layman.phrase}
          {index < speechSuperResult.laymans.length - 1 ? dot : null}
        </span>
      );
    });

    return letters;
  };

  const generateFeedback = (speechSuperResult) => {
    if (!speechSuperResult) return;
    const feedbacks = [];

    const feedbackContainer = (phrase, suggestion, index) => {
      return (
        <div className="pronounce__feedback box-shadow" key={index}>
          <div className="feedback__item">
            <h3>{phrase}</h3>
            <p>{suggestion}</p>
          </div>
        </div>
      );
    };
    speechSuperResult.feedbacks.forEach((item, index) => {
      feedbacks.push(feedbackContainer(item.phrase, item.suggestion, index));
    })

    return feedbacks;
  };

  const chooseColorsForScores = (score) => {
    if (score >= perfectScore) {
      return "#00d100"; // Green
    } else if (score >= perfectScore - 20) {
      return "#FFAA00"; // Yellow-Orange
    } else {
      return "#FF0000"; // Red
    }
  };

  const checkIsPerfectScore = (speechSuperResult) => {
    if (!speechSuperResult) return false;
    return speechSuperResult.laymans.every(layman => layman.score >= perfectScore);
  };

  return {
    sendAudioToSpeechSuperAPI,
    generateResult,
    generateFeedback,
    chooseColorsForScores,
    checkIsPerfectScore
  };

}

export default useSpeechSuper;