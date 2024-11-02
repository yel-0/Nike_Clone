import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/category/create", categoryData);
  return response.data;
};

const useCreateCategory = (option) => {
  return useMutation(createCategory, option);
};

export default useCreateCategory;
