import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCreateCategory from "@/Hook/Category/useCreateCategory";
const CreateCategoryDialog = () => {
  const [name, setName] = useState("");
  const {
    mutate: createCategory,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useCreateCategory();

  const handleCreate = () => {
    if (name.trim()) {
      createCategory({ name });
      setName("");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-green-500 text-white hover:bg-green-600 py-1 px-2 text-sm rounded-md shadow-md">
        Add Category
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col space-y-4 mt-4">
          <label className="text-gray-600">Category Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 outline-none focus:border-green-500 transition"
          />
          <button
            onClick={handleCreate}
            disabled={isLoading}
            className="bg-green-500 text-white py-2 rounded-md mt-4 hover:bg-green-600 transition"
          >
            {isLoading ? "Creating..." : "Create Category"}
          </button>
          {isError && <p className="text-red-500">Error: {error.message}</p>}
          {isSuccess && (
            <p className="text-green-500">Category created successfully!</p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
