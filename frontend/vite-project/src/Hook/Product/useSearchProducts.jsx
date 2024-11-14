import { useQuery } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const searchProducts = async (name) => {
  const { data } = await axiosInstance.get(`/product/products/search`, {
    params: { name },
  });
  return data;
};

export const useSearchProducts = (name) => {
  return useQuery(["searchProducts", name], () => searchProducts(name), {
    enabled: !!name, // Only fetch when name is not empty or null
  });
};
