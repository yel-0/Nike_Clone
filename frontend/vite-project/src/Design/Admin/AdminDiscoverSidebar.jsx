import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useFetchCategories from "@/Hook/Category/useFetchCategories";
const colors = [
  { name: "Red", className: "bg-red-500" },
  { name: "blue", className: "bg-blue-500" },
  { name: "green", className: "bg-green-500" },
  { name: "Black", className: "bg-black" },
  { name: "White", className: "bg-white" },
  { name: "yellow", className: "bg-yellow-500" },
  { name: "purple", className: "bg-purple-500" },
  { name: "orange", className: "bg-orange-500" },
  { name: "gray", className: "bg-gray-500" },
  { name: "pink", className: "bg-pink-500" },
  { name: "brown", className: "bg-brown-500" },
];

const AdminDiscoverSidebar = ({ filters, setFilters }) => {
  const { data: categories, isLoading } = useFetchCategories();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Sidebar className="text-black h-screen min-h-screen px-2 border border-gray-200">
      <SidebarHeader className="text-lg text-center font-medium p-4 border-t border-gray-200 bg-white">
        Discover all items
      </SidebarHeader>
      <SidebarContent className="flex bg-white flex-col gap-2 justify-start items-start">
        {categories?.map((category, index) => (
          <Link
            key={index}
            to={`/admin/products/${category._id}/category`}
            className="w-full mt-2"
          >
            <button
              className="w-full text-left py-2 px-4 text-sm text-black font-medium transition duration-300 ease-in-out hover:text-gray-500"
              onClick={() =>
                setFilters((prev) => ({ ...prev, categoryId: category._id }))
              }
            >
              {category.name}
            </button>
          </Link>
        ))}

        <div className="w-full p-4">
          {/* Gender Filter */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Gender</h3>
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, gender: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Colors Filter */}

          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Colors</h3>
            <div className="grid grid-cols-3 gap-4">
              {colors.map(({ name, className }) => (
                <div key={name} className="flex flex-col items-center">
                  <input
                    type="checkbox"
                    id={name}
                    checked={filters.colors.includes(name)}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setFilters((prev) => ({
                        ...prev,
                        colors: checked
                          ? [...prev.colors, name]
                          : prev.colors.filter((c) => c !== name),
                      }));
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor={name}
                    className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center ${
                      filters.colors.includes(name) ? "bg-blue-500" : className
                    }`}
                  >
                    {filters.colors.includes(name) && (
                      <span className="text-white font-bold">&#10003;</span>
                    )}
                  </label>
                  <span className="text-sm mt-2 capitalize">{name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Age Group Filter */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Age Group</h3>
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, ageGroup: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Age Group" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kid">Kids</SelectItem>
                <SelectItem value="boy">Boy</SelectItem>
                <SelectItem value="adult">Adults</SelectItem>
                <SelectItem value="girl">Girl</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Use For Filter */}
          <div className="mb-4">
            <h3 className="text-md font-semibold mb-2">Use For</h3>
            <Select
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, useFor: value }))
              }
            >
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
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminDiscoverSidebar;
