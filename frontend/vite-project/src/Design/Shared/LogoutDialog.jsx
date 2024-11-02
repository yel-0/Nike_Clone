import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/Provider/AuthProvider";
const LogoutDialog = () => {
  const { logout } = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>Logout</DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will log you out of your account.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => setOpen(false)}
            className="bg-gray-300 text-black rounded px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white rounded px-4 py-2"
          >
            Confirm Logout
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LogoutDialog;
