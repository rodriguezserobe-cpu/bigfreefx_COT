import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getUsers,
  approveUser,
  rejectUser,
  makeAdmin,
} from "../../api/admin";

import AdminLayout from "../../components/admin/AdminLayout";
import StatCard from "../../components/admin/StatCard";
import UsersTable from "../../components/admin/UsersTable";
import toast from "react-hot-toast";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // all | pending | approved | rejected
  const [filter, setFilter] = useState("all");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardStats = await getDashboardStats();
      const allUsers = await getUsers();

      setStats(dashboardStats);
      setUsers(allUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);

        const dashboardStats = await getDashboardStats();
        const allUsers = await getUsers();

        setStats(dashboardStats);
        setUsers(allUsers);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleApprove = async (id) => {
    const user = users.find((u) => u._id === id);

    if (!window.confirm(`Approve ${user.fullName}?`)) return;

    await approveUser(id);
    toast.success("User approved successfully");
    loadDashboard();
  };

  const handleReject = async (id) => {
    const user = users.find((u) => u._id === id);

    if (!window.confirm(`Reject ${user.fullName}?`)) return;

    await rejectUser(id);
    toast.success("User rejected successfully");
    loadDashboard();
  };

  const handleMakeAdmin = async (id) => {
    const user = users.find((u) => u._id === id);

    if (!window.confirm(`${user.fullName} will become an administrator.`))
      return;

    await makeAdmin(id);
    toast.success(`${user.fullName} is now an administrator`);
    loadDashboard();
  };

  const filteredUsers = users.filter((user) => {
    if (filter !== "all" && user.status !== filter) {
      return false;
    }

    return (
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.country.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Statistics Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <StatCard
            title="Total Members"
            value={stats.totalMembers}
            color="sky"
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />

          <StatCard
            title="Pending"
            value={stats.pendingUsers}
            color="yellow"
            active={filter === "pending"}
            onClick={() => setFilter("pending")}
          />

          <StatCard
            title="Approved"
            value={stats.approvedUsers}
            color="green"
            active={filter === "approved"}
            onClick={() => setFilter("approved")}
          />

          <StatCard
            title="Rejected"
            value={stats.rejectedUsers}
            color="red"
            active={filter === "rejected"}
            onClick={() => setFilter("rejected")}
          />
        </div>

        {/* Users Section */}

        <div className="bg-[#171b22] border border-slate-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold">
                {filter === "all" && "All Members"}
                {filter === "pending" && "Pending Members"}
                {filter === "approved" && "Approved Members"}
                {filter === "rejected" && "Rejected Members"}
              </h2>

              <p className="text-slate-400 mt-1">
                {filteredUsers.length} member(s)
              </p>
            </div>
          </div>

          <input
            type="text"
            placeholder="Search members..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full mb-6 bg-[#111827] border border-slate-700 rounded-xl px-5 py-3 outline-none focus:border-sky-500"
          />

          {loading ? (
            <div className="text-center py-12 text-slate-400">
              Loading members...
            </div>
          ) : (
            <UsersTable
              users={filteredUsers}
              approveUser={handleApprove}
              rejectUser={handleReject}
              makeAdmin={handleMakeAdmin}
            />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
