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

  const submitBackgroundQuestions = async (answers) => {
    try {
      let response = await fetch(`${config.backendUrl}/questions`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`,
      },
        body: JSON.stringify({ 
          "answers": answers, 
        }),
      });

      if (response.ok) {
        response = await response.json();
        console.log(response);
        return true;
      } else {
        console.error("Error submitting background questions' answers.");
      }
    } catch (error) {
      console.error("Error submitting background questions' answers:", error);
    }
  };

  const getSavedConversations = async () => {
    try {
      let response = await fetch(`${config.backendUrl}/api/get-chatbot-conversations`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        response = await response.json();
        return response;
      } else {
        console.error("Error retreiving saved conversations.");
      }
    } catch (error) {
      console.error("Error retreiving saved conversations:", error);
    }
  }

  const saveConversation = async (conversation) => {
    try {
      let response = await fetch(`${config.backendUrl}/api/save-chatbot-conversations`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(conversation)
      });

      if (response.ok) {
        response = await response.json();
        return true;
      } else {
        console.error("Error saving a new conversation.");
        return false;
      }
    } catch (error) {
      console.error("Error saving a new conversation:", error);
    }
  }

  return({
    getLaymanPhonetic,
    submitBackgroundQuestions,
    getSavedConversations,
    saveConversation,
  });
}

export default useBackend;