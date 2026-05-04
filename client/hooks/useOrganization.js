import api from "@/lib/axios";
import { useTeamMemberStore } from "@/stores/useTeamMemberStore";
import { useConversationStore } from "@/stores/useConversationStore";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useTestChatbot = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/organization", data);
      return res.data.message;
    },
  });
};
export const useGetOrganization = () => {
  return useQuery({
    queryKey: ["get-organization"],
    queryFn: async () => {
      const res = await api.get('/api/organization')
      return res.data.organization;
    }
  })
}
export const useAddMember = () => {
  const { addMember } = useTeamMemberStore()
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/organization/members", data);
      addMember(res.data.member)
      return res.data.message;
    },
  });
}
export const useGetMembers = () => {
  const { setMembers } = useTeamMemberStore();

  return useQuery({
    queryKey: ["get-teammembers"],
    queryFn: async () => {
      const res = await api.get("/api/organization/members");
      const members = res.data?.team_members ?? []; // ✅ fallback
      setMembers(members);
      return members;
    },
  });
};
export const useGetConversation = (chatbotId) => {

  return useQuery({
    queryKey: ["get-conversations"],
    queryFn: async () => {
      const res = await api.get(`/api/conversation/${chatbotId}`);
      const conversations = res.data.conversations; // ✅ fallback
      return conversations;
    },
    enabled: !!chatbotId,
    refetchInterval: 10000
  });
};

export const useGetConversationById = (id) => {

  return useQuery({
    queryKey: ["get-conversation-by-id", id],
    queryFn: async () => {
      const res = await api.get(`/api/conversation/${id}/chatbot`);
      const conversations = res.data.conversations; // ✅ fallback
      return conversations;
    },
    enabled: !!id
  });
};

export const useUpdateOcnversationStatus = () => {
  return useMutation({
    mutationFn: async ({ data, id }) => {
      const res = await api.patch(`/api/conversation/${id}/chatbot`, data);
      return res.data.message;
    },
  });
}
export const useSendMessageToAgent = () => {
  return useMutation({
    mutationFn: async ({ message, token }) => {
      const res = await api.post(`/api/conversation/chat/agent`, { message }, {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ attach token
        },
      });
      return res.data.message;
    },
  });
}

export const useSendMessageToUser = () => {
  return useMutation({
    mutationFn: async ({ message, id }) => {
      const res = await api.post(`/api/conversation/chat/${id}`, { message });
      return res.data.message;
    },
  });
}
export const useGetClientConversationById = (token) => {
  return useQuery({
    queryKey: ["get-client-conversation"],
    queryFn: async () => {
      const res = await api.get(`/api/conversation/client`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ attach token
          },
        }
      );
      const conversations = res.data.conversations; // ✅ fallback
      return conversations;
    },
    enabled: !!token,
  });
}
export const useGetEscalatedConvCount = (id) => {
  const { setCount } = useConversationStore();
  return useQuery({
    queryKey: ["get-client-conversation", id],
    queryFn: async () => {
      const res = await api.get(`/api/organization/conversations/escalated/count/${id}`);
      const count = res.data.count;
      setCount(count) // ✅ fallback
      return count;
    },
    enabled: !!id,
  });
}