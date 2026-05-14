import api from "@/lib/axios";
import { useSectionStore } from "@/stores/useSectionStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useAddSection = () => {
    const { addSection } = useSectionStore();
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/section", data);
      addSection(res.data.data);
      return res.data;
    },
  });
};
export const useGetSections = (metadata) => {
    const { setSections } = useSectionStore()
    return useQuery({
        queryKey: ["get-sections", metadata],
        queryFn: async () => {
            const res = await api.get('/api/section')
            setSections(res.data.data)
            return res.data.data;
        }
    })
}
export const useDeleteSection = () => {
    const { deleteSection } = useSectionStore();
    return useMutation({
        mutationFn: async (id) => {
            const res = await api.delete(`/api/section/${id}`);
            deleteSection(id);
            return res.data;
        },
    });
}

export const useToggleSectionStatus = () => {
  const { updateSection } = useSectionStore();

  return useMutation({
    mutationFn: async (sectionId) => {
      const res = await api.patch(`/api/section/${sectionId}`);
      updateSection(res.data.section)
      return res.data;
    },
  });
};

