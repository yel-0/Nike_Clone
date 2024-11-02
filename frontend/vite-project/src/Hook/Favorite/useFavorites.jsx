// src/hooks/useFavorites.js
import { useQuery } from "react-query";
import axiosInstance from "@/api/axiosInstance";
const fetchFavorites = async () => {
  const response = await axiosInstance.get("/favorite/get");
  console.log(response.data);

  return response.data;
};

export const useFavorites = () => {
  return useQuery("favorites", fetchFavorites);
};
