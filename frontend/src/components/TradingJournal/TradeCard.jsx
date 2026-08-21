import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import API from "../../api/auth";
import ViewTradeModal from "./ViewTradeModal";
import AddTradeModal from "./AddTradeModal";
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

const TradeCards = ({ trades, searchTerm, filter, onRefresh }) => {
  const { currency, convertCurrency, ratesLoading } = useTradingJournal();

  const [selectedTrade, setSelectedTrade] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);

  const [editingTrade, setEditingTrade] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this trade?")) return;

    try {
      await API.delete(`/trades/${id}`);
      onRefresh();
    } catch (error) {
      console.error(error);
      alert("Failed to delete trade.");
    }
  };

  const filteredTrades = trades.filter((trade) => {
    const search = searchTerm.toLowerCase();

    const matchesSearch =
      trade.pair?.toLowerCase().includes(search) ||
      trade.strategy?.toLowerCase().includes(search) ||
      trade.direction?.toLowerCase().includes(search) ||
      trade.result?.toLowerCase().includes(search);

    if (filter === "ALL") return matchesSearch;
    if (filter === "OPEN") return matchesSearch && trade.result === "OPEN";
    if (filter === "CLOSED") return matchesSearch && trade.result !== "OPEN";
    if (filter === "WIN") return matchesSearch && trade.result === "WIN";
    if (filter === "LOSS") return matchesSearch && trade.result === "LOSS";
    if (filter === "BE") return matchesSearch && trade.result === "BE";
    if (filter === "BUY") return matchesSearch && trade.direction === "BUY";
    if (filter === "SELL") return matchesSearch && trade.direction === "SELL";

    return matchesSearch;
  });

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-2">
        {filteredTrades.map((trade) => {
          const originalCurrency = trade.currency || "ZAR";

          const convertedProfit = convertCurrency(
            trade.profit ?? 0,
            originalCurrency,
            currency,
          );

          const symbol = currencySymbols[currency] || currency;

          return (
            <div
              key={trade._id}
              className="w-full min-w-0 rounded-2xl border border-slate-800 bg-slate-900 p-4 transition-all hover:border-sky-500 sm:p-6"
            >
              {/* Header */}
              <div className="mb-5 flex min-w-0 items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate text-xl font-bold text-white sm:text-2xl">
                    {trade.pair}
                  </h3>

                  <p className="mt-1 break-words text-sm text-slate-400">
                    {trade.strategy}
                  </p>
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold sm:px-4 sm:text-sm ${
                    trade.direction === "BUY"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {trade.direction}
                </span>
              </div>

              {/* Information */}
              <div className="grid grid-cols-1 gap-4 text-sm min-[400px]:grid-cols-2">
                <div>
                  <p className="text-slate-400">Open Date</p>
                  <p className="mt-1 text-white">
                    {new Date(trade.openDate).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Close Date</p>
                  <p className="mt-1 text-white">
                    {trade.closeDate
                      ? new Date(trade.closeDate).toLocaleDateString()
                      : "-"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Lot Size</p>
                  <p className="mt-1 text-white">{trade.lotSize}</p>
                </div>

                <div>
                  <p className="text-slate-400">Risk : Reward</p>
                  <p className="mt-1 text-white">
                    {trade.risk}:{trade.reward}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">Result</p>

                  <span
                    className={`mt-1 inline-block rounded-full px-3 py-1 text-sm ${
                      trade.result === "WIN"
                        ? "bg-green-500/20 text-green-400"
                        : trade.result === "LOSS"
                          ? "bg-red-500/20 text-red-400"
                          : trade.result === "BE"
                            ? "bg-blue-500/20 text-blue-400"
                            : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {trade.result}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-slate-400">Profit</p>

                  <p
                    className={`mt-1 break-words font-bold ${
                      convertedProfit >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {ratesLoading ? (
                      <span className="text-slate-500">Loading...</span>
                    ) : (
                      <>
                        {symbol}
                        {Number(convertedProfit).toFixed(2)}
                      </>
                    )}
                  </p>

                  {/* Show original amount */}
                  {originalCurrency !== currency && (
                    <p className="mt-1 text-xs text-slate-500">
                      Original:{" "}
                      {currencySymbols[originalCurrency] || originalCurrency}
                      {Number(trade.profit ?? 0).toFixed(2)} {originalCurrency}
                    </p>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 flex justify-end gap-5 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTrade(trade);
                    setViewOpen(true);
                  }}
                  className="text-sky-400 transition hover:text-sky-300"
                  title="View trade"
                >
                  <FaEye size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEditingTrade(trade);
                    setEditOpen(true);
                  }}
                  className="text-yellow-400 transition hover:text-yellow-300"
                  title="Edit trade"
                >
                  <FaEdit size={18} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(trade._id)}
                  className="text-red-400 transition hover:text-red-300"
                  title="Delete trade"
                >
                  <FaTrash size={18} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <ViewTradeModal
        open={viewOpen}
        onClose={() => setViewOpen(false)}
        trade={selectedTrade}
      />

      <AddTradeModal
        open={editOpen}
        onClose={() => {
          setEditOpen(false);
          setEditingTrade(null);
        }}
        editMode={true}
        trade={editingTrade}
        onSaved={() => {
          onRefresh();
          setEditOpen(false);
          setEditingTrade(null);
        }}
      />
    </>
  );
};

export default TradeCards;
