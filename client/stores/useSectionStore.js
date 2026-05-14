import { create } from "zustand"; 

export const useSectionStore = create((set) => ({
  sections: [],

  setSections: (sections) => set({ sections }),

  addSection: (section) =>
    set((state) => ({
      sections: [section, ...state.sections],
    })),

  deleteSection: (id) =>
    set((state) => ({
      sections: state.sections.filter(
        (s) => s.id !== id
      ),
    })),

  updateSection: (updatedSection) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === updatedSection.id
          ? updatedSection
          : section
      ),
    })),
}));