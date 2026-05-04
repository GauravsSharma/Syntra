import api from "@/lib/axios"
import { useUserStore } from "@/stores/useUserStore"
import { useMutation, useQuery } from "@tanstack/react-query"


export const useGetUser = () => {
    const { setUser } = useUserStore()
    return useQuery({
        queryKey: ["get-user"],
        queryFn: async () => {
            const res = await api.get('/api/auth')
            setUser(res.data.user)
            return res.data.user;
        }
    })
}
export const useSendMetadata = () => {
  return useMutation({
    mutationFn: async (data) => {
      const res = await api.post("/api/auth/metadata", data);
      return res.data;
    },
  });
};

export const useGetMetaData = ()=>{
    const { setMetadata } = useUserStore()
    return useQuery({
        queryKey: ["get-metadata"],
        queryFn: async () => {
            const res = await api.get('/api/auth/metadata')
            setMetadata(res.data.metadata)
            return res.data.metadata;
        }
    })
}