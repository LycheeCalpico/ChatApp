import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";

const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedConversation } = useConversation();
  const logout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setSelectedConversation(null);
      setAuthUser(null);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, logout };
};

export default useLogout;
