import api from "@/lib/axios";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddKnowledge = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/knowledge", data);
      return res.data;
    },
  });
};
export const useGetKnowledgeSources = () => {
    const { setSources } = useKnowledgeStore()
    return useQuery({
        queryKey: ["get-knowledge-sources"],
        queryFn: async () => {
            const res = await api.get('/knowledge')
            setSources(res.data.data)
            return res.data.data;
        }
    })
}