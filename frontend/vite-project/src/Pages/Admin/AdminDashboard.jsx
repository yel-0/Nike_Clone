import UserTable from "@/Design/Admin/UserTable";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col h-auto space-y-6 ">
      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-200 rounded-lg shadow-sm p-4 flex items-center space-x-4">
          <div>
            <h2 className="text-lg">Overview</h2>
            <p className="text-gray-800">Total Sales: $10,000</p>
          </div>
        </div>

        <div className="bg-green-200 rounded-lg shadow-sm p-4 flex items-center space-x-4">
          <div>
            <h2 className="text-lg">Users</h2>
            <p className="text-gray-800">Total Users: 1,200</p>
          </div>
        </div>

        <div className="bg-orange-200 rounded-lg shadow-sm p-4 flex items-center space-x-4">
          <div>
            <h2 className="text-lg">Products</h2>
            <p className="text-gray-800">Total Products: 300</p>
          </div>
        </div>

        <div className="bg-purple-200 rounded-lg shadow-sm p-4 flex items-center space-x-4">
          <div>
            <h2 className="text-lg">Reports</h2>
            <p className="text-gray-800">Pending Reports: 5</p>
          </div>
        </div>
      </div>
      <UserTable />
    </div>
  );
};

export default AdminDashboard;
