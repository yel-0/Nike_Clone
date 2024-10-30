import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import useFetchCategories from "../../Hook/Category/useFetchCategories";
import { X } from "lucide-react";

const tags = [
  { id: 1, name: "New Arrival" },
  { id: 2, name: "Sale" },
  { id: 3, name: "Best Seller" },
  { id: 4, name: "Limited Edition" },
  { id: 5, name: "Trending" },
  { id: 6, name: "Exclusive" },
  { id: 7, name: "Limited Stock" },
  { id: 8, name: "Popular" },
  { id: 9, name: "Online Only" },
  { id: 10, name: "Back in Stock" },
  { id: 11, name: "Featured" },
  { id: 12, name: "Seasonal" },
  { id: 13, name: "Eco-Friendly" },
  { id: 14, name: "Top Rated" },
  { id: 15, name: "Staff Pick" },
  { id: 16, name: "Must-Have" },
  { id: 17, name: "Just Dropped" },
  { id: 18, name: "All-Time Favorite" },
];

const UpdateCategorySelector = ({
  selectedCategory,
  handleCategoryChange,
  selectedTags,
  handleTagChange,
  handleRemoveTag,
}) => {
  const { data: categories = [], isLoading, isError } = useFetchCategories();

  if (isLoading) {
    return <div>Loading categories...</div>;
  }

  if (isError) {
    return <div>Error fetching categories</div>;
  }

  return (
    <div className="grid w-full p-5 rounded-lg bg-white border border-gray-300 shadow-sm gap-4">
      {/* Product Category */}
      <div className="flex flex-col">
        <Label htmlFor="productCategory" className="opacity-70 text-sm mb-1">
          Product Category
        </Label>
        <Select
          onValueChange={handleCategoryChange}
          defaultValue={selectedCategory}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem
                key={category._id}
                value={category._id}
                onClick={() => handleCategoryChange(category._id)}
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Product Tags */}
      <div className="flex flex-col">
        <Label htmlFor="productTags" className="opacity-70 text-sm mb-1">
          Product Tags
        </Label>
        <Select onValueChange={handleTagChange} className="w-[180px]">
          <SelectTrigger>
            <SelectValue placeholder="Select a tag" />
          </SelectTrigger>
          <SelectContent>
            {tags.map((tag) => (
              <SelectItem key={tag.id} value={tag.name}>
                {tag.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Selected Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedTags.map((tag, index) => (
            <span
              key={index}
              className="bg-white text-black shadow-sm border border-gray-300 rounded-full px-3 py-1 flex items-center"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-red-600 hover:text-red-800"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpdateCategorySelector;
