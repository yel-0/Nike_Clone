import { useQuery } from "react-query";
import axiosInstance from "@/api/axiosInstance";
// Custom hook to fetch admin status
const useAdminStatus = () => {
  return useQuery(
    "adminStatus",
    async () => {
      const response = await axiosInstance.get(
        "/user/current-user/admin-status"
      );
      return response.data.isAdmin; // Return the isAdmin status
    },
    {
      enabled: !!localStorage.getItem("token"),
      refetchOnWindowFocus: false,
    }
  );
};

export default useAdminStatus;
