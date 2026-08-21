import { useState, useEffect } from "react";
import {
  FaExchangeAlt,
  FaPercentage,
  FaDollarSign,
  FaBalanceScale,
  FaFire,
  FaChartLine,
  FaFolderOpen,
  FaTrophy,
  FaTimesCircle,
  FaEquals,
} from "react-icons/fa";
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

const StatsCards = ({ trades, currency = "ZAR" }) => {
  const { convertHistoricalCurrency } = useTradingJournal();

  const [stats, setStats] = useState([]);

  useEffect(() => {
    const calculateStats = async () => {
      if (!trades) return;

      const totalTrades = trades.length;

      const openTrades = trades.filter((t) => t.result === "OPEN").length;

      const winningTrades = trades.filter((t) => t.result === "WIN").length;

      const losingTrades = trades.filter((t) => t.result === "LOSS").length;

      const BETrades = trades.filter((t) => t.result === "BE").length;

      const wins = winningTrades;

      // Convert every trade using its original currency
      // and historical open date.
      const convertedProfits = await Promise.all(
        trades.map(async (trade) => {
          const profit = Number(trade.profit || 0);

          if (!profit) return 0;

          const tradeCurrency = trade.currency || "ZAR";

          return await convertHistoricalCurrency(
            profit,
            tradeCurrency,
            currency,
            trade.openDate,
          );
        }),
      );

      const netProfit = convertedProfits.reduce(
        (sum, profit) => sum + profit,
        0,
      );

      const grossProfit = convertedProfits
        .filter((profit) => profit > 0)
        .reduce((sum, profit) => sum + profit, 0);

      const grossLoss = Math.abs(
        convertedProfits
          .filter((profit) => profit < 0)
          .reduce((sum, profit) => sum + profit, 0),
      );

      const profitFactor =
        grossLoss === 0
          ? grossProfit > 0
            ? "∞"
            : "0.00"
          : (grossProfit / grossLoss).toFixed(2);

      const totalReward = trades.reduce(
        (sum, t) => sum + Number(t.reward || 0),
        0,
      );

      const averageRR =
        totalTrades > 0 ? (totalReward / totalTrades).toFixed(1) : 0;

      const winRate =
        totalTrades > 0 ? ((wins / totalTrades) * 100).toFixed(1) : 0;

      const closedTrades = trades
        .filter((t) => t.result !== "OPEN")
        .sort((a, b) => new Date(b.closeDate) - new Date(a.closeDate));

      let streak = 0;
      let streakType = "";

      if (closedTrades.length > 0) {
        streakType = closedTrades[0].result;

        for (const trade of closedTrades) {
          if (trade.result === streakType) {
            streak++;
          } else {
            break;
          }
        }
      }

      const currentStreak =
        streak > 0 ? `${streakType} ${streak}` : "No Trades";

      const symbol = currencySymbols[currency] || currency;

      setStats([
        {
          title: "Total Trades",
          value: totalTrades,
          icon: <FaExchangeAlt />,
          color: "text-sky-400",
        },
        {
          title: "Open Trades",
          value: openTrades,
          icon: <FaFolderOpen />,
          color: "text-cyan-400",
        },
        {
          title: "Winning Trades",
          value: winningTrades,
          icon: <FaTrophy />,
          color: "text-green-400",
        },
        {
          title: "Losing Trades",
          value: losingTrades,
          icon: <FaTimesCircle />,
          color: "text-red-400",
        },
        {
          title: "BE Trades",
          value: BETrades,
          icon: <FaEquals />,
          color: "text-gray-400",
        },
        {
          title: "Win Rate",
          value: `${winRate}%`,
          icon: <FaPercentage />,
          color: "text-green-400",
        },
        {
          title: "Net Profit",
          value: `${symbol}${netProfit.toFixed(2)}`,
          icon: <FaDollarSign />,
          color: netProfit >= 0 ? "text-emerald-400" : "text-red-400",
        },
        {
          title: "Profit Factor",
          value: profitFactor,
          icon: <FaChartLine />,
          color: "text-yellow-400",
        },
        {
          title: "Average R:R",
          value: `1 : ${averageRR}`,
          icon: <FaBalanceScale />,
          color: "text-purple-400",
        },
        {
          title: "Current Streak",
          value: currentStreak,
          icon: <FaFire />,
          color: "text-orange-400",
        },
      ]);
    };

    calculateStats();
  }, [trades, currency, convertHistoricalCurrency]);

  return (
    <section className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-6 sm:mt-9 w-full">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 sm:p-4 min-h-[100px] sm:h-[110px] hover:border-sky-500 hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex justify-between items-center h-full gap-2">
              <div className="min-w-0">
                <p className="text-slate-400 text-xs sm:text-sm mb-1 sm:mb-2 truncate">
                  {item.title}
                </p>

                <h2 className="text-lg sm:text-xl 2xl:text-2xl font-bold text-white truncate">
                  {item.value}
                </h2>
              </div>

              <div
                className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-slate-800 flex items-center justify-center text-base sm:text-lg ${item.color}`}
              >
                {item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsCards;
