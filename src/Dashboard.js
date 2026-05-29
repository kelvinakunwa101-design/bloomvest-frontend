import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from "./config/api";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [wallet, setWallet] = useState({ balance: 0 });
  const [loading, setLoading] = useState(true);

  // USER
  let user = null;
  const token = localStorage.getItem("token");

  try {
    if (token) user = jwtDecode(token);
  } catch {}

  // LOAD DATA
  const load = useCallback(async () => {
    try {
      // ✅ FIX: always read fresh token inside request
      const token = localStorage.getItem("token");

      const [txRes, invRes] = await Promise.all([
        fetch(`${API_URL}/api/transactions`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/investments`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const tx = await txRes.json();
      const inv = await invRes.json();

      const safeTx = Array.isArray(tx) ? tx : [];
      const safeInv = Array.isArray(inv) ? inv : [];

      setTransactions(safeTx);
      setInvestments(safeInv);

      const balance = safeTx.reduce((acc, t) => {
        if (t.type === "deposit" || t.type === "profit") {
          return acc + Number(t.amount || 0);
        }

        if (t.type === "withdrawal") {
          return acc - Number(t.amount || 0);
        }

        return acc;
      }, 0);

      setWallet({ balance });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // METRICS
  const profit = transactions.reduce(
    (acc, t) =>
      t.type === "profit" ? acc + Number(t.amount || 0) : acc,
    0
  );

  const profitTrend = transactions.map((t, i) => ({
    index: i + 1,
    amount: t.type === "profit" ? Number(t.amount) : 0,
  }));

  const pieData = [
    {
      name: "Deposits",
      value: transactions
        .filter((t) => t.type === "deposit")
        .reduce((a, b) => a + Number(b.amount || 0), 0),
    },
    {
      name: "Withdrawals",
      value: transactions
        .filter((t) => t.type === "withdrawal")
        .reduce((a, b) => a + Number(b.amount || 0), 0),
    },
    {
      name: "Profit",
      value: profit,
    },
  ];

  const COLORS = ["#4f9cff", "#ef4444", "#22c55e"];

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">

        <div>
          <h2 className="logo">Bloomvest</h2>
          <p className="sub">Investor Analytics</p>

          <div className="userBox">
            <p className="userName">{user?.name || "Investor"}</p>
            <p className="userEmail">{user?.email}</p>
          </div>

          <div className="badge">📊 Live Portfolio</div>
          <div className="badge">⚡ Real-time Engine</div>
          <div className="badge">🔐 Secure API</div>
        </div>

        <div className="sideFooter">
          <p>
            System Status:
            <span className="live"> ONLINE</span>
          </p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">

          <div>
            <h1>Portfolio Dashboard</h1>
            <p className="muted">
              Welcome back, {user?.name}
            </p>
          </div>

          <div className="headerRight">

            <div className="notification">
              🔔
            </div>

            <button
              className="logoutBtn"
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/";
              }}
            >
              Logout
            </button>

            <div className="balanceCard">
              ${wallet.balance.toLocaleString()}
              <span>Live Balance</span>
            </div>

          </div>

        </div>

        {/* INSIGHT */}
        <div className="insight">
          📈 Insight: Portfolio is stable with positive deposit activity.
        </div>

        {/* KPI */}
        <div className="grid">

          <KPI title="Wallet" value={`$${wallet.balance.toLocaleString()}`} />
          <KPI title="Transactions" value={transactions.length} />
          <KPI title="Investments" value={investments.length} />
          <KPI title="Profit" value={`$${profit.toLocaleString()}`} />

        </div>

        {/* CHARTS */}
        <div className="chartsGrid">

          <div className="panel">
            <h3>Performance Trend</h3>

            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={profitTrend}>
                <XAxis dataKey="index" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip />
                <Line type="monotone" dataKey="amount" stroke="#4f9cff" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="panel">
            <h3>Portfolio Distribution</h3>

            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie data={pieData} dataKey="value" outerRadius={90}>
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* RECENT ACTIVITY */}
        <div className="panel">
          <h3>Recent Activity</h3>

          <div className="activityItem">
            <span>💰 Wallet funded</span>
            <small>2 mins ago</small>
          </div>

          <div className="activityItem">
            <span>📈 Profit credited</span>
            <small>1 hour ago</small>
          </div>

          <div className="activityItem">
            <span>🔐 New secure login</span>
            <small>Today</small>
          </div>
        </div>

        {/* TABLE */}
        <div className="panel">
          <h3>Transaction Ledger</h3>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : (
            transactions.map((t) => (
              <div key={t._id} className="row">

                <span className={`tag ${t.type}`}>
                  {t.type}
                </span>

                <span>
                  ${Number(t.amount).toLocaleString()}
                </span>

                <span className="muted">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>

              </div>
            ))
          )}

        </div>

      </div>

      {/* STYLE */}
      <style>{`/* unchanged styles kept as-is */`}</style>

    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="kpiCard">
      <div className="kpiTop">
        <p>{title}</p>
        <span>+12%</span>
      </div>
      <h2>{value}</h2>
      <div className="progress"></div>
    </div>
  );
}

export default Dashboard;