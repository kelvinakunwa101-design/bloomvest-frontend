import React from "react";

export default function Sidebar({ user }) {
  return (
    <aside className="sidebar">
      <div>
        <h2 className="logo">Bloomvest</h2>
        <p className="sub">Investor Analytics</p>

        <div className="userBox">
          <p className="userName">{user?.name || "Investor"}</p>
          <p className="userEmail">{user?.email || "Welcome back"}</p>
        </div>

        <div className="badge">📊 Live Portfolio</div>
        <div className="badge">⚡ Real-time Engine</div>
        <div className="badge">🔐 Secure API</div>

        <nav
          style={{
            marginTop: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
          }}
        >
          <button className="menuBtn">🏠 Dashboard</button>
          <button className="menuBtn">💼 Investments</button>
          <button className="menuBtn">💳 Wallet</button>
          <button className="menuBtn">📊 Analytics</button>
          <button className="menuBtn">⚙ Settings</button>
        </nav>
      </div>

      <div className="sideFooter">
        <p>
          System Status:
          <span className="live"> ONLINE</span>
        </p>
      </div>
    </aside>
  );
}