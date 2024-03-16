import config from "../config";

function useBackend() {
  const getLaymanPhonetic = async (word) => {
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
        console.log(response);
        return response[0].laymans;
      } else {
        console.error("Error fetching layman's phonetic.");
      }
    } catch (error) {
      console.error("Error fetching layman's phonetic:", error);
    }
  };

  return({
    getLaymanPhonetic,
  });
}

export default useBackend;