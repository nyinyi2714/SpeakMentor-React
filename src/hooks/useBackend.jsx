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
        //console.log(response);
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
      let response = await fetch(`${config.backendUrl}/api/questionnaire`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`
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
        //console.log(response)
        response = await response.json();
        return response;
      } else {
        console.error("Error retreiving saved conversations.");
      }
    } catch (error) {
      console.error("Error retreiving saved conversations:", error);
    }
  }

  const updateConversation = async (conversation) => {
    try {
      console.log("Updating conversation:", conversation);
      const data = {
        messages: conversation,
      };
      let response = await fetch(`${config.backendUrl}/api/update-chatbot-conversations`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data)
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating a conversation:", error);
    }
  }

  const saveConversation = async (conversation) => {
    try {

      console.log("Saving conversation:", conversation);

      const data = {
        title: conversation.title,
        messages: conversation.messages,
        thread_id: localStorage.getItem("thread_id"),
      };

      let response = await fetch(`${config.backendUrl}/api/save-chatbot-conversations`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data)
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
    updateConversation
  });
}

export default useBackend;