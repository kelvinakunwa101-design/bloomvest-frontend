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

  // AUTH CHECK
  useEffect(() => {
    if (!token) window.location.href = "/";
  }, [token]);

  // USER
  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {}
  }

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
        if (t.type === "deposit" || t.type === "profit") return acc + Number(t.amount || 0);
        if (t.type === "withdrawal") return acc - Number(t.amount || 0);
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

  // PROFIT
  const profit = transactions.reduce((acc, t) => {
    return t.type === "profit" ? acc + Number(t.amount || 0) : acc;
  }, 0);

  // CHART DATA (SAAS ANALYTICS MODE)
  const profitTrend = transactions.map((t, i) => ({
    index: i + 1,
    amount: t.type === "profit" ? t.amount : 0,
  }));

  const pieData = [
    {
      name: "Deposits",
      value: transactions.filter(t => t.type === "deposit")
        .reduce((a, b) => a + Number(b.amount || 0), 0),
    },
    {
      name: "Withdrawals",
      value: transactions.filter(t => t.type === "withdrawal")
        .reduce((a, b) => a + Number(b.amount || 0), 0),
    },
    {
      name: "Profit",
      value: profit,
    },
  ];

  const COLORS = ["#4f9cff", "#ef4444", "#22c55e"];

  // ADD TRANSACTION
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
        description: "Analytics mode transaction",
      }),
    });

    const data = await res.json();

    if (data?._id) {
      setTransactions([data, ...transactions]);
    }

    setAmount("");
  };

  return (
    <div className="app">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2 className="logo">Bloomvest Analytics</h2>
        <p>{user?.name || "Investor"}</p>

        <div className="badge">📊 Analytics Mode</div>
        <div className="badge">⚡ Real-time KPIs</div>
        <div className="badge">🔐 Secure API</div>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Investor Analytics Dashboard</h1>
            <p>{user?.email}</p>
          </div>

          <div className="status">
            Live • {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* KPI CARDS */}
        <div className="grid">
          <Metric title="Wallet Balance" value={`$${wallet.balance}`} />
          <Metric title="Total Transactions" value={transactions.length} />
          <Metric title="Active Investments" value={investments.length} />
          <Metric title="Total Profit" value={`$${profit}`} />
        </div>

        {/* CHARTS */}
        <div className="panel">
          <h3>Profit Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={profitTrend}>
              <XAxis dataKey="index" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#4f9cff" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="panel">
          <h3>Portfolio Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={90}>
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* TRANSACTION PANEL */}
        <div className="panel">
          <h3>Add Transaction</h3>

          <div className="form">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
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

        {/* TABLE */}
        <div className="panel">
          <h3>Transaction Ledger</h3>

          {loading ? (
            <p>Loading...</p>
          ) : transactions.map((t) => (
            <div key={t._id} className="row">
              <span>{t.type}</span>
              <span>${t.amount}</span>
              <span>{new Date(t.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>

      </div>
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