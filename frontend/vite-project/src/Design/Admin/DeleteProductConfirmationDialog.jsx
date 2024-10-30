import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "@/Hook/Product/useDeleteProduct";
const DeleteProductConfirmationDialog = ({ id }) => {
  const { mutate: deleteProduct, isLoading, error } = useDeleteProduct();

  const handleDelete = () => {
    deleteProduct(id);
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
            product and remove its data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2 mr-2"
            onClick={() => Dialog.close()} // Close dialog on cancel
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2"
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {error && (
          <p className="text-red-500 mt-2">Failed to delete product.</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DeleteProductConfirmationDialog;
