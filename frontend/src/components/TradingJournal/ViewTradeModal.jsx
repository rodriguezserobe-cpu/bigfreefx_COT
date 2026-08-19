const ViewTradeModal = ({ open, onClose, trade }) => {
  if (!open || !trade) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/70 pt-8 pb-4 px-4">
      <div className="w-full max-w-3xl rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 p-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Trade Details</h2>

            <p className="text-slate-400 mt-1">View trade information.</p>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-400 text-sm">Pair</p>
              <p className="text-white font-semibold">{trade.pair}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Direction</p>
              <p className="text-white font-semibold">{trade.direction}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Lot Size</p>
              <p className="text-white font-semibold">{trade.lotSize}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Result</p>
              <p className="text-white font-semibold">{trade.result}</p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Open Date</p>
              <p className="text-white font-semibold">
                {new Date(trade.openDate).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Close Date</p>
              <p className="text-white font-semibold">
                {trade.closeDate
                  ? new Date(trade.closeDate).toLocaleString()
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Risk : Reward</p>
              <p className="text-white font-semibold">
                {trade.risk}:{trade.reward}
              </p>
            </div>

            <div>
              <p className="text-slate-400 text-sm">Profit</p>
              <p className="text-white font-semibold">${trade.profit ?? 0}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-slate-400 text-sm">Strategy</p>
              <p className="text-white font-semibold">{trade.strategy}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-slate-400 text-sm">Notes</p>
              <p className="text-white font-semibold">
                {trade.notes || "No notes"}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t border-slate-800 p-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-slate-700 hover:bg-slate-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTradeModal;
