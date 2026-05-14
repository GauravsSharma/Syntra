import { create } from "zustand";

export const useKnowledgeStore = create((set) => ({
  sources: [] || null,

  setSources: (sources) => set({ sources }),

  addSource: (source) =>
    set((state) => ({
      sources: [...state.sources, source],
    })),

  removeSource: (id) =>
    set((state) => ({
      sources: state.sources.filter(
        (source) => source.id !== id
      ),
    })),
}));