import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API from "../api/auth";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const getStrength = () => {
    if (password.length < 8)
      return {
        text: "Weak",
        color: "text-red-400",
      };

    if (
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*]/.test(password)
    ) {
      return {
        text: "Strong",
        color: "text-green-400",
      };
    }

    return {
      text: "Medium",
      color: "text-yellow-400",
    };
  };

  const strength = getStrength();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      return toast.error("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await API.post(`/auth/reset-password/${token}`, { password });

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111111] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg rounded-2xl border border-slate-700 bg-[#171b22] p-6 sm:p-8 shadow-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Reset Password
        </h1>

        <p className="text-sm sm:text-base text-slate-400 mb-8">
          Enter your new password.
        </p>

        <form onSubmit={submitHandler} className="space-y-5">
          {/* Password */}

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"
            />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 rounded-xl border border-slate-600 bg-transparent pl-12 pr-12 text-white placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Strength */}

          <p className={`text-sm ${strength.color}`}>
            Password Strength: {strength.text}
          </p>

          {/* Confirm Password */}

          <div className="relative">
            <Lock
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400"
            />

            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full h-12 rounded-xl border border-slate-600 bg-transparent pl-12 pr-12 text-white placeholder:text-slate-400 focus:border-sky-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {confirmPassword && password !== confirmPassword && (
            <p className="text-red-400 text-sm">Passwords do not match.</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-sky-500 hover:bg-sky-600 transition font-semibold text-white disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
  );
}
