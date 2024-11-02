import { useQuery } from "react-query";
import axiosInstance from "@/api/axiosInstance";
// Custom hook to fetch latest products by category name
const useLatestProductsByCategoryName = (categoryName) => {
  return useQuery(
    ["latestProductsByCategory", categoryName],
    async () => {
      const { data } = await axiosInstance.get("/product/by/category", {
        params: { categoryName },
      });
      return data;
    },
    {
      enabled: !!categoryName, // Only fetch if categoryName is provided
      keepPreviousData: true, // Keeps previous data while new data is loading
      staleTime: 5 * 60 * 1000, // 5 minutes stale time for caching
    }
  );
};

export default useLatestProductsByCategoryName;
