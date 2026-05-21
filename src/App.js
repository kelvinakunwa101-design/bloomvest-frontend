import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Dashboard from "./Dashboard";
import Login from "./Login";

function App() {

  const isAuthenticated = () => {
    return localStorage.getItem("token") !== null;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Auto-login logic */}
        <Route
          path="/"
          element={
            isAuthenticated() ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        {/* Protected dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;