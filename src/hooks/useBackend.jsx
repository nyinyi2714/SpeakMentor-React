import config from "../config";

function useBackend() {
  const getLaymanPhonetic = async (word) => {
    try {
      let response = await fetch(`${config.backendUrl}/search`, {
        method: "POST",
        body: { 
          search: word 
        },
      });

      response = await response.json();
      if (response.ok) {
        // TODO: check the backend json key (laymanPhonetic)
        console.log(response);
        return response.laymans;
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