import React, { useState } from "react";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { selectedConversation, messages, setMessages } = useConversation();
  console.log("here is selectedConversation", selectedConversation);
  const sendMessage = async (message) => {
    console.log(message);
    setIsLoading(true);
    try {
      const res = await fetch(`/api/message/send/${selectedConversation._id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return { sendMessage, isLoading };
};

export default useSendMessage;
