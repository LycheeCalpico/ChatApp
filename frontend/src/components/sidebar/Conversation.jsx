import React, { useState, useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = (props) => {
  const { conversation } = props;
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === conversation._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);
  const [imageSrc, setImageSrc] = useState("");
  useEffect(() => {
    const getImage = async () => {
      const imageBase64 = Buffer.from(conversation.profilePic.data).toString(
        "base64"
      );
      // Set the imageSrc state to the data URL including the MIME type for PNG
      setImageSrc(`data:image/png;base64,${imageBase64}`);
    };
    getImage();
  }, [conversation]);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-blue-100 rounded p-2 py-1 cursor-pointer ${
          isSelected ? `bg-pink-200` : ""
        }`}
        onClick={(e) => setSelectedConversation(conversation)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={imageSrc} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold text-slate-700">{conversation.username}</p>
            <span className="text-xl">🎃</span>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
