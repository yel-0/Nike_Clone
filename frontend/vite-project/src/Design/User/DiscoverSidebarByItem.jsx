import React from "react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import FilterComponent from "../Shared/FilterComponent";

const shoeItems = [
  { name: "Nike Air Max", id: 1 },
  { name: "Adidas Ultraboost", id: 2 },
  { name: "Puma RS-X", id: 3 },
  { name: "Reebok Classic", id: 4 },
];

const DiscoverSidebarByItem = () => {
  return (
    <Sidebar className="text-black h-screen min-h-screen px-2 border-none">
      <SidebarHeader className="text-lg text-center font-medium p-4 border-t border-gray-200 bg-white">
        Discover all shoes
      </SidebarHeader>
      <SidebarContent className="flex bg-white flex-col gap-2 justify-start items-start">
        {shoeItems.map((item) => (
          <Link key={item.id} to={`/shoes/${item.id}`} className="w-full mt-2">
            <button className="w-full text-left py-2 px-4 text-sm text-black font-medium transition duration-300 ease-in-out hover:text-gray-500">
              {item.name}
            </button>
          </Link>
        ))}
        <FilterComponent />
      </SidebarContent>
    </Sidebar>
  );
};

export default DiscoverSidebarByItem;
