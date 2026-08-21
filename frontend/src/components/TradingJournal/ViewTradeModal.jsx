import { useEffect, useState } from "react";
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

const ViewTradeModal = ({ open, onClose, trade }) => {
  const { currency, convertCurrency, ratesLoading } = useTradingJournal();

  const [convertedProfit, setConvertedProfit] = useState(
    Number(trade?.profit || 0),
  );

  useEffect(() => {
    if (!trade) return;

    const originalCurrency = trade.currency || "ZAR";

    const converted = convertCurrency(
      trade.profit ?? 0,
      originalCurrency,
      currency,
    );

    setConvertedProfit(converted);
  }, [trade, currency, convertCurrency]);

  if (!open || !trade) return null;

  const symbol = currencySymbols[currency] || currency;
  const originalCurrency = trade.currency || "ZAR";
  const originalProfit = Number(trade.profit || 0);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 px-3 py-4 sm:px-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex max-h-[calc(100vh-2rem)] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-800 p-4 sm:p-6">
          <div className="min-w-0 pr-4">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Trade Details
            </h2>

            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
              View trade information.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800 text-xl text-slate-400 transition hover:bg-slate-700 hover:text-white sm:h-10 sm:w-10"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-4 sm:p-6">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
            {/* Pair */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Pair</p>
              <p className="mt-1 break-words font-semibold text-white">
                {trade.pair}
              </p>
            </div>

            {/* Direction */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Direction</p>
              <p
                className={`mt-1 font-semibold ${
                  trade.direction === "BUY" ? "text-green-400" : "text-red-400"
                }`}
              >
                {trade.direction}
              </p>
            </div>

            {/* Lot Size */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Lot Size</p>
              <p className="mt-1 font-semibold text-white">{trade.lotSize}</p>
            </div>

            {/* Result */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Result</p>
              <p className="mt-1 font-semibold text-white">{trade.result}</p>
            </div>

            {/* Open Date */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Open Date</p>
              <p className="mt-1 break-words font-semibold text-white">
                {new Date(trade.openDate).toLocaleString()}
              </p>
            </div>

            {/* Close Date */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Close Date</p>
              <p className="mt-1 break-words font-semibold text-white">
                {trade.closeDate
                  ? new Date(trade.closeDate).toLocaleString()
                  : "-"}
              </p>
            </div>

            {/* Risk Reward */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Risk : Reward</p>

              <p className="mt-1 font-semibold text-white">
                {trade.risk}:{trade.reward}
              </p>
            </div>

            {/* Profit */}
            <div>
              <p className="text-xs text-slate-400 sm:text-sm">Profit</p>

              <p
                className={`mt-1 break-words text-lg font-bold ${
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

              {/* Original amount */}
              {originalCurrency !== currency && !ratesLoading && (
                <p className="mt-1 text-xs text-slate-500">
                  Original:{" "}
                  {currencySymbols[originalCurrency] || originalCurrency}
                  {originalProfit.toFixed(2)} {originalCurrency}
                </p>
              )}
            </div>

            {/* Strategy */}
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-400 sm:text-sm">Strategy</p>

              <p className="mt-1 whitespace-pre-wrap break-words font-semibold text-white">
                {trade.strategy}
              </p>
            </div>

            {/* Notes */}
            <div className="sm:col-span-2">
              <p className="text-xs text-slate-400 sm:text-sm">Notes</p>

              <p className="mt-1 whitespace-pre-wrap break-words text-sm font-semibold text-white sm:text-base">
                {trade.notes || "No notes"}
              </p>
            </div>

            {/* Before Setup */}
            {trade.beforeSetupImage && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs text-slate-400 sm:text-sm">
                  Before Setup
                </p>

                <img
                  src={trade.beforeSetupImage}
                  alt="Before setup"
                  className="max-h-[500px] w-full rounded-xl border border-slate-800 object-contain"
                />
              </div>
            )}

            {/* After Setup */}
            {trade.afterSetupImage && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-xs text-slate-400 sm:text-sm">
                  After Setup
                </p>

                <img
                  src={trade.afterSetupImage}
                  alt="After setup"
                  className="max-h-[500px] w-full rounded-xl border border-slate-800 object-contain"
                />
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-800 p-4 sm:p-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-xl bg-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-600 sm:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTradeModal;
