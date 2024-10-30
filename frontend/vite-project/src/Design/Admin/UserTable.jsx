import DeleteUserConfirmationDialog from "./DeleteUserConfirmationDialog";

const UserTable = () => {
  const users = Array.from({ length: 40 }, (_, index) => ({
    id: `00${index + 1}`,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
  }));

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="text-black">
          <tr>
            <th className="py-3 font-thin px-4 text-left">User ID</th>
            <th className="py-3 font-thin px-4 text-left">Name</th>
            <th className="py-3 px-4 font-thin text-left">Email</th>
            <th className="py-3 px-4 text-right font-thin">Actions</th>
          </tr>
        </thead>
        <tbody className="text-sm">
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="py-3 px-4">{user.id}</td>
              <td className="py-3 px-4">{user.name}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4 text-right">
                <DeleteUserConfirmationDialog />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
