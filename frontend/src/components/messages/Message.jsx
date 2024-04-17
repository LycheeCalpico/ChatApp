import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/useConversation";
const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const messageFromMe = message.senderId === authUser._id;
  const { selectedConversation } = useConversation();
  const chatTime = dateConvertor(message.createdAt);
  return (
    <div className={`chat ${messageFromMe ? "chat-end" : "chat-start"}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={
              messageFromMe
                ? `data:image/png;base64,${Buffer.from(
                    authUser.profilePic.data
                  ).toString("base64")}`
                : `data:image/png;base64,${Buffer.from(
                    selectedConversation.profilePic.data
                  ).toString("base64")}`
            }
          />
        </div>
      </div>
      <div className="chat-bubble text-slate-700 bg-pink-200 bg-opacity-80">
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {chatTime}
      </div>
    </div>
  );
};

const dateConvertor = (str) => {
  const date = new Date(str);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};
export default Message;
