import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function RegisterModal({ open, onClose, openLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[680px] bg-[#0d1117] border border-sky-500/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          <X size={22} />
        </button>

        <div className="grid h-full md:grid-cols-2">
          {/* LEFT — Registration */}
          <div className="flex items-center justify-center p-6 md:p-10 overflow-y-auto">
            <div className="w-full max-w-md">
              <div className="mb-6">
                <h2 className="text-4xl font-bold text-white">
                  Become a Member
                </h2>

                <p className="mt-2 text-slate-400">
                  Start building a better trading journey with BigFree FX.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full Name */}
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />

                {/* Email */}
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />

                {/* Phone */}
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />

                {/* Country */}
                <input
                  type="text"
                  placeholder="Country"
                  className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />

                {/* Password */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 pr-12 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full h-12 bg-[#111820] border border-slate-700 rounded-xl px-4 pr-12 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              {/* Important */}
              <div className="mt-5 rounded-xl bg-yellow-500/10 border border-yellow-500/30 p-4">
                <h3 className="text-yellow-400 font-semibold mb-2">
                  Important
                </h3>

                <p className="text-slate-300 text-xs leading-5">
                  Registration does <strong>not</strong> give immediate access.
                  <br />
                  <br />
                  Accounts are approved only after payment has been verified by
                  the BigFree FX administrator.
                  <br />
                  <br />
                  If you register before making payment, your registration will
                  remain pending and may be deleted.
                </p>
              </div>

              {/* Register */}
              <button className="w-full mt-5 h-12 bg-sky-500 hover:bg-sky-600 rounded-xl font-semibold text-white text-lg transition shadow-lg shadow-sky-500/20">
                Register
              </button>

              {/* Mobile Login */}
              <div className="mt-5 text-center text-slate-400 md:hidden">
                Already have an account?
                <button
                  onClick={() => {
                    onClose();
                    openLogin();
                  }}
                  className="ml-2 text-sky-400 hover:underline"
                >
                  Login
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — Welcome */}
          <div className="relative hidden md:flex flex-col items-center justify-center text-center p-12 overflow-hidden bg-gradient-to-br from-[#087db5] via-[#082c45] to-[#071827]">
            {/* Decorative glow */}
            <div className="absolute -top-40 -right-40 w-[450px] h-[450px] bg-sky-400/20 rounded-full blur-3xl" />

            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

            <div className="relative z-10">
              <div className="mb-8">
                <div className="text-5xl font-black tracking-wider text-white">
                  BIGFREE FX
                </div>

                <div className="mt-2 text-sm font-semibold tracking-[6px] text-sky-300">
                  TRADING
                </div>
              </div>

              <h2 className="text-4xl font-bold text-white mb-5">
                Welcome to BigFree FX!
              </h2>

              <p className="text-slate-200 text-lg leading-8 max-w-sm">
                Everything you need to build a better trading journey, develop
                discipline, understand your performance and keep growing as a
                trader.
              </p>

              <div className="mt-10">
                <p className="text-slate-300 mb-6">Already have an account?</p>
                <button
                  onClick={() => {
                    onClose();
                    openLogin();
                  }}
                  className="px-10 py-3 rounded-xl border-2 border-sky-300 text-white font-semibold hover:bg-sky-400 hover:text-[#071827] transition"
                >
                  Member Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
