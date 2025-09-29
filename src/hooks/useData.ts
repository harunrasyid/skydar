import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export function useData() {
  const { data, isLoading } = useQuery({
    queryKey: ["states-all"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/states/all?lamin=34.5&lomin=-25.0&lamax=71.5&lomax=40.0`
      );

      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchInterval: 8000,
  });

  return {
    data,
    isLoading,
  };
}
