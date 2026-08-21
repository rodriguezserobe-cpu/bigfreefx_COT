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

const TradesTable = ({ trades, searchTerm, filter, onRefresh }) => {
  const { currency, convertCurrency, ratesLoading } = useTradingJournal();

  const [selectedTrade, setSelectedTrade] = useState(null);
  const [viewOpen, setViewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editingTrade, setEditingTrade] = useState(null);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this trade?",
    );

    if (!confirmDelete) return;

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

  const symbol = currencySymbols[currency] || currency;

  return (
    <>
      <div className="mt-8 w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead className="bg-slate-950">
              <tr className="text-left text-slate-400">
                <th className="p-4">#</th>
                <th className="p-4">Pair</th>
                <th className="p-4">Direction</th>
                <th className="p-4">Open Date</th>
                <th className="p-4">Lot Size</th>
                <th className="p-4">Result</th>
                <th className="p-4">Profit</th>
                <th className="p-4">R:R</th>
                <th className="p-4">Strategy</th>
                <th className="p-4">Close Date</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredTrades.map((trade, index) => {
                const originalCurrency = trade.currency || "ZAR";

                const convertedProfit = convertCurrency(
                  trade.profit ?? 0,
                  originalCurrency,
                  currency,
                );

                return (
                  <tr
                    key={trade._id}
                    className="border-t border-slate-800 transition hover:bg-slate-800/40"
                  >
                    <td className="p-4">{index + 1}</td>

                    <td className="p-4 font-semibold text-white">
                      {trade.pair}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          trade.direction === "BUY"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {trade.direction}
                      </span>
                    </td>

                    <td className="p-4">
                      {new Date(trade.openDate).toLocaleDateString()}
                    </td>

                    <td className="p-4">{trade.lotSize}</td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-semibold ${
                          trade.result === "WIN"
                            ? "bg-green-500/20 text-green-400"
                            : trade.result === "LOSS"
                              ? "bg-red-500/20 text-red-400"
                              : trade.result === "OPEN"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-blue-500/20 text-blue-400"
                        }`}
                      >
                        {trade.result}
                      </span>
                    </td>

                    <td
                      className={`p-4 font-bold ${
                        Number(convertedProfit) >= 0
                          ? "text-green-400"
                          : "text-red-400"
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

                      {originalCurrency !== currency && !ratesLoading && (
                        <div className="mt-1 text-xs text-slate-500">
                          Original:{" "}
                          {currencySymbols[originalCurrency] ||
                            originalCurrency}
                          {Number(trade.profit ?? 0).toFixed(2)}{" "}
                          {originalCurrency}
                        </div>
                      )}
                    </td>

                    <td className="p-4">
                      {trade.risk}:{trade.reward}
                    </td>

                    <td className="p-4">{trade.strategy}</td>

                    <td className="p-4">
                      {trade.closeDate
                        ? new Date(trade.closeDate).toLocaleDateString()
                        : "-"}
                    </td>

                    <td className="p-4">
                      <div className="flex gap-3 text-lg">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTrade(trade);
                            setViewOpen(true);
                          }}
                          className="text-sky-400 transition hover:text-sky-300"
                          title="View trade"
                        >
                          <FaEye />
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
                          <FaEdit />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(trade._id)}
                          className="text-red-400 transition hover:text-red-300"
                          title="Delete trade"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

export default TradesTable;
