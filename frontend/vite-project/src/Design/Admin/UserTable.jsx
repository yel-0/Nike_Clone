import React from "react";
import DeleteUserConfirmationDialog from "./DeleteUserConfirmationDialog";
import useInfiniteUsers from "@/Hook/Users/useInfiniteUsers";

const UserTable = () => {
  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } =
    useInfiniteUsers(10);

  if (isLoading) return <p>Loading users...</p>;
  if (isError) return <p>Error fetching users.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="text-black">
          <tr>
            <th className="py-3 font-thin px-4 text-left">No</th>
            <th className="py-3 px-4 font-thin text-left">Name</th>
            <th className="py-3 px-4 font-thin text-left">Email</th>
            <th className="py-3 px-4 text-right font-thin">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.users.map((user, userIndex) => (
                <tr
                  key={user._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  {/* Calculate index based on page and userIndex */}
                  <td className="py-3 px-4">
                    {pageIndex * 10 + userIndex + 1}
                  </td>
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 text-right">
                    <DeleteUserConfirmationDialog userId={user._id} />
                  </td>
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      {hasNextPage && (
        <div className="flex justify-center mt-4">
          <button
            onClick={fetchNextPage}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none disabled:opacity-50"
            disabled={isFetching}
          >
            {isFetching ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserTable;
