import React, { useContext, useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useIoMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const notificationSound = new Audio("./notification.wav");
  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      notificationSound.play();
      setMessages([...messages, newMessage]);
    });
    return () => socket?.off("newMessage");
  }, [messages, setMessages, socket]);
};

export default useIoMessages;
