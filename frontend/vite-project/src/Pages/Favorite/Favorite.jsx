import Sneaker from "@/Design/Shared/Item";
import React from "react";

const Favorite = () => {
  const favoriteItems = [
    { id: 1, name: "Nike Air Max", price: 200 },
    { id: 2, name: "Adidas Ultraboost", price: 180 },
    { id: 3, name: "Puma RS-X", price: 150 },
    { id: 4, name: "Reebok Classic", price: 120 },
  ];

  return (
    <div className="p-3">
      <h1 className="text-center text-2xl my-6">Your Most Loved Items</h1>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {favoriteItems.map((item) => (
          <div key={item.id} className="w-[400px] p-2">
            <Sneaker name={item.name} price={item.price} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
