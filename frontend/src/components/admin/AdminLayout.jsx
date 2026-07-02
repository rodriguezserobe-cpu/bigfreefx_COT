import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#0f1117] text-white">
      {/* Sidebar */}

      <AdminSidebar />

      {/* Main Content */}

      <main className="ml-72 min-h-screen">
        {/* Header */}

        <header className="h-24 border-b border-slate-700 bg-[#171b22] flex items-center justify-between px-10">
          <div>
            <h1 className="text-3xl font-bold text-sky-400">
              BIGFREE FX ADMIN
            </h1>

            <p className="text-slate-400 mt-1">
              Manage members and monitor the platform
            </p>
          </div>
        </header>

        {/* Page Content */}

        <section className="p-10">{children}</section>
      </main>
    </div>
  );
}
