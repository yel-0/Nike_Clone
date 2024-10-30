import React from "react";
import AdminItem from "@/Design/Admin/AdminItem";
import useAllProducts from "@/Hook/Product/useAllProducts";
const AdminProducts = () => {
  const { data: products, isLoading, isError, error } = useAllProducts(); // Use the hook

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (isError) {
    return <p>Error: {error.message}</p>; // Show error message
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <AdminItem key={product.id} product={product} />
      ))}
    </div>
  );
};

export default AdminProducts;
