import { useQuery } from "react-query";
import axiosInstance from "../../api/axiosInstance"; // Ensure this is your configured Axios instance

const fetchFilteredProducts = async (filters) => {
  const response = await axiosInstance.get("/filter", { params: filters });
  return response.data;
};

const useFilteredProducts = (filters) => {
  return useQuery(
    ["filteredProducts", filters],
    () => fetchFilteredProducts(filters),
    {
      enabled: !!filters, // Only run the query if filters are defined
    }
  );
};

export default useFilteredProducts;
