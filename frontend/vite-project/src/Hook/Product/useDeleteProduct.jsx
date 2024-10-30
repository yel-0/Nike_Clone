import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/product/delete/${id}`);
  return response.data;
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(deleteProduct, {
    onSuccess: () => {
      alert("success");
      queryClient.invalidateQueries("products");
    },
    onError: (error) => {
      alert("fail");
      console.error("Error deleting product:", error);
    },
  });
};
