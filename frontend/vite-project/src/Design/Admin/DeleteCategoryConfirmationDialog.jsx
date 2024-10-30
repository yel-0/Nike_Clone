import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import useDeleteCategory from "@/Hook/Category/useDeleteCategory";
const DeleteCategoryConfirmationDialog = ({ category }) => {
  const { mutate: deleteCategory, isLoading, isSuccess } = useDeleteCategory();

  const handleDelete = () => {
    deleteCategory(category._id); // Use category.id for deletion
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-sm rounded-md">
        Delete
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            category and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2"
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {isSuccess && (
          <p className="text-green-500 mt-3">Category deleted successfully!</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCategoryConfirmationDialog;
