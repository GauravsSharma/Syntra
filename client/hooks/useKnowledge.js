import api from "@/lib/axios";
import { useKnowledgeStore } from "@/stores/useKnowledgeStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddKnowledge = () => {
  const { addSource } = useKnowledgeStore();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/knowledge", data);
      addSource(res.data.source);
      return res.data;
    },
  });
};
export const useGetKnowledgeSources = (metadata) => {
    const { setSources } = useKnowledgeStore()
    return useQuery({
        queryKey: ["get-knowledge-sources", metadata],
        queryFn: async () => {
            const res = await api.get('/api/knowledge')
            setSources(res.data.data)
            return res.data.data;
        }
    })
}
export const useDeleteKnowledgeSource = () => {
  const { removeSource } = useKnowledgeStore();

  return useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(
        `/api/knowledge/${id}`
      );
      return res.data;
    },

    onSuccess: (_, id) => {
      removeSource(id);
    },
  });
};