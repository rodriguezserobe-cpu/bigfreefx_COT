import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginModal({ open, onClose, openRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-5xl h-[620px] bg-[#0d1117] border border-sky-500/20 rounded-3xl shadow-2xl overflow-hidden">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700 transition"
        >
          <X size={22} />
        </button>

        <div className="grid h-full md:grid-cols-2">
          {/* LEFT — Welcome Panel */}
          <div className="relative hidden md:flex flex-col items-center justify-center text-center p-12 overflow-hidden bg-gradient-to-br from-[#071827] via-[#082c45] to-[#087db5]">
            {/* Decorative glow */}
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-sky-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-[450px] h-[450px] bg-blue-500/20 rounded-full blur-3xl" />

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
                Welcome Back!
              </h2>

              <p className="text-slate-200 text-lg mb-8">
                Continue your trading journey with BigFree FX.
              </p>

              <p className="text-slate-300 mb-6">Don't have an account?</p>

              <button
                onClick={() => {
                  onClose();
                  openRegister();
                }}
                className="px-10 py-3 rounded-xl border-2 border-sky-300 text-white font-semibold hover:bg-sky-400 hover:text-[#071827] transition"
              >
                Become a Member
              </button>
            </div>
          </div>

          {/* RIGHT — Login Form */}
          <div className="flex items-center justify-center p-6 md:p-12 overflow-y-auto">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <h2 className="text-4xl font-bold text-white">Member Login</h2>

                <p className="mt-2 text-slate-400">
                  Sign in and continue building your trading journey.
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block mb-2 text-sm text-slate-300">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-13 bg-[#111820] border border-slate-700 rounded-xl px-4 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block mb-2 text-sm text-slate-300">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full h-13 bg-[#111820] border border-slate-700 rounded-xl px-4 pr-12 text-white placeholder-slate-500 outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Forgot password */}
              <div className="flex justify-end mb-7">
                <button className="text-sm text-sky-400 hover:text-sky-300 hover:underline">
                  Forgot Password?
                </button>
              </div>

              {/* Login */}
              <button className="w-full h-13 bg-sky-500 hover:bg-sky-600 rounded-xl font-semibold text-white text-lg transition shadow-lg shadow-sky-500/20">
                Login
              </button>

              {/* Mobile register */}
              <div className="mt-7 text-center text-slate-400 md:hidden">
                Don't have an account?
                <button
                  onClick={() => {
                    onClose();
                    openRegister();
                  }}
                  className="ml-2 text-sky-400 hover:underline"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
