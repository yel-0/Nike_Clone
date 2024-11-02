import { useMutation } from "react-query";
import axiosInstance from "@/api/axiosInstance";

// Function to call the API to remove a favorite
const removeFavorite = async (productId) => {
  const response = await axiosInstance.delete(`/favorite/remove/${productId}`);
  return response.data;
};

// Custom hook to use removeFavorite
export const useRemoveFavorite = () => {
  return useMutation(removeFavorite, {
    onSuccess: () => {
      alert("success");
    },
    onError: (error) => {
      console.error("Error removing favorite:", error);
      alert("error");
    },
  });
};
