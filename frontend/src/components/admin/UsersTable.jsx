export default function UsersTable({
  users,
  approveUser,
  rejectUser,
  makeAdmin,
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-700 bg-[#171b22]">
      <table className="min-w-[1000px] w-full">
        <thead className="bg-[#1f242d]">
          <tr>
            <th className="p-4 text-left">Full Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Country</th>
            <th className="p-4 text-center">Role</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="6" className="py-8 text-center text-slate-400">
                No users found.
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-slate-700 odd:bg-[#171b22] even:bg-[#1b2028] hover:bg-[#253041] transition duration-200"
              >
                <td className="p-4 font-medium whitespace-nowrap">
                  {user.fullName}
                </td>

                <td className="p-4 whitespace-nowrap">{user.email}</td>

                <td className="p-4 whitespace-nowrap">{user.country}</td>

                <td className="p-4 text-center">
                  {user.role === "admin" ? (
                    <span className="rounded-full bg-sky-500/20 px-3 py-1 text-sm font-semibold text-sky-400">
                      Administrator
                    </span>
                  ) : (
                    <span className="rounded-full bg-slate-700 px-3 py-1 text-sm">
                      Member
                    </span>
                  )}
                </td>

                <td className="p-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
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
                  <div className="flex justify-center gap-2 flex-wrap">
                    {user.status === "pending" && (
                      <>
                        <button
                          onClick={() => approveUser(user._id)}
                          className="rounded-lg bg-green-600 px-4 py-2 hover:bg-green-700 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectUser(user._id)}
                          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {user.status === "approved" && user.role !== "admin" && (
                      <>
                        <button
                          onClick={() => makeAdmin(user._id)}
                          className="rounded-lg bg-sky-600 px-4 py-2 hover:bg-sky-700 transition"
                        >
                          Make Admin
                        </button>

                        <button
                          onClick={() => rejectUser(user._id)}
                          className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-700 transition"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {user.role === "admin" && (
                      <span className="rounded-lg bg-sky-500/20 px-4 py-2 font-semibold text-sky-400">
                        Administrator ✓
                      </span>
                    )}

                    {user.status === "rejected" && (
                      <button
                        onClick={() => approveUser(user._id)}
                        className="rounded-lg bg-yellow-600 px-4 py-2 hover:bg-yellow-700 transition"
                      >
                        Approve Again
                      </button>
                    )}
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
