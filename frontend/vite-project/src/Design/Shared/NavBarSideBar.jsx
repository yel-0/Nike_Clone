import React, { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Home,
  Info,
  ShoppingBag,
  Mail,
  UserPlus,
  LogIn,
  LogOut,
  LayoutDashboard,
  Heart,
} from "lucide-react";
import LogoutDialog from "./LogoutDialog";
import { X } from "lucide-react";
import SearchBox from "./SearchBox";
import { Search } from "lucide-react";

const NavBarSideBar = ({ token, data, isOpen, setIsOpen }) => {
  const location = useLocation();

  // State to control sidebar open/close

  // Close sidebar when location (URL) changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Sidebar side={"right"} open={isOpen}>
      <div className="flex flex-row justify-end p-4 ">
        <X onClick={() => setIsOpen(!isOpen)} className=" " />
      </div>
      <SidebarContent>
        <div className="flex flex-col justify-start p-4 gap-6 text-2xl h-screen items-start">
          <Link
            to="/"
            className="flex items-center gap-2 text-black hover:text-gray-700"
          >
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/about"
            className="flex items-center gap-2 text-black hover:text-gray-700"
          >
            <Info size={24} />
            <span>About</span>
          </Link>
          <Link
            to="/discover"
            className="flex items-center gap-2 text-black hover:text-gray-700"
          >
            <ShoppingBag size={24} />
            <span>Products</span>
          </Link>
          <Link
            to="/favorite"
            className="flex items-center gap-2 text-black hover:text-gray-700"
          >
            <Heart size={24} />
            <span>Favorite</span>
          </Link>
          <div className="flex flex-row items-center gap-2 text-black hover:text-gray-700">
            <Search size={24} />
            <SearchBox />
          </div>
          <Link
            to="/contact"
            className="flex items-center gap-2 text-black hover:text-gray-700"
          >
            <Mail size={24} />
            <span>Contact</span>
          </Link>

          {token === null ? (
            <>
              <Link
                to="/register"
                className="flex items-center gap-2 text-black hover:text-gray-700"
              >
                <UserPlus size={24} />
                <span>Register</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 text-black hover:text-gray-700"
              >
                <LogIn size={24} />
                <span>Login</span>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-2 text-black hover:text-gray-700">
              <LogOut size={24} />
              <LogoutDialog />
            </div>
          )}

          {token && data && (
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 text-black hover:text-gray-700"
            >
              <LayoutDashboard size={24} />
              <span>Dashboard</span>
            </Link>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default NavBarSideBar;
