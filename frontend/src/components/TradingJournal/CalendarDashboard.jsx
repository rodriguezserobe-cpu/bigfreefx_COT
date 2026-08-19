import { useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt } from "react-icons/fa";
import API from "../../api/auth";
import { useTradingJournal } from "../../context/TradingJournalContext";

const CalendarDashboard = () => {
  const { currency, selectedPeriod } = useTradingJournal();

  const [trades, setTrades] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const symbol = currencySymbols[currency] || currency;

  // Fetch trades
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  // First day of month
  const firstDay = new Date(year, month, 1).getDay();

  // Number of days in month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Group trades by date
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

  const getDayStats = (day) => {
    const dayTrades = tradesByDay[day] || [];

    const profit = dayTrades.reduce(
      (sum, trade) => sum + Number(trade.profit || 0),
      0,
    );

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

  const selectedTrades = selectedDay ? tradesByDay[selectedDay] || [] : [];

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

  return (
    <div className="w-full text-white">
      {/* Calendar Header */}
      <div className="w-full mt-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 md:p-6 lg:p-6">
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">
          {/* Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <FaCalendarAlt className="text-sky-400 text-xl sm:text-2xl flex-shrink-0" />

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white">
                Trading Calendar
              </h1>

              <span className="text-base sm:text-lg lg:text-xl font-semibold text-sky-400">
                {selectedPeriodLabel}
              </span>
            </div>

            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Track your trading performance by day.
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full xl:w-auto">
            <button
              onClick={goToday}
              className="w-full sm:w-auto px-4 sm:px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-white font-semibold text-sm sm:text-base"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-5 sm:mt-6 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
        {/* Month Header */}
        <div className="flex items-center justify-between gap-3 p-3 sm:p-5 border-b border-slate-800">
          <button
            onClick={previousMonth}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center flex-shrink-0"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-sm sm:text-base" />
          </button>

          <h2 className="text-base sm:text-xl font-bold text-center">
            {monthName}
          </h2>

          <button
            onClick={nextMonth}
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 hover:bg-slate-700 flex items-center justify-center flex-shrink-0"
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
              className="py-2 sm:py-3 text-center text-[10px] sm:text-sm text-slate-500 font-semibold"
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
                  className="min-h-[72px] sm:min-h-[100px] lg:min-h-[120px] border-r border-b border-slate-800 bg-slate-950/30"
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
                className={`min-h-[72px] sm:min-h-[100px] lg:min-h-[120px] p-1.5 sm:p-3 text-left border-r border-b border-slate-800 hover:bg-slate-800/70 transition overflow-hidden ${
                  selectedDay === day
                    ? "bg-sky-500/10 ring-1 ring-inset ring-sky-500"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="font-semibold text-xs sm:text-sm lg:text-base">
                    {day}
                  </span>

                  {hasTrades && (
                    <span className="text-[9px] sm:text-xs bg-slate-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md sm:rounded-lg">
                      {stats.total}
                    </span>
                  )}
                </div>

                {hasTrades && (
                  <div className="mt-2 sm:mt-4 lg:mt-5">
                    <p
                      className={`font-bold text-[10px] sm:text-sm lg:text-base truncate ${dayProfitClass}`}
                    >
                      {symbol}
                      {stats.profit.toFixed(2)}
                    </p>

                    <p className="text-[9px] sm:text-xs text-slate-500 mt-1 truncate">
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
        <div className="mt-5 sm:mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-800">
            <h2 className="text-lg sm:text-xl font-bold">
              {currentDate.toLocaleString("en-US", {
                month: "long",
              })}{" "}
              {selectedDay}, {year}
            </h2>

            <p className="text-sm text-slate-400 mt-1">
              {selectedTrades.length} trade
              {selectedTrades.length !== 1 ? "s" : ""}
            </p>
          </div>

          {selectedTrades.length === 0 ? (
            <div className="p-6 sm:p-8 text-center text-slate-500">
              No trades on this day.
            </div>
          ) : (
            <div className="divide-y divide-slate-800">
              {selectedTrades.map((trade) => (
                <div
                  key={trade._id}
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-5"
                >
                  <div className="min-w-0">
                    <p className="font-bold text-base sm:text-lg truncate">
                      {trade.pair}
                    </p>

                    <p className="text-sm text-slate-400 truncate">
                      {trade.direction} · {trade.strategy}
                    </p>
                  </div>

                  <div className="text-left sm:text-right flex-shrink-0">
                    <p
                      className={`font-bold text-base sm:text-lg ${
                        Number(trade.profit) >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {symbol}
                      {Number(trade.profit || 0).toFixed(2)}
                    </p>

                    <p className="text-xs text-slate-500">{trade.result}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {loading && (
        <p className="text-center text-slate-500 mt-6">Loading trades...</p>
      )}
    </div>
  );
};

export default CalendarDashboard;
