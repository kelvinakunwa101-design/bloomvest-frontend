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

  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/";
  }, [token]);

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {}
  }

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

  const profit = transactions.reduce(
    (acc, t) =>
      t.type === "profit" ? acc + Number(t.amount || 0) : acc,
    0
  );

  const profitTrend = transactions.map((t, i) => ({
    index: i + 1,
    amount: t.type === "profit" ? t.amount : 0,
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

  const addTransaction = async () => {
    if (!amount) return;

    const res = await fetch(`${API_URL}/api/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        type,
        amount: Number(amount),
        description: "Investor transaction",
      }),
    });

    const data = await res.json();

    if (data?._id) setTransactions([data, ...transactions]);

    setAmount("");
  };

  return (
    <div className="app">
      {/* SIDEBAR */}
      <div className="sidebar">
        <div>
          <h2 className="logo">Bloomvest</h2>
          <p className="user">{user?.name || "Investor"}</p>

          <div className="badge">📊 Analytics Mode</div>
          <div className="badge">⚡ Live Data</div>
          <div className="badge">🔐 Secure API</div>
        </div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER STRIP (NEW IMPACT FEATURE) */}
        <div className="topbar">
          <div>
            <h1>Investor Dashboard</h1>
            <p className="muted">{user?.email}</p>
          </div>

          <div className="status">
            Live • {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid">
          <Metric title="Wallet Balance" value={`$${wallet.balance.toLocaleString()}`} />
          <Metric title="Transactions" value={transactions.length} />
          <Metric title="Investments" value={investments.length} />
          <Metric title="Profit" value={`$${profit.toLocaleString()}`} />
        </div>

        {/* CHARTS */}
        <div className="panel">
          <h3>Profit Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={profitTrend}>
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4f9cff" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>Portfolio Breakdown</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TRANSACTION */}
        <div className="panel">
          <h3>Execute Transaction</h3>

          <div className="form">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdraw</option>
              <option value="profit">Profit</option>
            </select>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
            />

            <button onClick={addTransaction}>Execute</button>
          </div>
        </div>

        {/* LEDGER */}
        <div className="panel">
          <h3>Transaction Feed</h3>

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

      {/* STYLE POLISH ONLY */}
      <style>{`
        .app {
          display: flex;
          min-height: 100vh;
          background: #0b1220;
          color: white;
          font-family: Inter, sans-serif;
        }

        .sidebar {
          width: 260px;
          padding: 25px;
          background: rgba(255,255,255,0.03);
          border-right: 1px solid rgba(255,255,255,0.05);
        }

        .logo { color: #4f9cff; }

        .user { opacity: 0.8; margin-bottom: 20px; }

        .badge {
          margin-top: 10px;
          padding: 10px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          font-size: 12px;
        }

        .main { flex: 1; padding: 30px; }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .muted { opacity: 0.6; }

        .status {
          padding: 8px 12px;
          border-radius: 10px;
          background: rgba(0,255,120,0.1);
          font-size: 12px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 15px;
          margin-top: 25px;
        }

        .panel {
          margin-top: 25px;
          padding: 20px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.05);
        }

        .form {
          display: flex;
          gap: 10px;
          margin-top: 10px;
        }

        input, select {
          padding: 10px;
          border-radius: 10px;
          border: none;
        }

        button {
          background: #4f9cff;
          border: none;
          padding: 10px 14px;
          border-radius: 10px;
          color: white;
          font-weight: bold;
        }

        .row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .tag {
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
          text-transform: capitalize;
        }

        .deposit { background: #1f8f5f; }
        .withdrawal { background: #c0392b; }
        .profit { background: #f39c12; }
      `}</style>
    </div>
  );
}

function Metric({ title, value }) {
  return (
    <div className="panel">
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

export default Dashboard;