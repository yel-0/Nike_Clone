import { useMutation } from "react-query";
import axiosInstance from "@/api/axiosInstance";

const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/product/delete/${id}`);
  return response.data;
};

export const useDeleteProduct = (options) => {
  return useMutation(deleteProduct, options);
};
