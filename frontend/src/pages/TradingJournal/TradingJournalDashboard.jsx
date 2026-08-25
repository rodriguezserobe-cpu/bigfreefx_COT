import { useEffect, useState } from "react";
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

// ============================================================
// STATS LOADING
// IMPORTANT: KEEP THIS OUTSIDE TradingJournalDashboard
// ============================================================

const StatsLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5 animate-pulse"
        >
          <div className="flex items-center justify-between">
            <div className="h-4 w-24 rounded bg-slate-700" />
            <div className="h-10 w-10 rounded-xl bg-slate-800" />
          </div>

          <div className="mt-5 h-8 w-28 rounded bg-slate-700" />

          <div className="mt-3 h-3 w-20 rounded bg-slate-800" />
        </div>
      ))}
    </div>
  );
};

// ============================================================
// TRADING HISTORY LOADING
// IMPORTANT: KEEP THIS OUTSIDE TradingJournalDashboard
// ============================================================

const TradingHistoryLoading = () => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8">
      <div className="relative h-14 w-14">
        <div className="absolute inset-0 rounded-full border-4 border-slate-700" />

        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-sky-400 animate-spin" />
      </div>

      <h3 className="mt-6 text-lg sm:text-xl font-semibold text-white">
        Loading Trading History...
      </h3>

      <p className="mt-2 text-sm text-slate-400 text-center">
        Connecting to your trading data...
      </p>

      <p className="mt-1 text-xs text-slate-500 text-center">
        The server may be waking up. This can take a moment.
      </p>
    </div>
  );
};

// ============================================================
// TRADING HISTORY ERROR
// IMPORTANT: KEEP THIS OUTSIDE TradingJournalDashboard
// ============================================================

const TradingHistoryError = ({ error, onRetry }) => {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center">
        <span className="text-red-400 text-2xl">!</span>
      </div>

      <h3 className="mt-5 text-lg sm:text-xl font-semibold text-white">
        Unable to Load Trading History
      </h3>

      <p className="mt-2 max-w-md text-sm text-slate-400">
        {typeof error === "string"
          ? error
          : "We could not connect to your trading data."}
      </p>

      <button
        onClick={onRetry}
        className="mt-6 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600"
      >
        Try Again
      </button>
    </div>
  );
};

// ============================================================
// TRADING JOURNAL DASHBOARD
// ============================================================

const TradingJournalDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);

  const [activeSection, setActiveSection] = useState("dashboard");

  const [view, setView] = useState("table");
  const [openAddTrade, setOpenAddTrade] = useState(false);

  const {
    selectedPeriod,
    setSelectedPeriod,
    currency,
    trades,
    tradesLoading,
    tradesError,
    fetchTrades,
  } = useTradingJournal();

  // ============================================================
  // LOAD SAVED VIEW
  // ============================================================

  useEffect(() => {
    const savedView = localStorage.getItem("journalView");

    if (savedView === "table" || savedView === "cards") {
      setView(savedView);
    }
  }, []);

  // ============================================================
  // REFRESH WHEN JOURNAL BECOMES ACTIVE
  // ============================================================

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

  // ============================================================
  // PERIOD TRADES
  // ============================================================

  const periodTrades =
    selectedPeriod === "ALL"
      ? trades
      : trades.filter((trade) => {
          if (!trade.openDate) return false;

          const date = new Date(trade.openDate);

          const period = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
          ).padStart(2, "0")}`;

          return period === selectedPeriod;
        });

  // ============================================================
  // CHANGE VIEW
  // ============================================================

  const changeView = (selectedView) => {
    setView(selectedView);
    localStorage.setItem("journalView", selectedView);
  };

  // ============================================================
  // FORMAT PERIOD
  // ============================================================

  const formatPeriod = (period) => {
    if (!period || period === "ALL") {
      return "All Time";
    }

    const [year, month] = period.split("-");

    const date = new Date(Number(year), Number(month) - 1);

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (
    <div className="bg-[#0B1120] min-h-screen w-full text-white overflow-x-hidden">
      {/* ========================================================
          SIDEBAR
      ======================================================== */}

      <JournalSidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onAddTrade={() => setOpenAddTrade(true)}
        trades={trades}
        selectedPeriod={selectedPeriod}
        onSelectPeriod={setSelectedPeriod}
      />

      {/* ========================================================
          MAIN AREA
      ======================================================== */}

      <div
        className={`min-w-0 transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-72"
        }`}
      >
        {/* ======================================================
            NAVBAR
        ====================================================== */}

        <JournalNavbar
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeSection={activeSection}
        />

        {/* ======================================================
            CONTENT
        ====================================================== */}

        <main className="pt-27 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-8 2xl:pb-12 w-full">
          {/* ====================================================
              DASHBOARD
          ==================================================== */}

          {activeSection === "dashboard" && (
            <>
              {/* ==================================================
                  STATS CARDS
                  Header/sidebar remain visible while this loads.
              ================================================== */}

              <div className="w-full">
                {tradesLoading ? (
                  <StatsLoading />
                ) : tradesError ? (
                  <StatsLoading />
                ) : (
                  <StatsCards trades={periodTrades} currency={currency} />
                )}
              </div>

              {/* ==================================================
                  TRADING JOURNAL
              ================================================== */}

              <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 min-h-[500px] sm:min-h-[600px] p-3 sm:p-5 md:p-6 xl:p-8 2xl:p-10 w-full">
                {/* ==================================================
                    JOURNAL HEADER
                ================================================== */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white break-words">
                      Trading Journal
                      <span className="block sm:inline sm:ml-6 md:ml-8 mt-1 sm:mt-0 text-slate-400 text-base sm:text-lg 2xl:text-xl font-medium">
                        {formatPeriod(selectedPeriod)}
                      </span>
                    </h2>
                  </div>

                  {/* ==================================================
                      VIEW BUTTONS
                  ================================================== */}

                  <div className="flex w-full md:w-auto items-center gap-2">
                    <button
                      onClick={() => changeView("table")}
                      className={`flex-1 md:flex-none px-3 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                        view === "table"
                          ? "bg-sky-500 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      Table View
                    </button>

                    <button
                      onClick={() => changeView("cards")}
                      className={`flex-1 md:flex-none px-3 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${
                        view === "cards"
                          ? "bg-sky-500 text-white"
                          : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                      }`}
                    >
                      Cards View
                    </button>
                  </div>
                </div>

                {/* ==================================================
                    TRADING HISTORY
                ================================================== */}

                <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden w-full">
                  {/* ==================================================
                      HISTORY HEADER
                  ================================================== */}

                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 sm:p-5 md:p-6 border-b border-slate-800">
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white">
                        Trading History
                      </h2>

                      <p className="text-slate-400 mt-1 text-sm sm:text-base">
                        View and manage all recorded trades.
                      </p>
                    </div>

                    {/* ==================================================
                        CONTROLS
                    ================================================== */}

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
                      {/* SEARCH */}

                      <div className="flex items-center bg-slate-800 rounded-xl px-4 h-11 w-full sm:w-[220px] lg:w-[230px] 2xl:w-[280px]">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full min-w-0"
                        />
                      </div>

                      {/* FILTER */}

                      <div className="relative w-full sm:w-auto">
                        <button
                          onClick={() => setShowFilter(!showFilter)}
                          className="h-11 px-5 w-full sm:w-auto rounded-xl bg-slate-800 hover:bg-slate-700 transition"
                        >
                          Filter
                        </button>

                        {showFilter && (
                          <div className="absolute left-0 sm:left-auto sm:right-0 mt-2 w-full sm:w-48 max-h-72 overflow-y-auto rounded-xl border border-slate-700 bg-slate-900 shadow-lg z-50">
                            {[
                              "ALL",
                              "OPEN",
                              "CLOSED",
                              "WIN",
                              "LOSS",
                              "BE",
                              "BUY",
                              "SELL",
                            ].map((item) => (
                              <button
                                key={item}
                                onClick={() => {
                                  setFilter(item);
                                  setShowFilter(false);
                                }}
                                className={`block w-full px-4 py-3 text-left hover:bg-slate-800 ${
                                  filter === item
                                    ? "text-sky-400"
                                    : "text-white"
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* ADD TRADE */}

                      <button
                        onClick={() => setOpenAddTrade(true)}
                        className="h-11 px-5 w-full sm:w-auto rounded-xl bg-sky-500 hover:bg-sky-600 transition whitespace-nowrap"
                      >
                        + Add Trade
                      </button>
                    </div>
                  </div>

                  {/* ==================================================
                      TABLE / CARDS
                  ================================================== */}

                  <div className="w-full min-w-0">
                    {tradesLoading ? (
                      <TradingHistoryLoading />
                    ) : tradesError ? (
                      <TradingHistoryError
                        error={tradesError}
                        onRetry={fetchTrades}
                      />
                    ) : view === "table" ? (
                      <div className="w-full overflow-x-auto">
                        <TradesTable
                          trades={periodTrades}
                          searchTerm={searchTerm}
                          filter={filter}
                          currency={currency}
                          onRefresh={fetchTrades}
                        />
                      </div>
                    ) : (
                      <TradeCards
                        trades={periodTrades}
                        searchTerm={searchTerm}
                        filter={filter}
                        currency={currency}
                        onRefresh={fetchTrades}
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ========================================================
              ANALYTICS
          ======================================================== */}

          {activeSection === "analytics" && <AnalyticsDashboard />}

          {/* ========================================================
              CALENDAR
          ======================================================== */}

          {activeSection === "calendar" && <CalendarDashboard />}

          {/* ========================================================
              GOALS
          ======================================================== */}

          {activeSection === "goals" && <GoalsDashboard />}
        </main>
      </div>

      {/* ==========================================================
          ADD TRADE MODAL
      ========================================================== */}

      <AddTradeModal
        open={openAddTrade}
        onClose={() => setOpenAddTrade(false)}
        onSaved={fetchTrades}
      />
    </div>
  );
};

export default TradingJournalDashboard;
