import { useState, useEffect } from "react";
import { useTradingJournal } from "../../context/TradingJournalContext";
import API from "../../api/auth";

import JournalSidebar from "../../components/TradingJournal/JournalSidebar";
import JournalNavbar from "../../components/TradingJournal/JournalNavbar";
import StatsCards from "../../components/TradingJournal/StatsCards";
import TradesTable from "../../components/TradingJournal/TradesTable";
import TradeCards from "../../components/TradingJournal/TradeCard";
import AddTradeModal from "../../components/TradingJournal/AddTradeModal";
import AnalyticsDashboard from "../../components/TradingJournal/AnalyticsDashboard";
import CalendarDashboard from "../../components/TradingJournal/CalendarDashboard";
import GoalsDashboard from "../../components/TradingJournal/GoalsDashboard";

const TradingJournalDashboard = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("ALL");
  const [showFilter, setShowFilter] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const { selectedPeriod, setSelectedPeriod, currency } = useTradingJournal();

  const [view, setView] = useState("table");
  const [openAddTrade, setOpenAddTrade] = useState(false);
  const [trades, setTrades] = useState([]);

  const fetchTrades = async () => {
    try {
      const { data } = await API.get("/trades");
      setTrades(data);

      if (data.length > 0) {
        const latestTrade = [...data].sort(
          (a, b) => new Date(b.openDate) - new Date(a.openDate),
        )[0];
        const latestDate = new Date(latestTrade.openDate);
        const latestPeriod = `${latestDate.getFullYear()}-${String(latestDate.getMonth() + 1).padStart(2, "0")}`;

        setSelectedPeriod(latestPeriod);
      } else {
        setSelectedPeriod("ALL");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const periodTrades =
    selectedPeriod === "ALL"
      ? trades
      : trades.filter((trade) => {
          if (!trade.openDate) return false;

          const date = new Date(trade.openDate);
          const period = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

          return period === selectedPeriod;
        });

  useEffect(() => {
    const savedView = localStorage.getItem("journalView");

    if (savedView) {
      setView(savedView);
    }

    fetchTrades();
  }, []);

  const changeView = (selectedView) => {
    setView(selectedView);
    localStorage.setItem("journalView", selectedView);
  };

  const formatPeriod = (period) => {
    if (!period || period === "ALL") return "No Trades";

    const [year, month] = period.split("-");
    const date = new Date(Number(year), Number(month) - 1);

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-[#0B1120] min-h-screen w-full text-white overflow-x-hidden">
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

      <div
        className={`min-w-0 transition-all duration-300 ${collapsed ? "lg:ml-20" : "lg:ml-72"}`}
      >
        <JournalNavbar
          collapsed={collapsed}
          setMobileOpen={setMobileOpen}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          activeSection={activeSection}
        />

        <main className="pt-27 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 pb-8 2xl:pb-12 w-full">
          {activeSection === "dashboard" && (
            <>
              <div className="w-full">
                <StatsCards trades={periodTrades} currency={currency} />
              </div>

              <div className="mt-6 sm:mt-8 rounded-2xl border border-slate-800 bg-slate-900/60 min-h-[500px] sm:min-h-[600px] p-3 sm:p-5 md:p-6 xl:p-8 2xl:p-10 w-full">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8 gap-4">
                  <div className="min-w-0">
                    <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white break-words">
                      Trading Journal
                      {selectedPeriod && (
                        <span className="block sm:inline sm:ml-6 md:ml-8 mt-1 sm:mt-0 text-slate-400 text-base sm:text-lg 2xl:text-xl font-medium">
                          {formatPeriod(selectedPeriod)}
                        </span>
                      )}
                    </h2>
                  </div>

                  <div className="flex w-full md:w-auto items-center gap-2">
                    <button
                      onClick={() => changeView("table")}
                      className={`flex-1 md:flex-none px-3 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${view === "table" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                    >
                      Table View
                    </button>

                    <button
                      onClick={() => changeView("cards")}
                      className={`flex-1 md:flex-none px-3 sm:px-5 py-2 rounded-lg font-medium text-sm sm:text-base transition-all whitespace-nowrap ${view === "cards" ? "bg-sky-500 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
                    >
                      Cards View
                    </button>
                  </div>
                </div>

                <div className="mt-4 sm:mt-6 rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden w-full">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 sm:p-5 md:p-6 border-b border-slate-800">
                    <div className="min-w-0">
                      <h2 className="text-xl sm:text-2xl 2xl:text-3xl font-bold text-white">
                        Trading History
                      </h2>

                      <p className="text-slate-400 mt-1 text-sm sm:text-base">
                        View and manage all recorded trades.
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
                      <div className="flex items-center bg-slate-800 rounded-xl px-4 h-11 w-full sm:w-[220px] lg:w-[230px] 2xl:w-[280px]">
                        <input
                          type="text"
                          placeholder="Search..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-transparent outline-none text-white placeholder:text-slate-500 w-full min-w-0"
                        />
                      </div>

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
                                className={`block w-full px-4 py-3 text-left hover:bg-slate-800 ${filter === item ? "text-sky-400" : "text-white"}`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      <button
                        onClick={() => setOpenAddTrade(true)}
                        className="h-11 px-5 w-full sm:w-auto rounded-xl bg-sky-500 hover:bg-sky-600 transition whitespace-nowrap"
                      >
                        + Add Trade
                      </button>
                    </div>
                  </div>

                  <div className="w-full min-w-0">
                    {view === "table" ? (
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

          {activeSection === "analytics" && <AnalyticsDashboard />}

          {activeSection === "calendar" && <CalendarDashboard />}

          {activeSection === "goals" && <GoalsDashboard />}
        </main>
      </div>

      <AddTradeModal
        open={openAddTrade}
        onClose={() => setOpenAddTrade(false)}
        onSaved={fetchTrades}
      />
    </div>
  );
};

export default TradingJournalDashboard;
