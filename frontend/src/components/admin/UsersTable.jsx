export default function UsersTable({ users, approveUser, rejectUser }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-700 bg-[#171b22]">
      <table className="w-full">
        <thead className="bg-[#1f242d]">
          <tr>
            <th className="p-4 text-left">Full Name</th>

            <th className="p-4 text-left">Email</th>

            <th className="p-4 text-left">Country</th>

            <th className="p-4 text-center">Status</th>

            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-slate-400">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-700 hover:bg-[#20252f] transition"
              >
                <td className="p-4 font-medium">{user.fullName}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">{user.country}</td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold
                    ${
                      user.status === "approved"
                        ? "bg-green-500/20 text-green-400"
                        : user.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => approveUser(user._id)}
                      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectUser(user._id)}
                      className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
