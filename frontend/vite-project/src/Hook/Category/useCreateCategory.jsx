import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const createCategory = async (categoryData) => {
  const response = await axiosInstance.post("/category/create", categoryData);
  return response.data;
};

const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default useCreateCategory;
