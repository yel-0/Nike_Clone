import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from "react-router-dom";
import Item from "@/Design/Shared/Item";
import useInfiniteFilterProduct from "@/Hook/Product/useInfiniteFilterProduct";
import DiscoverSidebar from "@/Design/User/DiscoverSidebar";

const DiscoverByItem = () => {
  const { id } = useParams();
  const [filters, setFilters] = useState({
    categoryId: id,
    sortBy: "priceAsc",
    gender: "",
    colors: [],
    ageGroup: "",
    useFor: "",
  });

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteFilterProduct(filters);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading products.</div>;

  return (
    <SidebarProvider>
      <div className="relative">
        <DiscoverSidebar filters={filters} setFilters={setFilters} />
      </div>

      <main className="p-6 relative w-full">
        <div className="flex flex-row justify-end gap-3 sticky bg-white top-0 py-3 items-center">
          <div className="flex flex-row justify-center items-center gap-1">
            <SidebarTrigger /> <div>Hide Filter</div>
          </div>
          <div>
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({
                  ...prev,
                  sortBy: value === "price_low_high" ? "priceAsc" : "priceDesc",
                }))
              }
            >
              <SelectTrigger className="border-none focus:ring-0 focus:border-none">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price_low_high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price_high_low">
                  Price: High to Low
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data.pages.map((page, pageIndex) =>
            page.map((product, index) => (
              <Item key={`${pageIndex}-${index}`} product={product} />
            ))
          )}
        </div>

        {hasNextPage && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700 transition duration-300"
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </main>
    </SidebarProvider>
  );
};

export default DiscoverByItem;
