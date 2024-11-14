import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

const DeleteUserConfirmationDialog = ({ isOpen, userId }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { toast } = useToast();

  // Mutation for deleting a user
  const deleteUserMutation = useMutation(
    async (userId) => {
      const response = await fetch(
        `http://localhost:3000/user/delete/${userId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    {
      onSuccess: () => {
        toast({
          title: "User Deleted Successfully",
          description: "The selected user has been removed from the database.",
        });

        // Failure toast for user deletion

        queryClient.invalidateQueries(["infiniteUsers"]);
        setOpen(false);
      },
      onError: (error) => {
        toast({
          title: "Failed to Delete User",
          description:
            "An error occurred while trying to delete the user. Please try again.",
          variant: "destructive", // Assuming you have a "destructive" variant for errors
        });
      },
    }
  );

  const handleConfirmDelete = () => {
    deleteUserMutation.mutate(userId);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-sm rounded-md">
        Delete
      </DialogTrigger>
      <DialogContent className="w-[90%] rounded-lg lg:max-w-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove their data from our servers.
          </DialogDescription>
          <div className="flex justify-end mt-4">
            <button
              onClick={handleConfirmDelete}
              className="bg-red-500 hover:bg-red-700 text-white rounded px-4 py-2"
            >
              Delete
            </button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserConfirmationDialog;
