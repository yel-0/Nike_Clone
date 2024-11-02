import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteProduct } from "@/Hook/Product/useDeleteProduct";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "react-query";
const DeleteProductConfirmationDialog = ({ id }) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const queryClient = useQueryClient();

  const {
    mutate: deleteProduct,
    isLoading,
    error,
  } = useDeleteProduct({
    onSuccess: () => {
      queryClient.invalidateQueries("infiniteFilterProduct");
      toast({
        title: "Product Delete successfully",
      });
      setOpen(false);
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Something went wrong",
      });
    },
  });

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          {/* <button
            className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2 mr-2"
            onClick={() => Dialog.close()} // Close dialog on cancel
          >
            Cancel
          </button> */}
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
