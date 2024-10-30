import { useQuery } from "react-query";
import axiosInstance from "../../api/axiosInstance";

const fetchCategories = async () => {
  const response = await axiosInstance.get("/category/categories");
  return response.data;
};

const useFetchCategories = () => {
  return useQuery(["categories"], fetchCategories);
};

export default useFetchCategories;
