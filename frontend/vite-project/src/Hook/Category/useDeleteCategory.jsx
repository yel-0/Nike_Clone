import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const deleteCategory = async (id) => {
  const response = await axiosInstance.delete(`/category/delete/${id}`);
  return response.data;
};

const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      alert("success");
    },
    onError: (error) => {
      console.error("Error deleting category:", error);
    },
  });
};

export default useDeleteCategory;
