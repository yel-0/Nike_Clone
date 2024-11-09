import React, { useEffect } from "react";
import FavoriteItem from "@/Design/Shared/FavoriteItem";
import { useFavorites } from "@/Hook/Favorite/useFavorites";
import { useRemoveFavorite } from "@/Hook/Favorite/useRemoveFavorite"; // Assuming you've created this hook
import { useAuth } from "@/Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
const Favorite = () => {
  const { data: favorites, isLoading, isError } = useFavorites();
  const { mutate: removeFavorite } = useRemoveFavorite();
  const { token } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleRemoveFavorite = (productId) => {
    removeFavorite(productId);
  };

  if (isLoading)
    return <p className="text-center">Loading your favorites...</p>;
  if (isError) return <p className="text-center">Error loading favorites.</p>;

  return (
    <div className="p-3 min-h-screen">
      <h1 className="text-center text-2xl my-6">Your Most Loved Items</h1>
      <div className="flex flex-row flex-wrap justify-center items-center">
        {favorites.map((item) => (
          <div key={item._id} className="w-[400px] p-2">
            <FavoriteItem
              product={item.productId}
              onRemoveFavorite={handleRemoveFavorite}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorite;
