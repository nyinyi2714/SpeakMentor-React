import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function useSpeechRecongnizer() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return console.error("Browser doesn't support speech recognition");
  }

  const startRecording = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  const stopRecording = () => {
    SpeechRecognition.stopListening();
  };

  return ({
    startRecording,
    stopRecording,
    resetTranscript,
    listening,
    transcript
  })
}

export default useSpeechRecongnizer;