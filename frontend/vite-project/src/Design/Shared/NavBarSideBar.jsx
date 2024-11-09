import {
  Sidebar,
  SidebarContent,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";
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

const NavBarSideBar = ({ token, data }) => {
  return (
    <Sidebar side={"right"}>
      <SidebarContent>
        <div className="flex flex-col justify-start p-4 gap-6 text-2xl h-screen items-start">
          <SidebarTrigger />

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