import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const INACTIVITY_LIMIT = 2 * 60 * 60 * 1000; // 2 hours

export default function ProtectedRoute({ children }) {
  const [sessionValid, setSessionValid] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setSessionValid(false);
      return;
    }

    let lastActivity = localStorage.getItem("lastActivity");

    // Start activity timer if it doesn't exist
    if (!lastActivity) {
      lastActivity = Date.now().toString();
      localStorage.setItem("lastActivity", lastActivity);
    }

    const checkSession = () => {
      const currentToken = localStorage.getItem("token");
      const storedActivity = localStorage.getItem("lastActivity");

      if (!currentToken) {
        setSessionValid(false);
        return;
      }

      if (!storedActivity) {
        localStorage.setItem("lastActivity", Date.now().toString());
        setSessionValid(true);
        return;
      }

      const inactiveTime = Date.now() - Number(storedActivity);

      if (inactiveTime >= INACTIVITY_LIMIT) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastActivity");

        setSessionValid(false);
        return;
      }

      setSessionValid(true);
    };

    // Check immediately
    checkSession();

    // Check every minute
    const interval = setInterval(checkSession, 60 * 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // While checking the session
  if (sessionValid === null) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-400 mx-auto" />

          <p className="mt-4 text-slate-400">Checking session...</p>
        </div>
      </div>
    );
  }

  // Session expired / not logged in
  if (!sessionValid) {
    return <Navigate to="/" replace />;
  }

  return children;
}
