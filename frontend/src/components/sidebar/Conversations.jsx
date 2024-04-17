import React from "react";
import Conversation from "./Conversation";
import useGetConversation from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

const Conversations = () => {
  const { isLoding, conversations } = useGetConversation();
  const { filteredConversation, setFilteredConversation } = useConversation();
  return (
    <div className="py-2 flex flex-col overflow-auto mb-5 pr-6">
      {!isLoding ? (
        !filteredConversation ? (
          conversations.map((conversation) => {
            return (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            );
          })
        ) : (
          conversations
            .filter(
              (conversation) =>
                conversation.username
                  .toLowerCase()
                  .indexOf(filteredConversation.toLowerCase()) !== -1
            )
            .map((conversation) => (
              <Conversation
                key={conversation._id}
                conversation={conversation}
              />
            ))
        )
      ) : (
        <span className="loading loading-spinner"></span>
      )}
    </div>
  );
};

export default Conversations;
