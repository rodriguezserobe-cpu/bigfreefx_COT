import { useEffect, useRef, useState } from "react";
import { useTradingJournal } from "../../context/TradingJournalContext";

import JournalSidebar from "../../components/TradingJournal/JournalSidebar";
import JournalNavbar from "../../components/TradingJournal/JournalNavbar";
import StatsCards from "../../components/TradingJournal/StatsCards";
import TradesTable from "../../components/TradingJournal/TradesTable";
import TradeCards from "../../components/TradingJournal/TradeCard";
import AddTradeModal from "../../components/TradingJournal/AddTradeModal";
import AnalyticsDashboard from "../../components/TradingJournal/AnalyticsDashboard";
import CalendarDashboard from "../../components/TradingJournal/CalendarDashboard";
import GoalsDashboard from "../../components/TradingJournal/GoalsDashboard";

const StatsLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-28 rounded-2xl bg-[#0d1117] border border-slate-800 animate-pulse"
        />
      ))}
    </div>
  );
};

const TradingHistoryLoading = () => {
  return (
    <div className="rounded-2xl bg-[#0d1117] border border-slate-800 overflow-hidden">
      <div className="h-14 bg-slate-800/40 animate-pulse" />

      <div className="space-y-3 p-4">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="h-12 rounded-lg bg-slate-800/40 animate-pulse"
          />
        ))}
      </div>
    </div>
  );
};

const TradingHistoryError = ({ error, onRetry }) => {
  return (
    <div className="rounded-2xl bg-[#0d1117] border border-red-500/20 p-8 text-center">
      <p className="text-red-400 font-semibold mb-2">
        Unable to load trading history
      </p>

      <p className="text-gray-500 text-sm mb-5">
        {error || "Something went wrong while loading your trades."}
      </p>

      <button
        onClick={onRetry}
        className="px-5 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition"
      >
        Retry
      </button>
    </div>
  );
};

const TradingJournalDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [view, setView] = useState("table");

  const [openAddTrade, setOpenAddTrade] = useState(false);

  /*
   * Prevent the latest period from being selected again
   * every time the trades array changes.
   */
  const periodInitialized = useRef(false);

  const {
    selectedPeriod,
    setSelectedPeriod,
    currency,
    trades,
    tradesLoading,
    tradesError,
    fetchTrades,
  } = useTradingJournal();

  /*
   * Restore the user's preferred table/card view.
   */
  useEffect(() => {
    const savedView = localStorage.getItem("journalView");

    if (savedView === "table" || savedView === "cards") {
      setView(savedView);
    }
  }, []);

  /*
   * Refresh trades when the browser/app becomes visible again.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        fetchTrades();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [fetchTrades]);

  /*
   * Automatically select the latest trading period
   * that contains a trade.
   *
   * Example:
   * September 2026 = latest month
   * August 2026 = older month
   *
   * September will automatically be selected.
   */
  useEffect(() => {
    if (
      periodInitialized.current ||
      tradesLoading ||
      !trades ||
      trades.length === 0
    ) {
      return;
    }

    const validTrades = trades.filter((trade) => trade.openDate);

    if (validTrades.length === 0) {
      return;
    }

    const latestTrade = [...validTrades].sort(
      (a, b) => new Date(b.openDate).getTime() - new Date(a.openDate).getTime(),
    )[0];

    const latestDate = new Date(latestTrade.openDate);

    const latestPeriod = `${latestDate.getFullYear()}-${String(
      latestDate.getMonth() + 1,
    ).padStart(2, "0")}`;

    setSelectedPeriod(latestPeriod);

    periodInitialized.current = true;
  }, [trades, tradesLoading, setSelectedPeriod]);

  /*
   * FILTER TRADES BY SELECTED TRADING PERIOD.
   *
   * There is NO "ALL" Trading Period.
   *
   * The selected period might be:
   * 2026-09
   * 2026-08
   * 2026-07
   *
   * Only trades belonging to that month are displayed.
   */
  const periodTrades = trades.filter((trade) => {
    if (!trade.openDate || !selectedPeriod) {
      return false;
    }

    const date = new Date(trade.openDate);

    const period = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}`;

    return period === selectedPeriod;
  });

  /*
   * Search and status filtering happens AFTER
   * the Trading Period filter.
   *
   * This means the user can NEVER accidentally see
   * trades from another trading period.
   */
  const filteredTrades = periodTrades.filter((trade) => {
    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      !search ||
      trade.pair?.toLowerCase().includes(search) ||
      trade.strategy?.toLowerCase().includes(search) ||
      trade.direction?.toLowerCase().includes(search) ||
      trade.notes?.toLowerCase().includes(search);

    const matchesFilter =
      filter === "ALL" || trade.result?.toUpperCase() === filter;

    return matchesSearch && matchesFilter;
  });

  /*
   * Change between table and card views.
   */
  const changeView = (newView) => {
    setView(newView);
    localStorage.setItem("journalView", newView);
  };

  /*
   * Convert YYYY-MM into a readable month name.
   */
  const formatPeriod = (period) => {
    if (!period) {
      return "";
    }

    const [year, month] = period.split("-");

    return new Date(Number(year), Number(month) - 1).toLocaleDateString(
      "en-US",
      {
        month: "long",
        year: "numeric",
      },
    );
  };

  return (
    <div className="min-h-screen bg-[#080c12] text-white">
      {/* Sidebar */}
      <JournalSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onAddTrade={() => setOpenAddTrade(true)}
        trades={trades}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Area */}
      <div
        className={`min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* Navbar */}
        <JournalNavbar
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filter={filter}
          setFilter={setFilter}
          showFilter={showFilter}
          setShowFilter={setShowFilter}
          view={view}
          setView={changeView}
          currency={currency}
          selectedPeriod={selectedPeriod}
          formatPeriod={formatPeriod}
        />

        {/* Content */}
        <main className="p-3 sm:p-5 lg:p-6">
          {/* Dashboard */}
          {activeSection === "dashboard" && (
            <div className="space-y-5">
              {/* Current Trading Period */}
              {selectedPeriod && (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Trading Period
                    </p>

                    <h1 className="text-xl sm:text-2xl font-bold text-white">
                      {formatPeriod(selectedPeriod)}
                    </h1>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-slate-500">Trades</p>

                    <p className="text-lg font-bold text-sky-400">
                      {periodTrades.length}
                    </p>
                  </div>
                </div>
              )}

              {/* Stats */}
              {tradesLoading ? (
                <StatsLoading />
              ) : (
                <StatsCards trades={filteredTrades} currency={currency} />
              )}

              {/* Trading History */}
              {tradesLoading ? (
                <TradingHistoryLoading />
              ) : tradesError ? (
                <TradingHistoryError
                  error={tradesError}
                  onRetry={fetchTrades}
                />
              ) : view === "table" ? (
                <TradesTable
                  trades={filteredTrades}
                  currency={currency}
                  searchTerm={searchTerm}
                />
              ) : (
                <TradeCards trades={filteredTrades} currency={currency} />
              )}
            </div>
          )}

          {/* Analytics */}
          {activeSection === "analytics" && (
            <AnalyticsDashboard trades={periodTrades} currency={currency} />
          )}

          {/* Calendar */}
          {activeSection === "calendar" && (
            <CalendarDashboard
              trades={trades}
              currency={currency}
              onBack={() => setActiveSection("dashboard")}
            />
          )}

          {/* Goals */}
          {activeSection === "goals" && (
            <GoalsDashboard trades={trades} currency={currency} />
          )}
        </main>
      </div>

      {/* Add Trade Modal */}
      {openAddTrade && (
        <AddTradeModal
          open={openAddTrade}
          onClose={() => setOpenAddTrade(false)}
          onSaved={() => {
            fetchTrades();
          }}
        />
      )}
    </div>
  );
};

export default TradingJournalDashboard;
