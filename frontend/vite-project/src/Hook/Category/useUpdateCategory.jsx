import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const updateCategory = async ({ id, name }) => {
  const response = await axiosInstance.put(`/category/update/${id}`, { name });
  return response.data;
};

const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(updateCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default useUpdateCategory;
