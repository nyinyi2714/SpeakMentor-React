import "./ConversationsContainer.css";

export default function ConversationsContainer({ conversations }) {

  const Conversation = (title) => {
    return (
      <div className="conversation">
        <h3>{title}</h3>
      </div>
    );
  };

  return(
    <div className="conversations-container">
      {conversations.length > 0 && 
        conversations.map(conversation => <Conversation title={conversation.title} />)
      }
      {conversations.length <= 0 && 
        <div>
          No Saved Conversations
        </div>
      }
    </div>
  );
}