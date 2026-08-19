import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useTradingJournal } from "../../context/TradingJournalContext";
import {
  FaChartPie,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaFileAlt,
  FaBullseye,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
  FaPlus,
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaFolderOpen,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";

import logo from "../../assets/logo.png";

const menuItems = [
  { title: "Analytics", icon: <FaChartLine />, section: "analytics" },
  { title: "Calendar", icon: <FaCalendarAlt />, section: "calendar" },
  { title: "BigFreeFx Hub", icon: <FaGlobe />, path: "/bigfreefxhub" },
  { title: "COT Dashboard", icon: <FaFileAlt />, path: "/dashboard" },
  { title: "Goals", icon: <FaBullseye />, section: "goals" },
];

const JournalSidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  onAddTrade,
  trades,
  selectedPeriod,
  onSelectPeriod,
  activeSection,
  setActiveSection,
}) => {
  const [journalOpen, setJournalOpen] = useState(true);
  const [TradingPeriodOpen, setTradingPeriodOpen] = useState(true);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  const { currency: selectedCurrency, changeCurrency } = useTradingJournal();

  const tradeMonths = Object.values(
    trades.reduce((groups, trade) => {
      if (!trade.openDate) return groups;

      const date = new Date(trade.openDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const key = `${year}-${String(month + 1).padStart(2, "0")}`;

      if (!groups[key]) {
        groups[key] = {
          key,
          month: date.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
          total: 0,
        };
      }

      groups[key].total++;

      return groups;
    }, {}),
  ).sort((a, b) => b.key.localeCompare(a.key));

  const selectSection = (section) => {
    setActiveSection(section);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen flex flex-col bg-[#0d1117] border-r border-slate-800 z-50 transition-all duration-300 ${
          collapsed ? "lg:w-20" : "lg:w-72"
        } ${
          mobileOpen
            ? "translate-x-0 w-[85vw] max-w-72"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="h-24 sm:h-29 border-b border-slate-800 flex items-center justify-between px-4 sm:px-5">
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={logo}
              alt="logo"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain flex-shrink-0"
            />

            {!collapsed && (
              <div className="hidden lg:block">
                <h2 className="text-white font-bold mt-8">BIGFREE FX</h2>
                <p className="text-xs text-sky-400 tracking-[3px] uppercase">
                  Journal
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex w-8 h-8 rounded-lg bg-slate-800 items-center justify-center text-gray-300 hover:bg-sky-500 transition"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white"
            title="Close menu"
          >
            <FaTimes />
          </button>
        </div>

        {/* Add Trade */}
        <div className="p-3 sm:p-4">
          <button
            onClick={onAddTrade}
            title={collapsed ? "Add Trade" : undefined}
            className="w-full bg-sky-500 hover:bg-sky-600 rounded-xl h-11 sm:h-12 flex items-center justify-center gap-3 font-semibold transition"
          >
            <FaPlus />
            {!collapsed && <span>Add Trade</span>}
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 px-2 sm:px-3 overflow-y-auto min-h-0">
          <div className="space-y-2">
            {/* Dashboard */}
            <button
              onClick={() => selectSection("dashboard")}
              title={collapsed ? "Dashboard" : undefined}
              className={`w-full flex items-center gap-4 rounded-xl px-4 h-12 transition ${
                activeSection === "dashboard"
                  ? "bg-sky-500 text-white"
                  : "text-gray-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <span className="text-lg">
                <FaChartPie />
              </span>

              {!collapsed && <span>Dashboard</span>}
            </button>

            {/* Currency */}
            <div className="mt-2">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                title={collapsed ? "Currency" : undefined}
                className="w-full flex items-center justify-between rounded-xl px-4 h-12 text-gray-400 hover:bg-slate-800 hover:text-white transition"
              >
                <div className="flex items-center gap-4">
                  <FaMoneyBillWave className="text-lg" />

                  {!collapsed && <span className="font-medium">Currency</span>}
                </div>

                {!collapsed &&
                  (currencyOpen ? <FaChevronDown /> : <FaChevronRight />)}
              </button>

              {!collapsed && currencyOpen && (
                <div className="ml-10 mt-2 space-y-1">
                  {[
                    { code: "ZAR", name: "South African Rand" },
                    { code: "USD", name: "US Dollar" },
                    { code: "EUR", name: "Euro" },
                    { code: "GBP", name: "British Pound" },
                    { code: "JPY", name: "Japanese Yen" },
                    { code: "AUD", name: "Australian Dollar" },
                    { code: "CAD", name: "Canadian Dollar" },
                    { code: "CHF", name: "Swiss Franc" },
                    { code: "NZD", name: "New Zealand Dollar" },
                    { code: "LSL", name: "Lesotho Loti" },
                  ].map((item) => (
                    <button
                      key={item.code}
                      onClick={() => changeCurrency(item.code)}
                      className={`w-full flex items-center justify-between rounded-lg px-3 py-2 transition ${
                        selectedCurrency === item.code
                          ? "bg-sky-500/20 text-sky-400"
                          : "text-gray-400 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{item.name}</span>
                      <span className="text-sm font-semibold">{item.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Other Menu Items */}
            {menuItems.map((item) =>
              item.section ? (
                <button
                  key={item.title}
                  onClick={() => selectSection(item.section)}
                  title={collapsed ? item.title : undefined}
                  className={`w-full flex items-center gap-4 rounded-xl px-4 h-12 transition ${
                    activeSection === item.section
                      ? "bg-sky-500 text-white"
                      : "text-gray-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>

                  {!collapsed && <span>{item.title}</span>}
                </button>
              ) : (
                <NavLink
                  key={item.title}
                  to={item.path}
                  title={collapsed ? item.title : undefined}
                  className={({ isActive }) =>
                    `flex items-center gap-4 rounded-xl px-4 h-12 transition ${
                      isActive
                        ? "bg-sky-500 text-white"
                        : "text-gray-400 hover:bg-slate-800 hover:text-white"
                    }`
                  }
                >
                  <span className="text-lg">{item.icon}</span>

                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ),
            )}
          </div>

          {/* Trading Journal */}
          <div className="pt-3 border-t border-slate-800 mt-3">
            <button
              onClick={() => setJournalOpen(!journalOpen)}
              title={collapsed ? "Trading Journal" : undefined}
              className="w-full flex items-center justify-between rounded-xl px-4 h-12 text-gray-400 hover:bg-slate-800 hover:text-white transition"
            >
              <div className="flex items-center gap-4">
                <FaFolderOpen className="text-lg" />

                {!collapsed && (
                  <span className="font-medium">Trading Journal</span>
                )}
              </div>

              {!collapsed &&
                (journalOpen ? <FaChevronDown /> : <FaChevronRight />)}
            </button>

            {!collapsed && journalOpen && (
              <div className="ml-10 mt-2">
                <button
                  onClick={() => setTradingPeriodOpen(!TradingPeriodOpen)}
                  className="w-full flex items-center justify-between rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800 transition"
                >
                  <span>Trading Period</span>

                  {TradingPeriodOpen ? (
                    <FaChevronDown className="text-xs" />
                  ) : (
                    <FaChevronRight className="text-xs" />
                  )}
                </button>

                {TradingPeriodOpen && (
                  <div className="mt-1 space-y-1">
                    {tradeMonths.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => onSelectPeriod(item.key)}
                        className={`w-full flex items-center justify-between rounded-lg px-3 py-2 transition ${
                          selectedPeriod === item.key
                            ? "bg-sky-500/20 text-sky-400"
                            : "text-gray-400 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span>{item.month}</span>

                        <span className="text-sky-400 text-sm font-semibold">
                          {item.total}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-800 bg-[#0d1117] p-2 sm:p-3 space-y-1.5 sm:space-y-2 flex-shrink-0">
          <button
            title={collapsed ? "Settings" : undefined}
            className="w-full h-12 rounded-xl flex items-center gap-4 px-4 text-gray-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FaCog />
            {!collapsed && <span>Settings</span>}
          </button>

          <button
            title={collapsed ? "Support" : undefined}
            className="w-full h-12 rounded-xl flex items-center gap-4 px-4 text-gray-400 hover:bg-slate-800 hover:text-white transition"
          >
            <FaQuestionCircle />
            {!collapsed && <span>Support</span>}
          </button>

          <button
            title={collapsed ? "Logout" : undefined}
            className="w-full h-12 rounded-xl flex items-center gap-4 px-4 text-red-400 hover:bg-red-500 hover:text-white transition"
          >
            <FaSignOutAlt />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>
    </>
  );
};

export default JournalSidebar;
