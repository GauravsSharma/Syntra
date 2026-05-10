import { create } from "zustand";

export const useConversationStore = create((set) => ({
    count: 0,
    sideBarConv:[],
    setCount: (count) => set({ count }),
    setSideBarConv: (sideBarConv) => set({ sideBarConv }),
    addSideBarConv: (conv) =>
        set((state) => ({ sideBarConv: [conv, ...state.sideBarConv] })),
    incCount: () =>
        set((state) => ({ count: state.count + 1 })),
    decCount: () =>
        set((state) => ({ count: state.count - 1 })),
}));