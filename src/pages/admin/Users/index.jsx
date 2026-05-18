import { useEffect, useState } from "react";
import { getUsers } from "../../../_services/user";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="mb-5 text-3xl font-bold text-white"> Users </h1>
      <div className="overflow-hidden border border-slate-700 rounded-2xl">
        <table className="w-full">
          <thead className="text-white bg-slate-800">
            <tr>
              <th className="px-5 py-4 text-left">ID</th>
              <th className="px-5 py-4 text-left">Name</th>
              <th className="px-5 py-4 text-left">Email</th>
              <th className="px-5 py-4 text-left">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="text-gray-300 border-t border-slate-700"
              >
                <td className="px-5 py-4">
                  #{user.id}
                </td>

                <td className="px-5 py-4">
                  {user.name}
                </td>

                <td className="px-5 py-4">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  {user.role}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}