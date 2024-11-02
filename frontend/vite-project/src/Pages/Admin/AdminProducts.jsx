import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useInfiniteFilterProduct from "@/Hook/Product/useInfiniteFilterProduct";
import AdminItem from "@/Design/Admin/AdminItem";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useLocation } from "react-router-dom";
import AdminDiscoverSidebar from "@/Design/Admin/AdminDiscoverSidebar";

const AdminProducts = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").filter(Boolean);
  const [filters, setFilters] = useState({
    categoryId: undefined,
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
        <AdminDiscoverSidebar filters={filters} setFilters={setFilters} />
      </div>

      <main className="p-6 relative w-full">
        <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 md:mb-0">
          <div className="flex justify-between items-center mb-4">
            {/* Page Title */}
            <h1 className="text-2xl  text-gray-900 capitalize">
              {currentPath[currentPath.length - 1] || "Admin"}
            </h1>
          </div>

          {/* Breadcrumb */}
          <Breadcrumb className="text-sm mt-2">
            <BreadcrumbList className="flex items-center space-x-1 text-gray-600">
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin/dashboard"
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="mx-2 text-gray-400">
                /
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href="/admin"
                  className="text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Admin
                </BreadcrumbLink>
              </BreadcrumbItem>
              {currentPath.length > 1 && (
                <>
                  <BreadcrumbSeparator className="mx-2 text-gray-400">
                    /
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    <BreadcrumbPage className="text-gray-500 capitalize">
                      {currentPath[currentPath.length - 1]}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
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
              <AdminItem key={`${pageIndex}-${index}`} product={product} />
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

export default AdminProducts;
