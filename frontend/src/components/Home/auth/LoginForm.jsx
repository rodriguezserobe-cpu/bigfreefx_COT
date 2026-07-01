import { useState } from "react";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AuthInput from "./AuthInput";
import API from "../../../api/auth.js";
import toast from "react-hot-toast";

export default function LoginForm({ setAuthMode }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success(res.data.message);

      setAuthMode(null);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white mb-2">SIGN IN</h2>

      <p className="text-slate-400 mb-4">Welcome back to BigFree FX</p>

      <div className="space-y-4">
        <AuthInput
          icon={<Mail size={18} />}
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
        />

        <AuthInput
          icon={<Lock size={18} />}
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
        />
      </div>

      <div className="text-right mt-3">
        <button
          type="button"
          className="text-slate-400 text-sm hover:text-sky-300"
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 mt-6 rounded-xl bg-sky-500 hover:bg-sky-600 transition font-semibold disabled:opacity-50"
      >
        {loading ? "Signing In..." : "Submit"}
      </button>

      <div className="mt-4 text-center text-slate-400">
        Don't have an account?
      </div>

      <button
        type="button"
        onClick={() => setAuthMode("register")}
        className="w-full mt-2 text-sky-400 hover:text-sky-300 font-semibold"
      >
        Sign Up
      </button>
    </form>
  );
}
