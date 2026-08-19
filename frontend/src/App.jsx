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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Forgot Password */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Reset Password */}
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* BigFreeFxHub */}
        <Route
          path="/bigfreefxhub"
          element={
            <ProtectedRoute>
              <BigFreeFxHub />
            </ProtectedRoute>
          }
        />

        {/* Member Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Trading Journal Dashboard */}
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

        {/* Admin Dashboard */}
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
