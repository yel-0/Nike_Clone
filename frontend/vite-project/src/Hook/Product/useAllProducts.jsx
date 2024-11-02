import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../api/axiosInstance";

// Fetch function that expects an object with page and limit
const fetchAllProducts = async ({ pageParam = 1, queryKey }) => {
  const [, { limit }] = queryKey;
  const response = await axiosInstance.get("/product/getAll", {
    params: { page: pageParam, limit }, // Pass pageParam as page and limit as query parameters
  });

  return response.data;
};

const useAllProducts = (limit = 10) => {
  return useInfiniteQuery(["allProducts", { limit }], fetchAllProducts, {
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage?.length === limit) {
        return allPages.length + 1; // Return the next page number
      }
      return undefined; // No more pages to fetch
    },
    keepPreviousData: true,
  });
};

export default useAllProducts;
