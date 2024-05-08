import { create } from "zustand";
import { devtools } from "zustand/middleware";

const store = (set: any) => ({
  selectedChat: {},
  setSelectedChat: (chat: any) => set((state: any) => ({ selectedChat: chat }))
});

export const useAppStore = create(devtools(store));
