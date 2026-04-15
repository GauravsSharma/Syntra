import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";

export const useAddKnowledge = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/knowledge", data);
      return res.data;
    },
  });
};