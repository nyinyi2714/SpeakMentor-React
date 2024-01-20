import config from "../config";

function useDictionaryAPI() {

  const checkWord = async (word) => {
    try {
      let response = await fetch(config.dictionaryAPI + word);
      response = await response.json();
      if(response.length > 0 && response[0].hasOwnProperty("word")) {
        return true;
      } 
      return false;

    } catch (error) {
      return false;
    }
  };

  return {
    checkWord,
  };
}

export default useDictionaryAPI;