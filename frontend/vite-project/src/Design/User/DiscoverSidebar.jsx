import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import FilterComponent from "../Shared/FilterComponent";

const sections = [
  { name: "Shoes", path: "/shoes" },
  { name: "Tops/T-shirts", path: "/tops-tshirts" },
  { name: "Shorts", path: "/shorts" },
  { name: "Accessory", path: "/accessory" },
  { name: "Socks", path: "/socks" },
];

const DiscoverSidebar = () => {
  return (
    <Sidebar className=" text-black  h-screen min-h-screen px-2 border border-gray-200 ">
      <SidebarHeader className="text-lg text-center font-medium p-4  border-t border-gray-200 bg-white ">
        Discover all items
      </SidebarHeader>
      <SidebarContent className="flex bg-white   flex-col gap-2 justify-start items-start">
        {sections.map((section, index) => (
          <Link key={index} to={section.path} className="w-full mt-2">
            <button className="w-full text-left py-2 px-4  text-sm text-black font-medium transition duration-300 ease-in-out hover:text-gray-500">
              {section.name}
            </button>
          </Link>
        ))}
        <FilterComponent />
      </SidebarContent>
    </Sidebar>
  );
};

export default DiscoverSidebar;
