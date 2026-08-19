import { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import API from "../../api/auth";
import ViewTradeModal from "./ViewTradeModal";
import AddTradeModal from "./AddTradeModal";

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

const TradeCards = ({ trades, searchTerm, filter, onRefresh, currency }) => {
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
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredTrades.map((trade) => (
          <div
            key={trade._id}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 hover:border-sky-500 transition-all"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <div>
                <h3 className="text-2xl font-bold text-white">{trade.pair}</h3>
                <p className="text-slate-400">{trade.strategy}</p>
              </div>

              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold ${
                  trade.direction === "BUY"
                    ? "bg-green-500/20 text-green-400"
                    : "bg-red-500/20 text-red-400"
                }`}
              >
                {trade.direction}
              </span>
            </div>

            {/* Information */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Open Date</p>
                <p className="text-white">
                  {new Date(trade.openDate).toLocaleDateString()}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Close Date</p>
                <p className="text-white">
                  {trade.closeDate
                    ? new Date(trade.closeDate).toLocaleDateString()
                    : "-"}
                </p>
              </div>

              <div>
                <p className="text-slate-400">LotSize</p>
                <p className="text-white">{trade.lotSize}</p>
              </div>

              <div>
                <p className="text-slate-400">Risk : Reward</p>
                <p className="text-white">
                  {trade.risk}:{trade.reward}
                </p>
              </div>

              <div>
                <p className="text-slate-400">Result</p>

                <span
                  className={`inline-block mt-1 px-3 py-1 rounded-full text-sm ${
                    trade.result === "WIN"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {trade.result}
                </span>
              </div>

              <div>
                <p className="text-slate-400">Profit</p>

                <p
                  className={`font-bold ${
                    trade.profit >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {currencySymbols[currency] || currency}
                  {Number(trade.profit ?? 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  setSelectedTrade(trade);
                  setViewOpen(true);
                }}
                className="text-sky-400 hover:text-sky-300"
              >
                <FaEye size={18} />
              </button>

              <button
                onClick={() => {
                  setEditingTrade(trade);
                  setEditOpen(true);
                }}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <FaEdit size={18} />
              </button>

              <button
                onClick={() => handleDelete(trade._id)}
                className="text-red-400 hover:text-red-300"
              >
                <FaTrash size={18} />
              </button>
            </div>
          </div>
        ))}
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
