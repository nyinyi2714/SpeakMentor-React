import phonemeData from "../assets/phonemes";

function useFeedback() {
  const generalGuidance = "Listen to the pronunciation carefully and try to imitate the sound."
  const getFeedback = (phoneme) => {
    return phonemeData[phoneme]?.pronunciationGuidance ?? generalGuidance;
  }

  return ({
    getFeedback,
  });
}

export default useFeedback;