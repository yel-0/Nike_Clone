import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "@/api/axiosInstance";
import { useToast } from "@/hooks/use-toast";

// Function to call the API to remove a favorite
const removeFavorite = async (productId) => {
  const response = await axiosInstance.delete(`/favorite/remove/${productId}`);
  return response.data;
};

// Custom hook to use removeFavorite
export const useRemoveFavorite = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation(removeFavorite, {
    onSuccess: () => {
      queryClient.invalidateQueries("favorites");
      toast({
        title: "Remove item successfully",
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
