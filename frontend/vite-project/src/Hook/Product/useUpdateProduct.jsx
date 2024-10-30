// useUpdateProduct.js
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, formData }) => {
      const response = await axiosInstance.put(
        `/product/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
        alert("success");
      },
      onError: (error) => {
        console.error("Error updating product:", error);
        alert("error");
      },
    }
  );
};

export default useUpdateProduct;
