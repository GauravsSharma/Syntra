import { create } from "zustand";

export const useTeamMemberStore = create((set) => ({
  members: [],

  setMembers: (members) =>
    set(() => ({
      members,
    })),

  addMember: (member) =>
    set((state) => ({
      members: [member, ...state.members],
    })),

  removeMember: (id) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== id),
    })),
}));