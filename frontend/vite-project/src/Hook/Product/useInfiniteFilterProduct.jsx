import { useInfiniteQuery } from "react-query";
import axiosInstance from "@/api/axiosInstance";

// Fetch function for filtered products with pagination
const fetchFilteredProducts = async ({ pageParam = 1, queryKey }) => {
  const [, filters] = queryKey;
  const response = await axiosInstance.get("/product/getFilteredProducts", {
    params: {
      ...filters,
      page: pageParam,
    },
  });
  return response.data;
};

// Custom hook for infinite loading of filtered products
const useInfiniteFilterProduct = (filters) => {
  return useInfiniteQuery(
    ["infiniteFilterProduct", filters],
    fetchFilteredProducts,
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length > 0 ? allPages.length + 1 : undefined;
      },
      keepPreviousData: true,
    }
  );
};

export default useInfiniteFilterProduct;
