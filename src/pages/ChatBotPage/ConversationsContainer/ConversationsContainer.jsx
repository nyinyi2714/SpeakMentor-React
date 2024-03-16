import "./ConversationsContainer.css";

export default function ConversationsContainer({ conversations, restoreConversation, isOpen }) {

  const Conversation = ({conversation, restoreConversation}) => {
    const { id, title } = conversation;
    return (
      <div className="conversation">
        <button id={id} onClick={restoreConversation}>{title}</button>
      </div>
    );
  };

  return(
    <div className={`conversations-container ${isOpen && 'open'}`}>
      <h3>Saved Conversations</h3>
      {conversations.length > 0 && 
        conversations.map((conversation, index) => 
          <Conversation key={index} conversation={conversation} restoreConversation={restoreConversation} />
        )
      }
      {conversations.length <= 0 && 
        <div>
          No Saved Conversations
        </div>
      }
    </div>
  );
}