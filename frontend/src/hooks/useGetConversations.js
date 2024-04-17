import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
  const [isLoding, setIsLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    const getConversations = async () => {
      try {
        const res = await fetch("/api/users", {
          method: "GET",
          headers: { "Content-type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    getConversations();
  }, []);
  return { isLoding, conversations };
};

export default useGetConversations;
