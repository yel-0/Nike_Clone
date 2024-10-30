import { useQuery } from "react-query";
import axiosInstance from "../../api/axiosInstance"; // Ensure this is your configured Axios instance

// Function to fetch product by ID
const fetchProductById = async (id) => {
  const response = await axiosInstance.get(`/product/${id}`);
  return response.data;
};

// Custom hook
const useProductById = (id) => {
  return useQuery(["product", id], () => fetchProductById(id), {
    enabled: !!id, // Only run query if id is provided
  });
};

export default useProductById;
