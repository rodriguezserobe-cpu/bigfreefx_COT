import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import BigFreeFxHub from "./pages/BigFreeFxHub/BigFreeFxHub";
import TradingJournalDashboard from "./pages/TradingJournal/TradingJournalDashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import TradingJournalLayout from "./pages/TradingJournal/TradingJournalLayout";

// ==========================================
// SESSION SETTINGS
// ==========================================

const INACTIVITY_LIMIT = 2 * 60 * 60 * 1000; // 2 hours

// ==========================================
// SESSION ACTIVITY TRACKER
// ==========================================

function SessionManager() {
  useEffect(() => {
    const token = localStorage.getItem("token");

    // Nothing to track if user isn't logged in
    if (!token) {
      return;
    }

    // Start activity timer if it doesn't exist
    if (!localStorage.getItem("lastActivity")) {
      localStorage.setItem("lastActivity", Date.now().toString());
    }

    let lastUpdate = Date.now();

    const updateActivity = () => {
      const now = Date.now();

      /*
       * Don't write to localStorage on every mouse movement.
       * Only update it once every 30 seconds.
       */
      if (now - lastUpdate < 30000) {
        return;
      }

      lastUpdate = now;

      localStorage.setItem("lastActivity", now.toString());
    };

    const checkInactivity = () => {
      const currentToken = localStorage.getItem("token");
      const lastActivity = localStorage.getItem("lastActivity");

      if (!currentToken || !lastActivity) {
        return;
      }

      const inactiveTime = Date.now() - Number(lastActivity);

      if (inactiveTime >= INACTIVITY_LIMIT) {
        console.log("User session expired بسبب inactivity.");

        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("lastActivity");

        // Send user back to homepage/login
        window.location.href = "/";
      }
    };

    // ==========================================
    // USER ACTIVITY
    // ==========================================

    const activityEvents = [
      "click",
      "keydown",
      "mousemove",
      "mousedown",
      "scroll",
      "touchstart",
      "touchmove",
      "wheel",
    ];

    activityEvents.forEach((event) => {
      window.addEventListener(event, updateActivity, {
        passive: true,
      });
    });

    // ==========================================
    // CHECK SESSION EVERY MINUTE
    // ==========================================

    const inactivityInterval = setInterval(checkInactivity, 60 * 1000);

    // Check immediately when component starts
    checkInactivity();

    // ==========================================
    // CLEANUP
    // ==========================================

    return () => {
      activityEvents.forEach((event) => {
        window.removeEventListener(event, updateActivity);
      });

      clearInterval(inactivityInterval);
    };
  }, []);

  return null;
}

// ==========================================
// APP
// ==========================================

function App() {
  return (
    <BrowserRouter>
      {/* Session / inactivity manager */}
      <SessionManager />

      <Routes>
        {/* ================================
            HOME
        ================================= */}

        <Route path="/" element={<Home />} />

        {/* ================================
            FORGOT PASSWORD
        ================================= */}

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================================
            RESET PASSWORD
        ================================= */}

        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* ================================
            BIGFREE FX HUB
        ================================= */}

        <Route
          path="/bigfreefxhub"
          element={
            <ProtectedRoute>
              <BigFreeFxHub />
            </ProtectedRoute>
          }
        />

        {/* ================================
            MEMBER DASHBOARD
        ================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* ================================
            TRADING JOURNAL
        ================================= */}

        <Route element={<TradingJournalLayout />}>
          <Route
            path="/journal"
            element={
              <ProtectedRoute>
                <TradingJournalDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ================================
            ADMIN
        ================================= */}

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
