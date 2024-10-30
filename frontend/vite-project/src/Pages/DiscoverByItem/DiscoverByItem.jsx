import DiscoverSidebar from "@/Design/User/DiscoverSidebar";
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sneaker from "@/Design/Shared/Item";
import SneakerImg1 from "../../assets/images/SneakerImg1.webp";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DiscoverSidebarByItem from "@/Design/User/DiscoverSidebarByItem";

const DiscoverByItem = () => {
  const initialSneakers = 10;
  const [visibleSneakers, setVisibleSneakers] = useState(initialSneakers);

  const sneakerData = new Array(30).fill({
    id: null,
    name: "Nike Air Max Portal",
    image: SneakerImg1,
    price: 200,
  });

  const loadMoreSneakers = () => {
    setVisibleSneakers((prev) => prev + initialSneakers);
  };

  return (
    <SidebarProvider>
      <div className="relative">
        <DiscoverSidebarByItem />
      </div>

      <main className="p-6 relative">
        <div className="flex flex-row justify-end gap-3 sticky bg-white top-0 py-3 items-center ">
          <div className="flex flex-row justify-center items-center gap-1 ">
            <SidebarTrigger /> <div>Hide Filter</div>
          </div>
          <div>
            <Select>
              <SelectTrigger
                className="border-none focus:ring-0 focus:border-none
"
              >
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low_high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price_high_low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sneakerData.slice(0, visibleSneakers).map((sneaker, index) => (
            <Sneaker
              key={index}
              name={sneaker.name}
              image={sneaker.image}
              price={sneaker.price}
              alt={`Sneaker ${index}`}
            />
          ))}
        </div>

        {visibleSneakers < sneakerData.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreSneakers}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
};

export default DiscoverByItem;
