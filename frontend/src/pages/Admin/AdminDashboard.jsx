import { useEffect, useState } from "react";

import {
  getDashboardStats,
  getUsers,
  approveUser as approveMember,
  rejectUser as rejectMember,
} from "../../api/admin";

import StatCard from "../../components/Admin/StatCard";
import UsersTable from "../../components/Admin/UsersTable";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    pendingUsers: 0,
    approvedUsers: 0,
    rejectedUsers: 0,
  });

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const dashboardStats = await getDashboardStats();
      const allUsers = await getUsers();

      setStats(dashboardStats);
      setUsers(allUsers);
    } catch (error) {
      console.error(error);
      alert("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      await loadDashboard();
    };

    load();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveMember(id);
      await loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to approve user.");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectMember(id);
      await loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to reject user.");
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.country.toLowerCase().includes(search.toLowerCase())
    );
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1117] flex items-center justify-center text-white text-2xl">
        Loading Admin Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1117] text-white p-10">
      {/* Header */}

      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold text-sky-400">Admin Dashboard</h1>

        <button
          onClick={loadDashboard}
          className="bg-sky-600 hover:bg-sky-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          Refresh
        </button>
      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatCard
          title="Total Members"
          value={stats.totalMembers}
          color="sky"
        />

        <StatCard
          title="Pending Users"
          value={stats.pendingUsers}
          color="yellow"
        />

        <StatCard
          title="Approved Users"
          value={stats.approvedUsers}
          color="green"
        />

        <StatCard
          title="Rejected Users"
          value={stats.rejectedUsers}
          color="red"
        />
      </div>

      {/* Search */}

      <input
        type="text"
        placeholder="Search members..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-8 bg-[#171b22] border border-slate-700 rounded-xl px-5 py-4 outline-none focus:border-sky-500"
      />

      {/* Users */}

      <UsersTable
        users={filteredUsers}
        approveUser={handleApprove}
        rejectUser={handleReject}
      />
    </div>
  );
}
