import config from "../config";

function useBackend() {
  const getLaymanPhonetic = async (word) => {
    console.log("Fetching layman's phonetic for", word);
    try {
      let response = await fetch(`${config.backendUrl}/search`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          "search": word, 
        }),
      });
      if (response.ok) {
        response = await response.json();
        return response[0].laymans;
      } else {
        console.error("Error fetching layman's phonetic.");
      }
    } catch (error) {
      console.error("Error fetching layman's phonetic:", error);
    }
  };

  const getFeedback = async (speechSuperData, word) => {
    try {
      let response = await fetch(`${config.backendUrl}/feedback`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          word: word,
          response: speechSuperData 
        }),
      });

      if (response.ok) {
        response = await response.json();
        console.log(response);
        return response;
      } else {
        console.error("Server Error fetching feedback from backend.");
      }
    } catch (error) {
      console.error("Frontend Error fetching feedback from backend: ", error);
    }
  };

  return({
    getLaymanPhonetic,
    getFeedback,
  });
}

export default useBackend;