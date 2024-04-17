import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputError({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) return;
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, signup };
};

export default useSignup;

// frontend handle inappropriate data
function handleInputError({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("passwords do not match");
    return false;
  }
  if (password.length < 6) {
    toast.error("password length must be at least 6 digits");
    return false;
  }
  return true;
}
