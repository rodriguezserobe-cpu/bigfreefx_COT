import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function AuthInput({
  icon,
  type = "text",
  placeholder,
  name,
  value,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400">
        {icon}
      </span>

      <input
        type={isPassword ? (showPassword ? "text" : "password") : type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          h-11
          rounded-xl
          border
          border-slate-600
          bg-transparent
          pl-12
          pr-12
          text-white
          placeholder:text-slate-400
          focus:outline-none
          focus:border-sky-500
          transition
        "
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-sky-400 transition"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
    </div>
  );
}
