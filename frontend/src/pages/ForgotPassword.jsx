import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/auth";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/forgot-password", {
        email,
      });

      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg rounded-2xl border border-slate-700 bg-[#171b22] p-6 sm:p-8 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Forgot Password
        </h1>

        <p className="text-sm sm:text-base text-slate-400 mb-8">
          Enter your email address and we'll send you a password reset link.
        </p>

        <form onSubmit={submitHandler}>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 rounded-xl border border-slate-600 bg-transparent pl-12 pr-4 text-white placeholder:text-slate-400 focus:border-sky-500 focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 transition font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <Link
          to="/"
          className="block mt-6 text-center text-sky-400 hover:text-sky-300 transition"
        >
          ← Back to Login
        </Link>
      </div>
    </div>
  );
}
