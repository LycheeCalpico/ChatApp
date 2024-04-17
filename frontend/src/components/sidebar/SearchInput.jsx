import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetConversations from "../../hooks/useGetConversations";
import useConversation from "../../zustand/useConversation";

const SearchInput = () => {
  const [input, setInput] = useState("");
  const { filteredConversation, setFilteredConversation } = useConversation();
  const { conversations } = useGetConversations();
  const handleSubmit = async (e) => {
    console.log(input);
    e.preventDefault();
    setFilteredConversation(input);
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="搜索对话..."
        className="input input-bordered rounded-full"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-pink-300 text-white">
        <FaSearch />
      </button>
    </form>
  );
};

export default SearchInput;
