import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async ({ username, password }) => {
    const success = handleInputError({ username, password });
    if (!success) {
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, login };
};

export default useLogin;

const handleInputError = ({ username, password }) => {
  if (!password || !username) {
    toast.error("Please fill all the fields ");
    return false;
  }
  if (password.length < 6) {
    toast.error("The password length must be at least 6 digits");
    return false;
  }
  return true;
};
