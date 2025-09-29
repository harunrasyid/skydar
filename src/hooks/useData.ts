import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axios";

export function useData() {
  const { data, isLoading } = useQuery({
    queryKey: ["states-all"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/states/all?lamin=48.0&lomin=11.0&lamax=50.0&lomax=15.0`
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
