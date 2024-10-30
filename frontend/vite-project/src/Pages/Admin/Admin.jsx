import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSideBar from "@/Design/Admin/AdminSideBar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import DiscoverSidebar from "@/Design/User/DiscoverSidebar";
import DiscoverSidebarByItem from "@/Design/User/DiscoverSidebarByItem";

const Admin = () => {
  const location = useLocation();
  const currentPath = location.pathname.split("/").filter(Boolean);

  // Conditions to determine which sidebar to use
  const isProductsPage = currentPath.includes("products");
  const isCategoryPage = currentPath.includes("category");

  return (
    <SidebarProvider>
      <div className="flex h-auto w-full">
        {/* Sidebar */}
        <div className="bg-white border-r border-gray-300">
          {isCategoryPage ? (
            <DiscoverSidebarByItem />
          ) : isProductsPage ? (
            <DiscoverSidebar />
          ) : (
            <AdminSideBar />
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5">
          {/* Breadcrumb */}
          <div className="flex flex-col bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-6 md:mb-0">
            <div className="flex justify-between items-center mb-4">
              {/* Page Title */}
              <h1 className="text-2xl  text-gray-900 capitalize">
                {currentPath[currentPath.length - 1] || "Admin"}
              </h1>

              {/* Sidebar Toggle (For mobile responsiveness) */}
              <div className="">
                <SidebarTrigger className="p-2 hover:text-white bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Menu
                </SidebarTrigger>
              </div>
            </div>

            {/* Breadcrumb */}
            <Breadcrumb className="text-sm mt-2">
              <BreadcrumbList className="flex items-center space-x-1 text-gray-600">
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin/dashboard"
                    className="text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="mx-2 text-gray-400">
                  /
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/admin"
                    className="text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Admin
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {currentPath.length > 1 && (
                  <>
                    <BreadcrumbSeparator className="mx-2 text-gray-400">
                      /
                    </BreadcrumbSeparator>
                    <BreadcrumbItem>
                      <BreadcrumbPage className="text-gray-500 capitalize">
                        {currentPath[currentPath.length - 1]}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* Page Content */}
          <main className="bg-white mt-3 md">
            <Outlet /> {/* Render child routes here */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Admin;
