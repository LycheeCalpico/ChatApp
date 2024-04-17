import { create } from "zustand";

const useConversation = create((set) => ({
  // basically same thing with useState
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
  filteredConversation: "",
  setFilteredConversation: (filteredConversation) =>
    set({ filteredConversation }),
}));

export default useConversation;
