// useUpdateProduct.js
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/hooks/use-toast";
const useUpdateProduct = () => {
  const { toast } = useToast();

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
        toast({
          title: "Product Update successfully",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Something went wrong",
        });
      },
    }
  );
};

export default useUpdateProduct;
