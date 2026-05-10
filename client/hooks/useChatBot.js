import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateChatbotConfig = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.put("/api/chatbot/metadata", data);
      return res.data;
    },
  });
};

export const useTestChatbot = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/chatbot/test", data);
      return res.data.message;
    },
  });
};

export const useGetChatBotMetaData = (metadata) => {
    return useQuery({
        queryKey: ["get-chatbot-metadata",metadata],
        queryFn: async () => {
            const res = await api.get('/api/chatbot/metadata')
            return res.data.metadata;
        }
    })
}

export const useChatToBot = () => {
  return useMutation({
    mutationFn: async ({ data, token }) => {
      if (!token) {
        throw new Error("Token is required");
      }

      const res = await api.post(
        "/api/widget/chat",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    },
  });
};
