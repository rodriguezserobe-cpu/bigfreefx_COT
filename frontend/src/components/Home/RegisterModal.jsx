import { X } from "lucide-react";

export default function RegisterModal({ open, onClose }) {
  // Hide modal if it's not open
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-[#1b1b1b] border border-sky-500/20 rounded-2xl shadow-2xl p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Become a Member
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Register after receiving payment instructions from BigFree FX.
        </p>

        {/* Form */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />

          <input
            type="text"
            placeholder="Country"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
          />
        </div>

        {/* Notice */}
        <div className="mt-6 rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4">
          <h3 className="text-yellow-400 font-semibold mb-2">Important</h3>

          <p className="text-gray-300 text-sm leading-6">
            Registration does <strong>not</strong> give immediate access.
            <br />
            <br />
            Accounts are approved only after payment has been verified by the
            BigFree FX administrator.
            <br />
            <br />
            If you register before making payment, your registration will remain
            pending and may be deleted.
          </p>
        </div>

        {/* Register Button */}
        <button className="w-full mt-8 bg-sky-500 hover:bg-sky-600 transition py-3 rounded-lg font-semibold text-lg text-white">
          Register
        </button>
      </div>
    </div>
  );
}
