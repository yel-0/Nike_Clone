import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/delete/${id}`);
  return response.data;
};

const useDeleteCategory = (option) => {
  return useMutation(deleteCategory, option);
};

export default useDeleteCategory;
