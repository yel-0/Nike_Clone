import { Home, Box, Heart, Tag, Settings, Pencil } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Box,
  },
  {
    title: "Create Product",
    url: "/admin/create/product",
    icon: Pencil,
  },
  {
    title: "Categories",
    url: "/admin/categories",
    icon: Tag,
  },

  {
    title: "Settings",
    url: "/admin/settings",
    icon: Settings,
  },
];

const AdminSideBar = () => {
  return (
    <Sidebar>
      <SidebarContent className="bg-white  text-black shadow-sm">
        <SidebarGroup>
          <h1 className="text-2xl w-full text-center text-gray-600 mb-4">
            Admin Panel
          </h1>
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a
                    href={item.url}
                    className="flex  items-center p-2 gap-2 hover:bg-gray-200 rounded transition duration-200"
                  >
                    <item.icon className="mx-3 " />
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AdminSideBar;
