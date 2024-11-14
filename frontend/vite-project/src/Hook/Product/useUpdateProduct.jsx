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
          title: "Product Updated Successfully",
          description: "Your product details have been saved and updated.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Update Failed",
          description:
            "We encountered an issue while updating your product. Please try again.",
        });
      },
    }
  );
};

export default useUpdateProduct;
