import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useUpdateChatbotConfig = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.put("/chatbot/metadata", data);
      return res.data;
    },
  });
};

export const useTestChatbot = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/chatbot/test", data);
      return res.data.message;
    },
  });
};

export const useGetChatBotMetaData = () => {
    return useQuery({
        queryKey: ["get-chatbot-metadata"],
        queryFn: async () => {
            const res = await api.get('/chatbot/metadata')
            return res.data.metadata;
        }
    })
}
