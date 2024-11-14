import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSearchProducts } from "@/Hook/Product/useSearchProducts";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "react-router-dom";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation(); // This hook gives access to the current location object

  // Using the hook to fetch products based on the search term
  const { data: products, isLoading, error } = useSearchProducts(searchTerm);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  // Handle search input change and trigger search
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Close the sheet when the route changes
  useEffect(() => {
    // Close the Sheet when the route changes
    setIsOpen(false);
  }, [location]);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={handleOpen}>Search</SheetTrigger>
      <SheetContent className="min-h-screen h-auto p-4" side={"top"}>
        <div className="max-w-[1300px] mx-auto">
          <div className="flex flex-col w-full items-start space-y-4">
            <div className="flex flex-row gap-4 justify-around w-full">
              <div className="text-3xl text-gray-800">Nike</div>
              <div className="flex items-center w-full space-x-2 border border-gray-300 rounded-full px-4 shadow-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleChange} // Call handleChange on input change
                  placeholder="Search"
                  className="w-full p-2 border-none focus:outline-none text-gray-700"
                />
              </div>
              <button
                className="text-black px-4 py-2 rounded-lg"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
            <div className="flex flex-col w-full px-2">
              <div className="pt-4">
                <h3 className="text-lg font-semibold">Search Results</h3>
                {isLoading ? (
                  <p>Loading...</p>
                ) : error ? (
                  <p className="text-red-500">Error: {error.message}</p>
                ) : (
                  <ScrollArea className="h-[calc(100vh-150px)] w-full mt-4 p-4">
                    <div className="flex flex-wrap gap-4 justify-start">
                      {products && products.length > 0 ? (
                        products.map((product) => (
                          <div
                            key={product._id}
                            className="w-full sm:w-[48%] md:w-[30%] lg:w-[22%] xl:w-[18%] 2xl:w-[15%]"
                          >
                            {product.imageUrl && (
                              <Link to={`/product/detail/${product._id}`}>
                                <img
                                  src={product.imageUrl[0]}
                                  alt={product.name}
                                  className="w-full h-auto object-cover rounded-md mt-2"
                                />
                              </Link>
                            )}
                            <p className="text-sm text-gray-500 mt-1">
                              {product.ageGroup}
                            </p>
                            <h4 className="text-gray-800 font-medium">
                              {product.name}
                            </h4>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No products found</p>
                      )}
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBox;
