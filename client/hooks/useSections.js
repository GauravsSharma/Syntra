import api from "@/lib/axios";
import { useSectionStore } from "@/stores/useSectionStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddSection = () => {
    const { addSection } = useSectionStore();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/section", data);
      addSection(res.data.data);
      return res.data;
    },
  });
};
export const useGetSections = () => {
    const { setSections } = useSectionStore()
    return useQuery({
        queryKey: ["get-sections"],
        queryFn: async () => {
            const res = await api.get('/section')
            setSections(res.data.data)
            return res.data.data;
        }
    })
}
export const useDeleteSection = () => {
    const { deleteSection } = useSectionStore();
    return useMutation({
        mutationFn: async (id) => {
            const res = await api.delete(`/section/${id}`);
            deleteSection(id);
            return res.data;
        },
    });
}