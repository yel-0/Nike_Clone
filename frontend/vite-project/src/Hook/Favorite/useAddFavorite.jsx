import { useMutation } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const addFavorite = async (productId) => {
  const response = await axiosInstance.post("/favorite/add", { productId });
  return response.data;
};

export const useAddFavorite = () => {
  return useMutation(addFavorite, {
    onSuccess: (data) => {
      console.log("Product added to favorites:", data);
      alert("success");
    },
    onError: (error) => {
      console.error("Error adding product to favorites:", error);
      alert("error");
    },
  });
};
