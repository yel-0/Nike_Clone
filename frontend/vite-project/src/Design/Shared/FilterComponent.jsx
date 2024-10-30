import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const FilterComponent = () => {
  return (
    <div className="p-4 bg-white w-full shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Gender</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="unisex">UniSex</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Kids</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select Kid's Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="boys">Boys</SelectItem>
            <SelectItem value="girls">Girls</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Sort By</h3>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Sort By Price" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low-to-high">Price: Low to High</SelectItem>
            <SelectItem value="high-to-low">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Colors</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { color: "red", bg: "bg-red-500" },
            { color: "blue", bg: "bg-blue-500" },
            { color: "green", bg: "bg-green-500" },
            { color: "black", bg: "bg-black" },
            { color: "white", bg: "bg-white border-gray-400" },
            { color: "yellow", bg: "bg-yellow-500" },
            { color: "purple", bg: "bg-purple-500" },
            { color: "orange", bg: "bg-orange-500" },
            { color: "gray", bg: "bg-gray-500" },
            { color: "pink", bg: "bg-pink-500" },
            { color: "brown", bg: "bg-brown-500" },
          ].map(({ color, bg }) => (
            <div key={color} className="flex flex-col items-center">
              <Checkbox
                id={color}
                className={`w-8 h-8 rounded-full ${bg} checked:bg-opacity-75 border-none appearance-none cursor-pointer`}
              />
              <label htmlFor={color} className="text-sm mt-2 capitalize">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Sports</h3>
        <div className="flex flex-col">
          <div className="flex items-center mb-2">
            <Checkbox id="basketball" className="mr-2 " />
            <label htmlFor="basketball" className="text-sm">
              Basketball
            </label>
          </div>
          <div className="flex items-center mb-2">
            <Checkbox id="soccer" className="mr-2" />
            <label htmlFor="soccer" className="text-sm">
              Soccer
            </label>
          </div>
          <div className="flex items-center mb-2">
            <Checkbox id="tennis" className="mr-2" />
            <label htmlFor="tennis" className="text-sm">
              Tennis
            </label>
          </div>
          <div className="flex items-center mb-2">
            <Checkbox id="running" className="mr-2" />
            <label htmlFor="running" className="text-sm">
              Running
            </label>
          </div>
          <div className="flex items-center mb-2">
            <Checkbox id="swimming" className="mr-2" />
            <label htmlFor="swimming" className="text-sm">
              Swimming
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
