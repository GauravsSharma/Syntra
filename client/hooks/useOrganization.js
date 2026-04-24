import api from "@/lib/axios";
import { useTeamMemberStore } from "@/stores/useTeamMemberStore";
import { useMutation } from "@tanstack/react-query";

export const useTestChatbot = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/organization", data);
      return res.data.message;
    },
  });
};
export const useGetOrganization = () => {
  return useQuery({
    queryKey: ["get-organization"],
    queryFn: async () => {
      const res = await api.get('/organization')
      return res.data.organization;
    }
  })
}
export const useAddMember = () => {
  const { addMember } = useTeamMemberStore()
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/organization/members/add", data);
      addMember(res.data.user)
      return res.data.message;
    },
  });
}