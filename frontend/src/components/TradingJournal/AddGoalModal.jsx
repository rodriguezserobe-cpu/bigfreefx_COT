import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import API from "../../api/auth";

const AddGoalModal = ({ open, onClose, onSaved }) => {
  const [type, setType] = useState("PROFIT");
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [startingEquity, setStartingEquity] = useState("");

  // Prevent the page behind the modal from scrolling
  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  const handleSave = async (e) => {
    e.preventDefault();

    if (!title || !target || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    if (type === "GROWTH" && !startingEquity) {
      alert("Please enter your starting equity.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      alert("End date cannot be before start date.");
      return;
    }

    try {
      setSaving(true);

      await API.post("/goals", {
        type,
        title,
        target: Number(target),
        startingEquity: Number(startingEquity),
        startDate,
        endDate,
      });

      setTitle("");
      setTarget("");
      setStartDate("");
      setEndDate("");
      setType("PROFIT");
      setStartingEquity("");

      onSaved();
      onClose();
    } catch (error) {
      console.error("Failed to create goal:", error);

      alert(error.response?.data?.message || "Failed to create goal.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-3 sm:p-4">
      {/* Modal */}
      <div className="flex w-full max-w-lg max-h-[90vh] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0B1120] shadow-2xl">
        {/* Header */}
        <div className="flex flex-shrink-0 items-center justify-between border-b border-slate-800 p-4 sm:p-6">
          <div className="min-w-0 pr-4">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Add Trading Goal
            </h2>

            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Set a target for your trading.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form
          onSubmit={handleSave}
          className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6"
        >
          <div className="space-y-5">
            {/* Goal Type */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Goal Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              >
                <option value="PROFIT">Profit Target</option>
                <option value="TRADES">Number of Trades</option>
                <option value="WIN_RATE">Win Rate</option>
                <option value="GROWTH">Account Growth</option>
                <option value="MAX_LOSS">Maximum Loss</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Goal Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. August Profit Target"
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Target */}
            <div>
              <label className="mb-2 block text-sm text-slate-300">
                Target
              </label>

              <input
                type="number"
                step="0.01"
                min="0"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="5000"
                className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              />
            </div>

            {/* Starting Equity */}
            {type === "GROWTH" && (
              <div>
                <label className="mb-2 block text-sm text-slate-300">
                  Starting Equity
                </label>

                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={startingEquity}
                  onChange={(e) => setStartingEquity(e.target.value)}
                  placeholder="10000"
                  className="h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white placeholder:text-slate-500 outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            )}

            {/* Dates */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="min-w-0">
                <label className="mb-2 block text-sm text-slate-300">
                  Start Date
                </label>

                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div className="min-w-0">
                <label className="mb-2 block text-sm text-slate-300">
                  End Date
                </label>

                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-12 w-full min-w-0 rounded-xl border border-slate-700 bg-slate-900 px-3 sm:px-4 text-white outline-none transition focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-800 pt-5 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="w-full rounded-xl bg-slate-800 px-5 py-3 text-slate-300 transition hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-sky-500 px-5 py-3 font-medium text-white transition hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {saving ? "Saving..." : "Save Goal"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;
