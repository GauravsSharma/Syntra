import { create } from "zustand";

export const useKnowledgeStore = create((set) => ({
    sources: [] | null,
    setSources: (sources) => set({ sources }),
}));