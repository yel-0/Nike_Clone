import { useMutation } from "react-query";
import axiosInstance from "../../api/axiosInstance"; // Make sure this is your configured Axios instance

const createProduct = async (productData) => {
  const response = await axiosInstance.post("/product/create", productData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const useCreateProduct = () => {
  return useMutation(createProduct);
};

export default useCreateProduct;
