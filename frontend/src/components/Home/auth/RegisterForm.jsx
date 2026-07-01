import { useState } from "react";
import { User, Mail, Phone, Globe, Lock } from "lucide-react";
import AuthInput from "./AuthInput";
import API from "../../../api/auth.js";
import toast from "react-hot-toast";

export default function RegisterForm({ setAuthMode }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
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

    if (
      !form.fullName ||
      !form.email ||
      !form.phone ||
      !form.country ||
      !form.password ||
      !form.confirmPassword
    ) {
      toast.error("Please fill in all fields.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        country: form.country,
        password: form.password,
      });

      toast.success(res.data.message);

      setAuthMode("login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-white mb-2">SIGN UP</h2>

      <p className="text-slate-400 mb-6">Join BigFree FX today</p>

      <div className="grid grid-cols-2 gap-3">
        <AuthInput
          icon={<User size={18} />}
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
        />

        <AuthInput
          icon={<Mail size={18} />}
          name="email"
          value={form.email}
          onChange={handleChange}
          type="email"
          placeholder="Email"
        />

        <AuthInput
          icon={<Phone size={18} />}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />

        <AuthInput
          icon={<Globe size={18} />}
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
        />

        <AuthInput
          icon={<Lock size={18} />}
          name="password"
          value={form.password}
          onChange={handleChange}
          type="password"
          placeholder="Password"
        />

        <AuthInput
          icon={<Lock size={18} />}
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          type="password"
          placeholder="Confirm Password"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full h-12 mt-6 rounded-xl bg-sky-500 hover:bg-sky-600 transition font-semibold disabled:opacity-50"
      >
        {loading ? "Creating Account..." : "Submit"}
      </button>

      <div className="mt-4 text-center text-slate-400">
        Already have an account?
      </div>

      <button
        type="button"
        onClick={() => setAuthMode("login")}
        className="w-full mt-2 text-sky-400 hover:text-sky-300 font-semibold"
      >
        Sign In
      </button>
    </form>
  );
}
