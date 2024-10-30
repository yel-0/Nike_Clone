import DiscoverSidebar from "@/Design/User/DiscoverSidebar";
import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAllProducts from "@/Hook/Product/useAllProducts";
import Item from "@/Design/Shared/Item";

const Discover = () => {
  const { data: products, isLoading, isError, error } = useAllProducts(); // Use the hook

  if (isLoading) {
    return <p>Loading...</p>; // Show loading state
  }

  if (isError) {
    return <p>Error: {error.message}</p>; // Show error message
  }
  return (
    <SidebarProvider>
      <div className="relative">
        <DiscoverSidebar />
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
          {products.map((product, index) => (
            <Item key={index} product={product} />
          ))}
        </div>

        {/* {visibleSneakers < sneakerData.length && (
          <div className="flex justify-center mt-6">
            <button
              onClick={loadMoreSneakers}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              Load More
            </button>
          </div>
        )} */}
      </main>
    </SidebarProvider>
  );
};

export default Discover;
