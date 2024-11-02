import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

const FilterComponent = ({
  setGender,
  setAgeGroup,
  setUseFor,
  selectedColors,
  toggleColorSelection,
}) => {
  return (
    <div className="p-4 bg-white w-full shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Filters</h2>

      {/* Gender Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Gender</h3>
        <Select onValueChange={setGender}>
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

      {/* Age Group Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Age Group</h3>
        <Select onValueChange={setAgeGroup}>
          <SelectTrigger>
            <SelectValue placeholder="Select Age Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kids">Kids</SelectItem>
            <SelectItem value="teens">Teens</SelectItem>
            <SelectItem value="adults">Adults</SelectItem>
            <SelectItem value="seniors">Seniors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Use For Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Use For</h3>
        <Select onValueChange={setUseFor}>
          <SelectTrigger>
            <SelectValue placeholder="Select Purpose" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="casual">Casual</SelectItem>
            <SelectItem value="sports">Sports</SelectItem>
            <SelectItem value="formal">Formal</SelectItem>
            <SelectItem value="outdoor">Outdoor</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Colors Filter */}
      <div className="mb-4">
        <h3 className="text-md font-semibold mb-2">Colors</h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { color: "red", bg: "bg-red-500" },
            { color: "blue", bg: "bg-blue-500" },
            { color: "green", bg: "bg-green-500" },
            { color: "black", bg: "bg-black" },
            { color: "white", bg: "bg-white border-gray-400" },
          ].map(({ color, bg }) => (
            <div key={color} className="flex flex-col items-center">
              <Checkbox
                id={color}
                checked={selectedColors.includes(color)}
                onChange={() => toggleColorSelection(color)}
                className={`w-8 h-8 rounded-full ${bg} checked:bg-opacity-75 border-none appearance-none cursor-pointer`}
              />
              <label htmlFor={color} className="text-sm mt-2 capitalize">
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterComponent;
