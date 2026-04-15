import { create } from "zustand"; 

export const useUserStore = create((set) => ({
  user: null,
  metadata:null,
  setMetadata: (metadata) => set({ metadata }),
  setUser: (user) => set({ user }),
}));