import React from "react";
import AdminItem from "@/Design/Admin/AdminItem";
const products = [
  { id: 1, name: "Nike Air Max", price: "$150" },
  { id: 2, name: "Adidas Ultraboost", price: "$180" },
  { id: 3, name: "Puma RS-X", price: "$120" },
  { id: 4, name: "New Balance 574", price: "$100" },
  { id: 5, name: "Jordan 1", price: "$160" },
  { id: 6, name: "Converse Chuck Taylor", price: "$70" },
  { id: 7, name: "Asics Gel-Kayano", price: "$140" },
  { id: 8, name: "Vans Old Skool", price: "$60" },
  { id: 9, name: "Reebok Club C", price: "$85" },
  { id: 10, name: "Under Armour HOVR", price: "$130" },
];

const AdminProductsCategory = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {products.map((product) => (
        <AdminItem key={product.id} name={product.name} price={product.price} />
      ))}
    </div>
  );
};

export default AdminProductsCategory;
