import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const DeleteUserConfirmationDialog = ({ isOpen, onClose, onConfirm }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTrigger className="bg-red-500 text-white hover:bg-red-600 py-1 px-2 text-sm rounded-md">
        Delete User
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove their data from our servers.
          </DialogDescription>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 rounded px-4 py-2 mr-2"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
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
