import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthPanel({ authMode, setAuthMode }) {
  if (!authMode) return null;

  return (
    <div className="relative w-full">
      {/* Close Button */}
      <button
        onClick={() => setAuthMode(null)}
        className="absolute -top-2 right-0 text-gray-400 hover:text-white transition"
      >
        <X size={28} />
      </button>

      {authMode === "login" ? (
        <LoginForm setAuthMode={setAuthMode} />
      ) : (
        <RegisterForm setAuthMode={setAuthMode} />
      )}
    </div>
  );
}
