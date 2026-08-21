import { useEffect, useState } from "react";
import API from "../../api/auth";
import { useTradingJournal } from "../../context/TradingJournalContext";

import EquityCurve from "../../components/TradingJournal/EquityCurve";
import MonthlyPerformanceChart from "../../components/TradingJournal/MonthlyPerformanceChart";
import WinLossPieChart from "../../components/TradingJournal/WinLossPieChart";

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

const AnalyticsDashboard = () => {
  const [trades, setTrades] = useState([]);

  const { selectedPeriod, currency, convertCurrency, ratesLoading } =
    useTradingJournal();

  useEffect(() => {
    fetchTrades();
  }, []);

  const fetchTrades = async () => {
    try {
      const { data } = await API.get("/trades");
      setTrades(data);
    } catch (error) {
      console.log(error);
    }
  };

  // =========================================================
  // CONVERT TRADE PROFITS
  // =========================================================

  const convertedTrades = trades.map((trade) => {
    const originalCurrency = trade.currency || "ZAR";

    const convertedProfit = convertCurrency(
      trade.profit ?? 0,
      originalCurrency,
      currency,
    );

    return {
      ...trade,
      profit: Number(convertedProfit || 0),
    };
  });

  // =========================================================
  // PERIOD TRADES
  // =========================================================

  const periodTrades =
    selectedPeriod === "ALL"
      ? convertedTrades
      : convertedTrades.filter((trade) => {
          if (!trade.openDate) return false;

          const date = new Date(trade.openDate);

          const tradePeriod = `${date.getFullYear()}-${String(
            date.getMonth() + 1,
          ).padStart(2, "0")}`;

          return tradePeriod === selectedPeriod;
        });

  // =========================================================
  // CLOSED TRADES
  // =========================================================

  const closedTrades = periodTrades.filter((t) => t.result !== "OPEN");

  // =========================================================
  // TOTAL PROFIT
  // =========================================================

  const totalProfit = closedTrades
    .filter((t) => Number(t.profit) > 0)
    .reduce((sum, t) => sum + Number(t.profit), 0);

  // =========================================================
  // TOTAL LOSS
  // =========================================================

  const totalLoss = Math.abs(
    closedTrades
      .filter((t) => Number(t.profit) < 0)
      .reduce((sum, t) => sum + Number(t.profit), 0),
  );

  // =========================================================
  // CURRENT STREAK
  // =========================================================

  const getCurrentStreak = () => {
    if (closedTrades.length === 0) {
      return "No Trades";
    }

    const sortedTrades = [...closedTrades].sort(
      (a, b) => new Date(b.closeDate) - new Date(a.closeDate),
    );

    const latestResult = sortedTrades[0].result;

    let streak = 0;

    for (const trade of sortedTrades) {
      if (trade.result === latestResult) {
        streak++;
      } else {
        break;
      }
    }

    return `${latestResult} ${streak}`;
  };

  const currentStreak = getCurrentStreak();

  // =========================================================
  // WIN RATE
  // =========================================================

  const winningTrades = closedTrades.filter((t) => t.result === "WIN");

  const winRate =
    closedTrades.length > 0
      ? ((winningTrades.length / closedTrades.length) * 100).toFixed(1)
      : "0.0";

  // =========================================================
  // PROFIT FACTOR
  // =========================================================

  const profitFactor =
    totalLoss > 0
      ? (totalProfit / totalLoss).toFixed(2)
      : totalProfit > 0
        ? "∞"
        : "0.00";

  // =========================================================
  // BIGGEST WIN
  // =========================================================

  const biggestWin =
    closedTrades.filter((t) => Number(t.profit) > 0).length > 0
      ? Math.max(
          ...closedTrades
            .filter((t) => Number(t.profit) > 0)
            .map((t) => Number(t.profit)),
        )
      : 0;

  // =========================================================
  // BIGGEST LOSS
  // =========================================================

  const biggestLoss =
    closedTrades.filter((t) => Number(t.profit) < 0).length > 0
      ? Math.min(
          ...closedTrades
            .filter((t) => Number(t.profit) < 0)
            .map((t) => Number(t.profit)),
        )
      : 0;

  // =========================================================
  // PERFORMANCE CALCULATION
  // =========================================================

  const calculatePerformance = (items) => {
    const wins = items.filter((t) => t.result === "WIN");
    const losses = items.filter((t) => t.result === "LOSS");

    const profit = wins.reduce(
      (sum, t) => sum + Math.max(Number(t.profit), 0),
      0,
    );

    const loss = Math.abs(
      losses.reduce((sum, t) => sum + Math.min(Number(t.profit), 0), 0),
    );

    const netProfit = profit - loss;

    const winRate = items.length > 0 ? (wins.length / items.length) * 100 : 0;

    const profitFactor = loss > 0 ? profit / loss : profit > 0 ? 5 : 0;

    return {
      trades: items.length,
      wins: wins.length,
      losses: losses.length,
      winRate,
      profitFactor,
      netProfit,
    };
  };

  // =========================================================
  // PAIR PERFORMANCE
  // =========================================================

  const getPairPerformance = () => {
    const pairs = {};

    closedTrades.forEach((trade) => {
      if (!trade.pair) return;

      if (!pairs[trade.pair]) {
        pairs[trade.pair] = [];
      }

      pairs[trade.pair].push(trade);
    });

    return Object.entries(pairs).map(([pair, pairTrades]) => ({
      pair,
      ...calculatePerformance(pairTrades),
    }));
  };

  const pairPerformance = getPairPerformance();

  // =========================================================
  // BEST PAIR
  // =========================================================

  const getBestPair = () => {
    const profitablePairs = pairPerformance.filter(
      (pair) => pair.netProfit > 0,
    );

    if (profitablePairs.length === 0) return null;

    const sorted = [...profitablePairs].sort((a, b) => {
      const scoreA = a.winRate * Math.sqrt(a.trades);
      const scoreB = b.winRate * Math.sqrt(b.trades);

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      if (b.profitFactor !== a.profitFactor) {
        return b.profitFactor - a.profitFactor;
      }

      return b.netProfit - a.netProfit;
    });

    return sorted[0];
  };

  const bestPair = getBestPair();

  // =========================================================
  // WORST PAIR
  // =========================================================

  const getWorstPair = () => {
    const losingPairs = pairPerformance.filter((pair) => pair.netProfit < 0);

    if (losingPairs.length === 0) return null;

    const sorted = [...losingPairs].sort((a, b) => {
      const lossRateA = a.trades > 0 ? (a.losses / a.trades) * 100 : 0;

      const lossRateB = b.trades > 0 ? (b.losses / b.trades) * 100 : 0;

      const scoreA = lossRateA * Math.sqrt(a.trades);
      const scoreB = lossRateB * Math.sqrt(b.trades);

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      if (a.profitFactor !== b.profitFactor) {
        return a.profitFactor - b.profitFactor;
      }

      return a.netProfit - b.netProfit;
    });

    return sorted[0];
  };

  const worstPair = getWorstPair();

  // =========================================================
  // STRATEGY PERFORMANCE
  // =========================================================

  const getStrategyPerformance = () => {
    const strategies = {};

    closedTrades.forEach((trade) => {
      if (!trade.strategy) return;

      if (!strategies[trade.strategy]) {
        strategies[trade.strategy] = [];
      }

      strategies[trade.strategy].push(trade);
    });

    return Object.entries(strategies).map(([strategy, strategyTrades]) => ({
      strategy,
      ...calculatePerformance(strategyTrades),
    }));
  };

  const strategyPerformance = getStrategyPerformance();

  // =========================================================
  // BEST STRATEGY
  // =========================================================

  const getBestStrategy = () => {
    const profitableStrategies = strategyPerformance.filter(
      (strategy) => strategy.netProfit > 0,
    );

    if (profitableStrategies.length === 0) return null;

    const sorted = [...profitableStrategies].sort((a, b) => {
      const scoreA = a.winRate * Math.sqrt(a.trades);
      const scoreB = b.winRate * Math.sqrt(b.trades);

      if (scoreB !== scoreA) {
        return scoreB - scoreA;
      }

      if (b.profitFactor !== a.profitFactor) {
        return b.profitFactor - a.profitFactor;
      }

      return b.netProfit - a.netProfit;
    });

    return sorted[0];
  };

  const bestStrategy = getBestStrategy();

  const symbol = currencySymbols[currency] || currency;

  // =========================================================
  // PERIOD LABEL
  // =========================================================

  const periodLabel =
    selectedPeriod === "ALL"
      ? "All Time"
      : (() => {
          const [year, month] = selectedPeriod.split("-");

          return new Date(Number(year), Number(month) - 1).toLocaleString(
            "en-US",
            {
              month: "long",
              year: "numeric",
            },
          );
        })();

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <div className="w-full min-w-0 px-3 py-4 sm:px-5 sm:py-6 lg:px-6 xl:px-8">
        <div className="w-full max-w-[1600px] mx-auto min-w-0">
          {/* Header */}
          <div className="mb-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-4 sm:p-5 lg:p-6">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <h1 className="text-2xl font-bold text-white sm:text-3xl lg:text-4xl">
                    Trading Analytics
                  </h1>

                  <span className="text-base font-semibold text-sky-400 sm:text-lg lg:text-xl">
                    {periodLabel}
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
                  Understand your performance, discover strengths, and improve
                  your trading decisions.
                </p>
              </div>

              <div className="flex w-full flex-col gap-2 sm:flex-row xl:w-auto">
                <button
                  type="button"
                  className="w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 sm:w-auto"
                >
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Total Profit</p>

              <h2 className="mt-3 text-2xl font-bold text-green-400 sm:text-3xl break-words">
                {ratesLoading
                  ? "Loading..."
                  : `${symbol}${totalProfit.toFixed(2)}`}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Total Loss</p>

              <h2 className="mt-3 text-2xl font-bold text-red-400 sm:text-3xl break-words">
                {ratesLoading
                  ? "Loading..."
                  : `${symbol}${totalLoss.toFixed(2)}`}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Win Rate</p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {winRate}%
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Profit Factor</p>

              <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
                {profitFactor}
              </h2>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Current Streak</p>

              <h2
                className={`mt-3 text-2xl font-bold sm:text-3xl ${
                  currentStreak.startsWith("WIN")
                    ? "text-green-400"
                    : currentStreak.startsWith("LOSS")
                      ? "text-red-400"
                      : currentStreak.startsWith("BE")
                        ? "text-sky-400"
                        : "text-white"
                }`}
              >
                {currentStreak}
              </h2>
            </div>
          </div>

          {/* Equity Curve */}
          <div className="mt-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:mt-6 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
              Equity Curve
            </h2>

            <div className="h-[280px] w-full min-w-0 sm:h-[340px] lg:h-[380px]">
              <EquityCurve trades={periodTrades} />
            </div>
          </div>

          {/* Charts */}
          <div className="mt-5 grid grid-cols-1 gap-5 lg:mt-6 lg:grid-cols-2">
            {/* Monthly Performance */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
                Monthly Performance
              </h2>

              <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
                <MonthlyPerformanceChart trades={periodTrades} />
              </div>
            </div>

            {/* Win Loss */}
            <div className="min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-white sm:text-xl">
                Win • Loss • BE
              </h2>

              <div className="h-[280px] w-full min-w-0 sm:h-[320px]">
                <WinLossPieChart trades={periodTrades} />
              </div>
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-6 xl:grid-cols-5">
            {/* Best Pair */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Best Pair</p>

              <h2 className="mt-3 break-words text-2xl font-bold text-white">
                {bestPair ? bestPair.pair : "--"}
              </h2>

              <p className="mt-2 text-green-400 break-words">
                {bestPair ? `${symbol}${bestPair.netProfit.toFixed(2)}` : ""}
              </p>

              {bestPair && (
                <p className="mt-2 text-sm text-slate-400">
                  {bestPair.wins} / {bestPair.trades} wins
                </p>
              )}
            </div>

            {/* Worst Pair */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Worst Pair</p>

              <h2 className="mt-3 break-words text-2xl font-bold text-white">
                {worstPair ? worstPair.pair : "--"}
              </h2>

              <p className="mt-2 text-red-400 break-words">
                {worstPair ? `${symbol}${worstPair.netProfit.toFixed(2)}` : ""}
              </p>

              {worstPair && (
                <p className="mt-2 text-sm text-slate-400">
                  {worstPair.wins} / {worstPair.trades} wins
                </p>
              )}
            </div>

            {/* Best Strategy */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Best Strategy</p>

              <h2 className="mt-3 break-words text-2xl font-bold text-white">
                {bestStrategy ? bestStrategy.strategy : "--"}
              </h2>

              <p className="mt-2 break-words text-green-400">
                {bestStrategy
                  ? `${symbol}${bestStrategy.netProfit.toFixed(2)}`
                  : ""}
              </p>

              {bestStrategy && (
                <p className="mt-2 text-sm text-slate-400">
                  {bestStrategy.wins} / {bestStrategy.trades} wins
                </p>
              )}
            </div>

            {/* Biggest Win */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Biggest Win</p>

              <h2 className="mt-3 break-words text-2xl font-bold text-green-400 sm:text-3xl">
                {symbol}
                {Number(biggestWin || 0).toFixed(2)}
              </h2>
            </div>

            {/* Biggest Loss */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6">
              <p className="text-sm text-slate-400">Biggest Loss</p>

              <h2 className="mt-3 break-words text-2xl font-bold text-red-400 sm:text-3xl">
                {symbol}
                {Number(biggestLoss || 0).toFixed(2)}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
