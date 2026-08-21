import API from "../../api/auth";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { useTradingJournal } from "../../context/TradingJournalContext";

const AddTradeModal = ({
  open,
  onClose,
  editMode = false,
  trade = null,
  onSaved,
}) => {
  const { currency } = useTradingJournal();
  const [pair, setPair] = useState("");
  const [direction, setDirection] = useState("BUY");
  const [lotSize, setLotSize] = useState("");
  const [openDate, setOpenDate] = useState(
    new Date().toISOString().slice(0, 16),
  );
  const [strategy, setStrategy] = useState("");

  const [closeDate, setCloseDate] = useState("");
  const [result, setResult] = useState("OPEN");
  const [profit, setProfit] = useState("");
  const [risk, setRisk] = useState("1");
  const [reward, setReward] = useState("2");
  const [notes, setNotes] = useState("");

  const [beforeSetupImage, setBeforeSetupImage] = useState(null);
  const [afterSetupImage, setAfterSetupImage] = useState(null);

  const [saving, setSaving] = useState(false);

  // Load trade when editing
  useEffect(() => {
    if (editMode && trade) {
      setPair(trade.pair || "");
      setDirection(trade.direction || "BUY");
      setLotSize(trade.lotSize ?? "");

      setOpenDate(
        trade.openDate
          ? new Date(trade.openDate).toISOString().slice(0, 16)
          : new Date().toISOString().slice(0, 16),
      );

      setStrategy(trade.strategy || "");

      setCloseDate(
        trade.closeDate
          ? new Date(trade.closeDate).toISOString().slice(0, 16)
          : "",
      );

      setResult(trade.result || "OPEN");
      setProfit(trade.profit ?? "");
      setRisk(trade.risk ?? "1");
      setReward(trade.reward ?? "2");
      setNotes(trade.notes || "");

      setBeforeSetupImage(trade.beforeSetupImage || null);
      setAfterSetupImage(trade.afterSetupImage || null);
    }
  }, [editMode, trade]);

  // Reset form when opening a new trade
  useEffect(() => {
    if (open && !editMode) {
      setPair("");
      setDirection("BUY");
      setLotSize("");
      setOpenDate(new Date().toISOString().slice(0, 16));
      setStrategy("");
      setCloseDate("");
      setResult("OPEN");
      setProfit("");
      setRisk("1");
      setReward("2");
      setNotes("");
      setBeforeSetupImage(null);
      setAfterSetupImage(null);
    }
  }, [open, editMode]);

  // Automatically set OPEN when there is no close date
  useEffect(() => {
    if (!closeDate) {
      setResult("OPEN");
    }
  }, [closeDate]);

  // Automatically determine result from profit
  useEffect(() => {
    if (!closeDate) return;

    const value = Number(profit);

    if (value > 0) {
      setResult("WIN");
    } else if (value < 0) {
      setResult("LOSS");
    } else {
      setResult("BE");
    }
  }, [profit, closeDate]);

  const uploadImage = async (file) => {
    if (!file) return null;

    const formData = new FormData();
    formData.append("image", file);

    const { data } = await API.post("/uploads", formData);

    return data.url;
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if (!pair || !lotSize || !openDate || !strategy) {
      alert("Please fill in all required fields.");
      return;
    }

    if (closeDate && new Date(closeDate) < new Date(openDate)) {
      alert("Close date cannot be before open date.");
      return;
    }

    let tradeResult = "OPEN";

    if (closeDate) {
      if (Number(profit) > 0) {
        tradeResult = "WIN";
      } else if (Number(profit) < 0) {
        tradeResult = "LOSS";
      } else {
        tradeResult = "BE";
      }
    }

    try {
      setSaving(true);

      let uploadedBeforeSetupImage = beforeSetupImage;
      let uploadedAfterSetupImage = afterSetupImage;

      // Upload Before Setup image
      if (beforeSetupImage instanceof File) {
        uploadedBeforeSetupImage = await uploadImage(beforeSetupImage);
      }

      // Upload After Setup image
      if (afterSetupImage instanceof File) {
        uploadedAfterSetupImage = await uploadImage(afterSetupImage);
      }

      const tradeData = {
        pair,
        direction,
        lotSize: Number(lotSize),
        openDate,
        strategy,
        closeDate: closeDate || null,
        profit: closeDate ? Number(profit || 0) : 0,
        currency,
        rr: `${risk}:${reward}`,
        result: tradeResult,
        notes,
        beforeSetupImage: uploadedBeforeSetupImage || "",
        afterSetupImage: uploadedAfterSetupImage || "",
        risk: Number(risk),
        reward: Number(reward),
      };

      if (editMode) {
        await API.put(`/trades/${trade._id}`, tradeData);
      } else {
        await API.post("/trades", tradeData);
      }

      if (onSaved) {
        onSaved();
      }

      // Reset
      setPair("");
      setDirection("BUY");
      setLotSize("");
      setOpenDate(new Date().toISOString().slice(0, 16));
      setStrategy("");
      setCloseDate("");
      setResult("OPEN");
      setProfit("");
      setRisk("1");
      setReward("2");
      setNotes("");
      setBeforeSetupImage(null);
      setAfterSetupImage(null);

      onClose();
    } catch (error) {
      console.error("Failed to save trade:", error);
      console.error(error.response?.data);

      alert(error.response?.data?.message || "Failed to save trade.");
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-2 sm:p-4">
      <div
        className="
          flex
          w-full
          max-w-3xl
          max-h-[calc(100dvh-1rem)]
          sm:max-h-[calc(100dvh-2rem)]
          flex-col
          overflow-hidden
          rounded-xl
          sm:rounded-2xl
          border
          border-slate-800
          bg-[#0d1117]
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="shrink-0 border-b border-slate-800 px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {editMode ? "Edit Trade" : "Add Trade"}
              </h2>

              <p className="mt-1 text-xs sm:text-sm text-slate-400">
                {editMode
                  ? "Update your existing trade details."
                  : "Record a new trading position."}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-800
                text-slate-300
                transition
                hover:bg-slate-700
                hover:text-white
              "
            >
              <FaTimes />
            </button>
          </div>

          {/* Status */}
          <div className="mt-4">
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs sm:text-sm font-semibold ${
                closeDate
                  ? "bg-green-500/20 text-green-400"
                  : "bg-sky-500/20 text-sky-400"
              }`}
            >
              Status: {closeDate ? "CLOSED" : "OPEN"}
            </span>
          </div>
        </div>

        {/* Scrollable Body */}
        <form
          onSubmit={handleSave}
          className="min-h-0 flex-1 overflow-y-auto overscroll-contain"
        >
          <div className="space-y-8 p-4 sm:p-6">
            {/* ================= OPEN TRADE ================= */}
            <section>
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-semibold text-white">Open Trade</h3>

                <p className="mt-1 text-sm text-slate-400">
                  Fill these fields when opening a trade.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Pair */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Pair
                  </label>

                  <input
                    type="text"
                    value={pair}
                    onChange={(e) => setPair(e.target.value.toUpperCase())}
                    placeholder="e.g. EURUSD"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      px-4
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-sky-500
                    "
                  />
                </div>

                {/* Direction */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Direction
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setDirection("BUY")}
                      className={`h-12 rounded-xl border font-semibold transition ${
                        direction === "BUY"
                          ? "border-green-500 bg-green-500 text-white"
                          : "border-green-500 bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      }`}
                    >
                      BUY
                    </button>

                    <button
                      type="button"
                      onClick={() => setDirection("SELL")}
                      className={`h-12 rounded-xl border font-semibold transition ${
                        direction === "SELL"
                          ? "border-red-500 bg-red-500 text-white"
                          : "border-red-500 bg-red-500/20 text-red-400 hover:bg-red-500/30"
                      }`}
                    >
                      SELL
                    </button>
                  </div>
                </div>

                {/* Lot Size */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Lot Size
                  </label>

                  <input
                    type="number"
                    min="0.01"
                    step="0.01"
                    value={lotSize}
                    onChange={(e) => setLotSize(e.target.value)}
                    placeholder="0.01"
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      px-4
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-sky-500
                    "
                  />
                </div>

                {/* Open Date */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Open Date
                  </label>

                  <input
                    type="datetime-local"
                    value={openDate}
                    onChange={(e) => setOpenDate(e.target.value)}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      px-4
                      text-white
                      outline-none
                      focus:border-sky-500
                    "
                  />
                </div>

                {/* Strategy */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">
                    Strategy
                  </label>

                  <textarea
                    rows="3"
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                    placeholder="Enter your trading strategy..."
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      p-4
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-sky-500
                    "
                  />
                </div>
              </div>
            </section>

            {/* ================= BEFORE SETUP ================= */}
            <section>
              <label className="mb-2 block text-sm text-slate-300">
                Before Setup
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setBeforeSetupImage(e.target.files?.[0] || null)
                }
                className="
                  w-full
                  rounded-xl
                  border
                  border-slate-700
                  bg-slate-900
                  p-3
                  text-xs
                  sm:text-sm
                  text-slate-300
                  file:mr-3
                  file:rounded-lg
                  file:border-0
                  file:bg-sky-500
                  file:px-3
                  file:py-2
                  file:text-white
                "
              />

              {beforeSetupImage instanceof File && (
                <img
                  src={URL.createObjectURL(beforeSetupImage)}
                  alt="Before setup preview"
                  className="mt-3 max-h-72 w-full rounded-xl border border-slate-700 object-contain"
                />
              )}

              {typeof beforeSetupImage === "string" && beforeSetupImage && (
                <img
                  src={beforeSetupImage}
                  alt="Before setup"
                  className="mt-3 max-h-72 w-full rounded-xl border border-slate-700 object-contain"
                />
              )}
            </section>

            {/* ================= CLOSE TRADE ================= */}
            <section>
              <div className="border-b border-slate-800 pb-4">
                <h3 className="text-lg font-semibold text-white">
                  Close Trade
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Fill these fields only after the trade has closed.
                </p>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
                {/* Close Date */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Close Date
                  </label>

                  <input
                    type="datetime-local"
                    value={closeDate}
                    onChange={(e) => setCloseDate(e.target.value)}
                    min={openDate}
                    className="
                      h-12
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      px-4
                      text-white
                      outline-none
                      focus:border-sky-500
                    "
                  />
                </div>

                {/* Profit */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Profit
                  </label>

                  <input
                    type="number"
                    step="0.01"
                    value={profit}
                    onChange={(e) => setProfit(e.target.value)}
                    placeholder="0.00"
                    disabled={!closeDate}
                    className={`h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none placeholder:text-slate-500 focus:border-sky-500 ${
                      !closeDate ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  />
                </div>

                {/* Result */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Result
                  </label>

                  <select
                    value={result}
                    onChange={(e) => setResult(e.target.value)}
                    disabled={!closeDate}
                    className={`h-12 w-full rounded-xl border border-slate-700 bg-slate-900 px-4 text-white outline-none focus:border-sky-500 ${
                      !closeDate ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    <option value="OPEN">OPEN</option>
                    <option value="WIN">WIN</option>
                    <option value="LOSS">LOSS</option>
                    <option value="BE">BE</option>
                  </select>
                </div>

                {/* Risk Reward */}
                <div>
                  <label className="mb-2 block text-sm text-slate-300">
                    Risk : Reward
                  </label>

                  <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                    <input
                      type="number"
                      min="1"
                      value={risk}
                      onChange={(e) => setRisk(e.target.value)}
                      placeholder="1"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        px-4
                        text-white
                        outline-none
                        focus:border-sky-500
                      "
                    />

                    <span className="text-lg font-bold text-slate-400">:</span>

                    <input
                      type="number"
                      min="1"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      placeholder="2"
                      className="
                        h-12
                        w-full
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-900
                        px-4
                        text-white
                        outline-none
                        focus:border-sky-500
                      "
                    />
                  </div>
                </div>

                {/* Notes */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm text-slate-300">
                    Notes (Optional)
                  </label>

                  <textarea
                    rows="4"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="What happened in this trade?"
                    className="
                      w-full
                      resize-none
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-900
                      p-4
                      text-white
                      outline-none
                      placeholder:text-slate-500
                      focus:border-sky-500
                    "
                  />
                </div>
              </div>
            </section>

            {/* ================= AFTER SETUP ================= */}
            <section>
              <label className="mb-2 block text-sm text-slate-300">
                After Setup
              </label>

              <input
                type="file"
                accept="image/*"
                disabled={!closeDate}
                onChange={(e) =>
                  setAfterSetupImage(e.target.files?.[0] || null)
                }
                className={`w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-xs sm:text-sm text-slate-300 file:mr-3 file:rounded-lg file:border-0 file:bg-sky-500 file:px-3 file:py-2 file:text-white ${
                  !closeDate ? "cursor-not-allowed opacity-50" : ""
                }`}
              />

              {afterSetupImage instanceof File && (
                <img
                  src={URL.createObjectURL(afterSetupImage)}
                  alt="After setup preview"
                  className="mt-3 max-h-72 w-full rounded-xl border border-slate-700 object-contain"
                />
              )}

              {typeof afterSetupImage === "string" && afterSetupImage && (
                <img
                  src={afterSetupImage}
                  alt="After setup"
                  className="mt-3 max-h-72 w-full rounded-xl border border-slate-700 object-contain"
                />
              )}
            </section>
          </div>

          {/* Footer */}
          <div
            className="
              sticky
              bottom-0
              flex
              shrink-0
              flex-col-reverse
              gap-3
              border-t
              border-slate-800
              bg-[#0d1117]/95
              p-4
              backdrop-blur-xl
              sm:flex-row
              sm:justify-end
              sm:p-6
            "
          >
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="
                w-full
                rounded-xl
                bg-slate-800
                px-6
                py-3
                text-white
                transition
                hover:bg-slate-700
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="
                w-full
                rounded-xl
                bg-sky-500
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-sky-600
                disabled:cursor-not-allowed
                disabled:opacity-50
                sm:w-auto
              "
            >
              {saving
                ? "Saving..."
                : editMode
                  ? "Update Trade"
                  : "Save Open Trade"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTradeModal;
