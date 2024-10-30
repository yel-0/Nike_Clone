import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const SearchBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fake data for search history
  const searchHistory = [
    "Air Max",
    "Running Shoes",
    "Sneakers",
    "Nike Zoom",
    "Basketball Shoes",
  ];

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setSearchTerm("");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger onClick={handleOpen}>Search</SheetTrigger>
      <SheetContent className="h-[550px]" side={"top"}>
        <div className="flex w-full flex-row justify-between items-start p-2">
          <div className="text-3xl">Nike</div>
          <div className="flex flex-row justify-center items-start w-full px-4">
            <div className="">
              <div className="flex items-center w-[60vw] space-x-2 border border-gray-300 rounded-full px-4 shadow-sm">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search"
                  className="w-full p-1 border-none focus:outline-none text-gray-700"
                />
              </div>

              <div className="pt-5">
                <h3 className="text-lg ">Recently Searched Items</h3>
                <div className="py-4">
                  {searchHistory.length > 0 ? (
                    <ul>
                      {searchHistory.map((item, index) => (
                        <li
                          key={index}
                          className="text-gray-700 mb-2 text-lg hover:text-black cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No recent searches</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            className="text-black px-4 py-2 rounded-lg"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SearchBox;
