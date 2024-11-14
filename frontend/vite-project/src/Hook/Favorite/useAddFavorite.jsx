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
        title: "Added to favorites",
        description: "Your item was successfully added to your favorites!",
      });
    },
    onError: (error) => {
      toast({
        title: "Something went wrong",
        description: "Could not add to favorites. Please try again later.",
        variant: "destructive",
      });
    },
  });
};
