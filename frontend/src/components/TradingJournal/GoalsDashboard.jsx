import { useEffect, useState } from "react";
import { FaBullseye, FaPlus, FaTrash } from "react-icons/fa";

import AddGoalModal from "./AddGoalModal";
import API from "../../api/auth";

const GoalsDashboard = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openAddGoal, setOpenAddGoal] = useState(false);
  const [currency, setCurrency] = useState("ZAR");
  const [trades, setTrades] = useState([]);

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

  // =========================
  // FETCH CURRENCY
  // =========================
  const fetchCurrency = async () => {
    try {
      const { data } = await API.get("/user/profile");

      if (data?.user?.currency) {
        setCurrency(data.user.currency);
      }
    } catch (error) {
      console.error("Failed to load currency:", error);
    }
  };

  // =========================
  // FETCH GOALS
  // =========================
  const fetchGoals = async () => {
    try {
      const { data } = await API.get("/goals");

      setGoals(data);
    } catch (error) {
      console.error("Failed to load goals:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // FETCH TRADES
  // =========================
  const fetchTrades = async () => {
    try {
      const { data } = await API.get("/trades");

      setTrades(data);
    } catch (error) {
      console.error("Failed to load trades:", error);
    }
  };

  useEffect(() => {
    fetchCurrency();
    fetchGoals();
    fetchTrades();
  }, []);

  // =========================
  // GOAL PROGRESS
  // =========================
  const getGoalProgress = (goal) => {
    const start = new Date(goal.startDate);
    const end = new Date(goal.endDate);

    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);

    const goalTrades = trades.filter((trade) => {
      if (!trade.openDate) return false;

      const tradeDate = new Date(trade.openDate);

      return tradeDate >= start && tradeDate <= end;
    });

    let current = 0;

    // PROFIT
    if (goal.type === "PROFIT") {
      current = goalTrades.reduce(
        (sum, trade) => sum + Number(trade.profit || 0),
        0,
      );
    }

    // MAXIMUM LOSS
    if (goal.type === "MAX_LOSS") {
      current = goalTrades
        .filter((trade) => Number(trade.profit) < 0)
        .reduce((sum, trade) => sum + Math.abs(Number(trade.profit)), 0);
    }

    // NUMBER OF TRADES
    if (goal.type === "TRADES") {
      current = goalTrades.length;
    }

    // WIN RATE
    if (goal.type === "WIN_RATE") {
      const closedTrades = goalTrades.filter(
        (trade) => trade.result !== "OPEN",
      );

      const wins = closedTrades.filter(
        (trade) => trade.result === "WIN",
      ).length;

      current =
        closedTrades.length > 0 ? (wins / closedTrades.length) * 100 : 0;
    }

    // ACCOUNT GROWTH
    if (goal.type === "GROWTH") {
      const startingEquity = Number(goal.startingEquity) || 0;

      const netProfit = goalTrades.reduce(
        (sum, trade) => sum + Number(trade.profit || 0),
        0,
      );

      current = startingEquity + netProfit;
    }

    const target = Number(goal.target) || 0;

    if (target <= 0) {
      return {
        current,
        percentage: 0,
      };
    }

    const percentage = Math.min(Math.max((current / target) * 100, 0), 100);

    return {
      current,
      percentage,
    };
  };

  // =========================
  // DELETE GOAL
  // =========================
  const deleteGoal = async (id) => {
    try {
      await API.delete(`/goals/${id}`);

      setGoals((currentGoals) =>
        currentGoals.filter((goal) => goal._id !== id),
      );
    } catch (error) {
      console.error("Failed to delete goal:", error);
    }
  };

  // =========================
  // FORMAT TARGET
  // =========================
  const formatGoalTarget = (goal) => {
    const symbol = currencySymbols[currency] || currency;

    if (goal.type === "PROFIT" || goal.type === "MAX_LOSS") {
      return `${symbol}${Number(goal.target).toLocaleString()}`;
    }

    if (goal.type === "WIN_RATE") {
      return `${goal.target}%`;
    }

    if (goal.type === "GROWTH") {
      return `${symbol}${Number(goal.target).toLocaleString()}`;
    }

    if (goal.type === "TRADES") {
      return Number(goal.target).toLocaleString();
    }

    return goal.target;
  };

  // =========================
  // CURRENT VALUE
  // =========================
  const formatCurrentValue = (goal, current) => {
    const symbol = currencySymbols[currency] || currency;

    if (goal.type === "WIN_RATE") {
      return `${current.toFixed(1)}%`;
    }

    if (goal.type === "TRADES") {
      return current;
    }

    return `${symbol}${current.toFixed(2)}`;
  };

  return (
    <div className="w-full min-w-0 mt-6">
      {/* =========================
          GOALS HEADER
      ========================= */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <FaBullseye className="text-sky-400 text-xl sm:text-2xl flex-shrink-0" />

            <h1 className="text-2xl sm:text-3xl 2xl:text-4xl font-bold text-white">
              Trading Goals
            </h1>
          </div>

          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Set targets and track your trading progress.
          </p>
        </div>

        <button
          onClick={() => setOpenAddGoal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-xl transition font-semibold text-white whitespace-nowrap"
        >
          <FaPlus />
          Add Goal
        </button>
      </div>

      {/* =========================
          LOADING
      ========================= */}
      {loading && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 text-center">
          <p className="text-slate-400">Loading goals...</p>
        </div>
      )}

      {/* =========================
          EMPTY STATE
      ========================= */}
      {!loading && goals.length === 0 && (
        <div className="border border-slate-800 bg-slate-900/60 rounded-2xl p-8 sm:p-12 text-center">
          <FaBullseye className="mx-auto text-4xl sm:text-5xl text-slate-600 mb-4" />

          <h2 className="text-xl sm:text-2xl font-semibold text-white">
            No Goals Yet
          </h2>

          <p className="text-slate-400 mt-2 max-w-md mx-auto text-sm sm:text-base">
            Create your first trading goal to start tracking your progress.
          </p>

          <button
            onClick={() => setOpenAddGoal(true)}
            className="mt-6 inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 px-5 py-3 rounded-xl transition font-semibold"
          >
            <FaPlus />
            Create Goal
          </button>
        </div>
      )}

      {/* =========================
          GOALS
      ========================= */}
      {!loading && goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {goals.map((goal) => {
            const progress = getGoalProgress(goal);

            return (
              <div
                key={goal._id}
                className="w-full min-w-0 bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6"
              >
                {/* Goal Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-slate-400 text-xs sm:text-sm uppercase tracking-wide">
                      {goal.type}
                    </p>

                    <h2 className="text-lg sm:text-xl font-bold mt-1 text-white break-words">
                      {goal.title}
                    </h2>
                  </div>

                  <button
                    onClick={() => deleteGoal(goal._id)}
                    title="Delete goal"
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
                  >
                    <FaTrash />
                  </button>
                </div>

                {/* Target */}
                <div className="mt-6">
                  <p className="text-slate-400 text-sm">Target</p>

                  <p className="text-2xl sm:text-3xl font-bold text-sky-400 mt-2 break-words">
                    {formatGoalTarget(goal)}
                  </p>
                </div>

                {/* Progress */}
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <p className="text-slate-400 text-sm">Progress</p>

                    <p className="text-white font-semibold text-sm sm:text-base">
                      {progress.percentage.toFixed(0)}%
                    </p>
                  </div>

                  <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-sky-500 transition-all duration-500"
                      style={{
                        width: `${progress.percentage}%`,
                      }}
                    />
                  </div>

                  <p className="text-slate-400 text-sm mt-3">
                    Current:{" "}
                    <span className="text-white font-medium">
                      {formatCurrentValue(goal, progress.current)}
                    </span>
                  </p>
                </div>

                {/* Dates */}
                <div className="mt-5 pt-4 border-t border-slate-800 text-xs sm:text-sm text-slate-400">
                  {new Date(goal.startDate).toLocaleDateString()} —{" "}
                  {new Date(goal.endDate).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Goal Modal */}
      <AddGoalModal
        open={openAddGoal}
        onClose={() => setOpenAddGoal(false)}
        onSaved={fetchGoals}
      />
    </div>
  );
};

export default GoalsDashboard;
