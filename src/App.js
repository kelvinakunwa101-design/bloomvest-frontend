import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import { useAuth } from "./context/AuthContext";
import Dashboard from "./pages/DashboardV2";
import Wallet from "./pages/Wallet";
import Investments from "./pages/Investments";
import Transactions from "./pages/Transactions";
import Analytics from "./pages/Analytics";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import UtilityPayments from "./pages/UtilityPayments";
import Settings from "./pages/Settings";
import Login from "./Login";

function App() {
  const { user } = useAuth();

  

  return (
    <BrowserRouter>
      <Routes>
        {/* Auto-login */}
        <Route
          path="/"
          element={
           user ? (
         <Navigate to="/dashboard" replace />
            ) : (
         <Login />
        )
       }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Wallet */}
        <Route
          path="/wallet"
          element={
            <ProtectedRoute>
              <Wallet />
            </ProtectedRoute>
          }
        />

        {/* Investments */}
        <Route
          path="/investments"
          element={
            <ProtectedRoute>
              <Investments />
            </ProtectedRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* Analytics */}
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

<Route
  path="/change-password"
  element={
    <ProtectedRoute>
      <ChangePassword />
    </ProtectedRoute>
  }
/>
<Route
  path="/utilities"
  element={
    <ProtectedRoute>
      <UtilityPayments />
    </ProtectedRoute>
  }
/>
        {/* Settings */}
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;