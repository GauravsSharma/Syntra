import { create } from "zustand"; 

export const useSectionStore = create((set) => ({
  sections: [],
  setSections: (sections) => set({ sections }),
  addSection: (section) => set((state) => ({ sections: [...state.sections, section] })),
  deleteSection: (id) => set((state) => ({ sections: state.sections.filter((s) => s.id !== id) })),
}));