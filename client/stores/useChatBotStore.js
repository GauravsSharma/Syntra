import { create } from "zustand";

export const useChatBottore = create((set) => ({
    metadata: null,
    setMeta: (sources) => set({ sources }),
}));