import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import API from "../../api/auth";
import { useTradingJournal } from "../../context/TradingJournalContext";

const currencySymbols = {
  ZAR: "R",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "CHF ",
  NZD: "NZ$",
  LSL: "M",
};

const CalendarDashboard = () => {
  const { currency, convertCurrency, selectedPeriod } = useTradingJournal();

  const [trades, setTrades] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

  const symbol = currencySymbols[currency] || currency;

  // =========================================================
  // FETCH TRADES
  // =========================================================

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const { data } = await API.get("/trades");
        setTrades(data);
      } catch (error) {
        console.error("Failed to load calendar trades:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  // =========================================================
  // CURRENT MONTH
  // =========================================================

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // =========================================================
  // FIRST DAY OF MONTH
  // =========================================================

  const firstDay = new Date(year, month, 1).getDay();

  // =========================================================
  // DAYS IN MONTH
  // =========================================================

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // =========================================================
  // GROUP TRADES BY DAY
  // =========================================================

  const tradesByDay = useMemo(() => {
    const grouped = {};

    trades.forEach((trade) => {
      if (!trade.openDate) return;

      const date = new Date(trade.openDate);

      if (date.getFullYear() !== year || date.getMonth() !== month) {
        return;
      }

      const day = date.getDate();

      if (!grouped[day]) {
        grouped[day] = [];
      }

      grouped[day].push(trade);
    });

    return grouped;
  }, [trades, year, month]);

  // =========================================================
  // GET DAY STATS
  // =========================================================

  const getDayStats = (day) => {
    const dayTrades = tradesByDay[day] || [];

    const profit = dayTrades.reduce((sum, trade) => {
      const originalCurrency = trade.currency || "ZAR";

      const convertedProfit = convertCurrency(
        trade.profit ?? 0,
        originalCurrency,
        currency,
      );

      return sum + Number(convertedProfit || 0);
    }, 0);

    const wins = dayTrades.filter((trade) => trade.result === "WIN").length;

    const losses = dayTrades.filter((trade) => trade.result === "LOSS").length;

    return {
      trades: dayTrades,
      total: dayTrades.length,
      profit,
      wins,
      losses,
    };
  };

  // =========================================================
  // MONTH NAVIGATION
  // =========================================================

  const previousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  };

  const goToday = () => {
    setCurrentDate(new Date());
    setSelectedDay(null);
  };

  // =========================================================
  // SELECTED DAY
  // =========================================================

  const selectedTrades = selectedDay ? tradesByDay[selectedDay] || [] : [];

  // =========================================================
  // SELECTED PERIOD LABEL
  // =========================================================

  const selectedPeriodLabel =
    selectedPeriod === "ALL"
      ? "No Trades"
      : selectedPeriod
        ? new Date(
            Number(selectedPeriod.split("-")[0]),
            Number(selectedPeriod.split("-")[1]) - 1,
          ).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })
        : "No Trades";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="w-full text-white">
      {/* Calendar Header */}
      <div className="mt-5 w-full rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 md:p-6 lg:p-6">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
          {/* Title */}
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <FaCalendarAlt className="flex-shrink-0 text-xl text-sky-400 sm:text-2xl" />

              <h1 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
                Trading Calendar
              </h1>

              <span className="text-base font-semibold text-sky-400 sm:text-lg lg:text-xl">
                {selectedPeriodLabel}
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
              Track your trading performance by day.
            </p>
          </div>

          {/* Actions */}
          <div className="flex w-full flex-col gap-2 sm:flex-row sm:gap-3 xl:w-auto">
            <button
              onClick={goToday}
              className="w-full rounded-xl bg-slate-800 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto sm:px-5 sm:text-base"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 sm:mt-6">
        {/* Month Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 p-3 sm:p-5">
          <button
            onClick={previousMonth}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 sm:h-10 sm:w-10"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>

          <h2 className="text-center text-base font-bold sm:text-xl">
            {monthName}
          </h2>

          <button
            onClick={nextMonth}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-slate-800 hover:bg-slate-700 sm:h-10 sm:w-10"
            aria-label="Next month"
          >
            <FaChevronRight className="text-sm sm:text-base" />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 border-b border-slate-800">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div
              key={day}
              className="py-2 text-center text-[10px] font-semibold text-slate-500 sm:py-3 sm:text-sm"
            >
              <span className="hidden sm:inline">{day}</span>

              <span className="sm:hidden">{day.charAt(0)}</span>
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7">
          {calendarDays.map((day, index) => {
            if (!day) {
              return (
                <div
                  key={`empty-${index}`}
                  className="min-h-[72px] border-b border-r border-slate-800 bg-slate-950/30 sm:min-h-[100px] lg:min-h-[120px]"
                />
              );
            }

            const stats = getDayStats(day);
            const hasTrades = stats.total > 0;

            const dayProfitClass =
              stats.profit > 0
                ? "text-green-400"
                : stats.profit < 0
                  ? "text-red-400"
                  : "text-slate-400";

            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`min-h-[72px] overflow-hidden border-b border-r border-slate-800 p-1.5 text-left transition hover:bg-slate-800/70 sm:min-h-[100px] sm:p-3 lg:min-h-[120px] ${
                  selectedDay === day
                    ? "bg-sky-500/10 ring-1 ring-inset ring-sky-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-xs font-semibold sm:text-sm lg:text-base">
                    {day}
                  </span>

                  {hasTrades && (
                    <span className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[9px] sm:rounded-lg sm:px-2 sm:py-1 sm:text-xs">
                      {stats.total}
                    </span>
                  )}
                </div>

                {hasTrades && (
                  <div className="mt-2 sm:mt-4 lg:mt-5">
                    <p
                      className={`truncate text-[10px] font-bold sm:text-sm lg:text-base ${dayProfitClass}`}
                    >
                      {symbol}
                      {stats.profit.toFixed(2)}
                    </p>

                    <p className="mt-1 truncate text-[9px] text-slate-500 sm:text-xs">
                      {stats.wins}W · {stats.losses}L
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day */}
      {selectedDay && (
        <div className="mt-5 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 sm:mt-8">
          <div className="border-b border-slate-800 p-4 sm:p-6">
            <h2 className="text-lg font-bold sm:text-xl">
              {currentDate.toLocaleString("en-US", {
                month: "long",
              })}{" "}
              {selectedDay}, {year}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {selectedTrades.length} trade
              {selectedTrades.length !== 1 ? "s" : ""}
            </p>
          </div>

          {selectedTrades.length === 0 ? (
            <div className="p-6 text-center text-slate-500 sm:p-8">
              No trades on this day.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {selectedTrades.map((trade) => {
                const originalCurrency = trade.currency || "ZAR";

                const convertedProfit = convertCurrency(
                  trade.profit ?? 0,
                  originalCurrency,
                  currency,
                );

                return (
                  <div
                    key={trade._id}
                    className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:p-5"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-base font-bold sm:text-lg">
                        {trade.pair}
                      </p>

                      <p className="truncate text-sm text-slate-400">
                        {trade.direction} · {trade.strategy}
                      </p>
                    </div>

                    <div className="flex-shrink-0 text-left sm:text-right">
                      <p
                        className={`text-base font-bold sm:text-lg ${
                          Number(convertedProfit) >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {symbol}
                        {Number(convertedProfit || 0).toFixed(2)}
                      </p>

                      <p className="text-xs text-slate-500">{trade.result}</p>

                      {/* Original amount */}
                      {originalCurrency !== currency && (
                        <p className="mt-1 text-xs text-slate-600">
                          Original:{" "}
                          {currencySymbols[originalCurrency] ||
                            originalCurrency}
                          {Number(trade.profit || 0).toFixed(2)}{" "}
                          {originalCurrency}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="mt-6 text-center text-slate-500">Loading trades...</p>
      )}
    </div>
  );
};

export default CalendarDashboard;
