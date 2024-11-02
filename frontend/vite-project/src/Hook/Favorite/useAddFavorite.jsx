import { useMutation } from "react-query";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/hooks/use-toast";
const addFavorite = async (productId) => {
  const response = await axiosInstance.post("/favorite/add", { productId });
  return response.data;
};

export const useAddFavorite = () => {
  const { toast } = useToast();

  return useMutation(addFavorite, {
    onSuccess: (data) => {
      toast({
        title: "Add to favorite successfully",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });
};
