import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginModal({ open, onClose, openRegister }) {
  const [showPassword, setShowPassword] = useState(false);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-[#1b1b1b] border border-sky-500/20 rounded-2xl shadow-2xl p-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Member Login
        </h2>

        <p className="text-center text-gray-400 mb-8">
          Sign in to access BigFree FX COT Reports.
        </p>

        <input
          type="email"
          placeholder="Email Address"
          className="w-full mb-4 bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-sky-500 outline-none"
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-[#111111] border border-gray-700 rounded-lg px-4 py-3 pr-12 text-white focus:border-sky-500 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-sky-400"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="text-right mb-6">
          <button className="text-sm text-sky-400 hover:underline">
            Forgot Password?
          </button>
        </div>

        <button className="w-full bg-sky-500 hover:bg-sky-600 transition py-3 rounded-lg font-semibold text-white">
          Login
        </button>

        <div className="mt-6 text-center text-gray-400">
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
  );
}
