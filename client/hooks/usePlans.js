import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCurrentPlan = () => {
    return useQuery({
        queryKey: ["get-current-plan"],
        queryFn: async () => {
            const res = await api.get('/api/plans/current')
            return res.data.plan    ;
        }
    })
}
export const useUpgradePlan = () => {
   return useMutation({
    mutationFn: async (plan) => {
      const res = await api.post(`/api/plans/upgrade`, { plan});
      return res.data.order;
    },
  });
}
