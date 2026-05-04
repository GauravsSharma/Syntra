import { create } from "zustand";

export const useConversationStore = create((set) => ({
    count: 0,

    setCount: (count) => set({ count }),

    incCount: () =>
        set((state) => ({ count: state.count + 1 })),

    decCount: () =>
        set((state) => ({ count: state.count - 1 })),
}));