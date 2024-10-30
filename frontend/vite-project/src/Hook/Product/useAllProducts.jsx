import { useQuery } from "react-query";
import axiosInstance from "../../api/axiosInstance";
const fetchAllProducts = async () => {
  const response = await axiosInstance.get("/product/getAll");
  return response.data;
};

const useAllProducts = () => {
  return useQuery("allProducts", fetchAllProducts);
};

export default useAllProducts;
