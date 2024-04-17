import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessages from "../../hooks/useGetMessages";
import useIoMessages from "../../hooks/useIoMessages";
const Messages = () => {
  const { messages, isLoading } = useGetMessages();
  const latestMessage = useRef();
  useIoMessages();
  useEffect(() => {
    latestMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!isLoading &&
        messages.length > 0 &&
        messages.map((message, idx) => {
          return (
            <div className="" ref={latestMessage} key={idx}>
              <Message key={idx} message={message} />
            </div>
          );
        })}
    </div>
  );
};

export default Messages;
