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

  const token = localStorage.getItem("token");

  // AUTH GUARD
  useEffect(() => {
    if (!token) window.location.href = "/";
  }, [token]);

  // USER
  let user = null;
  try {
    if (token) user = jwtDecode(token);
  } catch {}

  // LOAD DATA
  const load = useCallback(async () => {
    try {
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
        if (t.type === "deposit" || t.type === "profit")
          return acc + Number(t.amount || 0);
        if (t.type === "withdrawal")
          return acc - Number(t.amount || 0);
        return acc;
      }, 0);

      setWallet({ balance });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  // METRICS
  const profit = transactions.reduce(
    (acc, t) =>
      t.type === "profit" ? acc + Number(t.amount || 0) : acc,
    0
  );

  // CHART DATA
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
          <p>System Status: <span className="live">ONLINE</span></p>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Portfolio Dashboard</h1>
            <p className="muted">Welcome back, {user?.name}</p>
          </div>

          <div className="balanceCard">
            ${wallet.balance.toLocaleString()}
            <span>Live Balance</span>
          </div>
        </div>

        {/* INSIGHT */}
        <div className="insight">
          📈 Insight: Portfolio is stable with positive deposit activity.
        </div>

        {/* KPI */}
        <div className="grid">
          <KPI title="Wallet" value={`$${wallet.balance}`} />
          <KPI title="Transactions" value={transactions.length} />
          <KPI title="Investments" value={investments.length} />
          <KPI title="Profit" value={`$${profit}`} />
        </div>

        {/* CHARTS */}
        <div className="panel">
          <h3>Performance Trend</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={profitTrend}>
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4f9cff" strokeWidth={2} />
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

        {/* TABLE */}
        <div className="panel">
          <h3>Transaction Ledger</h3>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : (
            transactions.map((t) => (
              <div key={t._id} className="row">
                <span className={`tag ${t.type}`}>{t.type}</span>
                <span>${Number(t.amount).toLocaleString()}</span>
                <span className="muted">
                  {new Date(t.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* STYLE */}
      <style>{`
        body { margin:0; font-family:Inter,sans-serif; background:#0b1220; }

        .app { display:flex; min-height:100vh; color:white; }

        .sidebar {
          width:260px;
          padding:25px;
          background:rgba(255,255,255,0.03);
          border-right:1px solid rgba(255,255,255,0.05);
          display:flex;
          flex-direction:column;
          justify-content:space-between;
        }

        .logo { color:#4f9cff; }

        .sub { opacity:0.6; font-size:12px; }

        .userBox { margin:20px 0; }

        .userName { font-weight:bold; }
        .userEmail { font-size:12px; opacity:0.6; }

        .badge {
          margin-top:10px;
          padding:8px;
          background:rgba(255,255,255,0.05);
          border-radius:10px;
          font-size:12px;
        }

        .live { color:#22c55e; }

        .main { flex:1; padding:30px; }

        .header {
          display:flex;
          justify-content:space-between;
          align-items:center;
        }

        .balanceCard {
          background:#111a2e;
          padding:15px 20px;
          border-radius:12px;
          font-size:20px;
          font-weight:bold;
        }

        .balanceCard span {
          display:block;
          font-size:12px;
          opacity:0.6;
        }

        .insight {
          margin:20px 0;
          padding:12px;
          background:rgba(79,156,255,0.1);
          border-radius:10px;
        }

        .grid {
          display:grid;
          grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
          gap:15px;
        }

        .panel {
          margin-top:20px;
          padding:20px;
          background:rgba(255,255,255,0.04);
          border-radius:14px;
        }

        .row {
          display:flex;
          justify-content:space-between;
          padding:10px 0;
          border-bottom:1px solid rgba(255,255,255,0.05);
        }

        .tag {
          padding:4px 8px;
          border-radius:20px;
          font-size:12px;
        }

        .deposit { background:#1f8f5f; }
        .withdrawal { background:#c0392b; }
        .profit { background:#f39c12; }

        .muted { opacity:0.6; }
      `}</style>
    </div>
  );
}

function KPI({ title, value }) {
  return (
    <div className="panel">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;