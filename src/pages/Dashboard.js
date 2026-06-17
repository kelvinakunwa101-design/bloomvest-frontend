import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from "./config/api";

import TrendingSearch from "./components/TrendingSearch";

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
  const [wallet] = useState({ balance: 0 });
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) window.location.href = "/";
  }, [token]);

  let user = null;

  try {
    if (token) user = jwtDecode(token);
  } catch {}

  const load = useCallback(async () => {
    try {
      const [txRes, invRes] = await Promise.all([
        fetch(`${API_URL}/api/transactions`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),

        fetch(`${API_URL}/api/investments`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }),
      ]);

      const txData = await txRes.json();
      const invData = await invRes.json();

      setTransactions(Array.isArray(txData) ? txData : []);
      setInvestments(Array.isArray(invData) ? invData : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const profit = transactions.reduce(
    (acc, t) => (t?.type === "profit" ? acc + Number(t?.amount || 0) : acc),
    0
  );

  const profitTrend = transactions.map((t, i) => ({
    index: i + 1,
    amount: t?.type === "profit" ? Number(t?.amount || 0) : 0,
  }));

  const pieData = [
    {
      name: "Deposits",
      value: transactions
        .filter((t) => t?.type === "deposit")
        .reduce((a, b) => a + Number(b?.amount || 0), 0),
    },
    {
      name: "Withdrawals",
      value: transactions
        .filter((t) => t?.type === "withdrawal")
        .reduce((a, b) => a + Number(b?.amount || 0), 0),
    },
    {
      name: "Profit",
      value: profit,
    },
  ];

  const COLORS = ["#4f9cff", "#ef4444", "#22c55e"];

  const handleTrendingSelect = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredTransactions = searchTerm
    ? transactions.filter((t) => {
        const type = (t?.type || "").toLowerCase();
        const amount = String(t?.amount || "");

        const date =
          t?.createdAt && !isNaN(new Date(t.createdAt).getTime())
            ? new Date(t.createdAt).toLocaleDateString().toLowerCase()
            : "";

        return (
          type.includes(searchTerm.toLowerCase()) ||
          amount.includes(searchTerm) ||
          date.includes(searchTerm.toLowerCase())
        );
      })
    : transactions;

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

        <div className="header">

          <div>
            <h1>Portfolio Dashboard</h1>
            <p className="muted">Welcome back, {user?.name}</p>
          </div>

          <div className="headerRight">

            <div className="notification">🔔</div>

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

        <div className="insight">
          📈 Insight: Portfolio is stable with positive deposit activity.
        </div>

        <TrendingSearch onSelect={handleTrendingSelect} />

        <div className="grid">
          <KPI title="Wallet" value={`$${wallet.balance.toLocaleString()}`} />
          <KPI title="Transactions" value={transactions.length} />
          <KPI title="Investments" value={investments.length} />
          <KPI title="Profit" value={`$${profit.toLocaleString()}`} />
        </div>

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

        <div className="panel">
          <h3>Transaction Ledger</h3>

          {loading ? (
            <p className="muted">Loading...</p>
          ) : transactions.length === 0 ? (
            <div className="emptyState">
              <h4>No Transactions Yet</h4>
              <p className="muted">
                Your latest transactions will appear here.
              </p>
            </div>
          ) : (
            filteredTransactions.map((t) => (
              <div key={t._id} className="row">

                <span className={`tag ${t?.type}`}>
                  {t?.type}
                </span>

                <span>
                  ${Number(t?.amount || 0).toLocaleString()}
                </span>

                <span className="muted">
                  {t?.createdAt && !isNaN(new Date(t.createdAt).getTime())
                    ? new Date(t.createdAt).toLocaleDateString()
                    : "N/A"}
                </span>

              </div>
            ))
          )}

        </div>

      </div>

      {/* STYLE */}
      <style>{`
.logoutBtn{
  border:none;
  outline:none;
  padding:14px 18px;
  border-radius:14px;
  background:#ef4444;
  color:white;
  font-weight:bold;
  cursor:pointer;
  transition:0.3s ease;
}

.logoutBtn:hover{
  transform:translateY(-2px);
  background:#dc2626;
}

*{
  box-sizing:border-box;
}

body{
  margin:0;
  font-family:Inter,sans-serif;
  background:#0b1220;
}

.app{
  display:flex;
  min-height:100vh;
  background:
  radial-gradient(circle at top,#172554,#0b1220);
  color:white;
}

.sidebar{
  width:260px;
  padding:25px;
  background:rgba(255,255,255,0.03);
  backdrop-filter:blur(12px);
  border-right:1px solid rgba(255,255,255,0.05);
  display:flex;
  flex-direction:column;
  justify-content:space-between;
}

.logo{
  color:#4f9cff;
  font-size:28px;
  margin-bottom:4px;
}

.sub{
  opacity:0.6;
  font-size:12px;
}

.userBox{
  margin:30px 0;
  padding:18px;
  border-radius:16px;
  background:rgba(255,255,255,0.04);
}

.userName{
  font-weight:bold;
  margin:0;
}

.userEmail{
  font-size:12px;
  opacity:0.6;
  margin-top:6px;
}

.badge{
  margin-top:12px;
  padding:12px;
  background:rgba(255,255,255,0.05);
  border-radius:14px;
  font-size:13px;
  transition:0.3s ease;
  border:1px solid rgba(255,255,255,0.04);
}

.badge:hover{
  transform:translateX(5px);
  background:rgba(79,156,255,0.12);
}

.live{
  color:#22c55e;
  font-weight:bold;
}

.main{
  flex:1;
  padding:30px;
}

.header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  flex-wrap:wrap;
}

.header h1{
  margin:0;
  font-size:32px;
}

.headerRight{
  display:flex;
  align-items:center;
  gap:15px;
}

.notification{
  width:55px;
  height:55px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:16px;
  background:rgba(255,255,255,0.05);
  font-size:22px;
  cursor:pointer;
  transition:0.3s ease;
}

.notification:hover{
  transform:translateY(-3px);
  background:rgba(79,156,255,0.15);
}

.balanceCard{
  background:
  linear-gradient(135deg,#4f9cff,#2563eb);
  padding:18px 24px;
  border-radius:18px;
  font-size:24px;
  font-weight:bold;
  color:white;
  box-shadow:
  0 10px 30px rgba(79,156,255,0.35);
}

.balanceCard span{
  display:block;
  font-size:12px;
  opacity:0.85;
  margin-top:6px;
}

.insight{
  margin:25px 0;
  padding:16px;
  background:rgba(79,156,255,0.1);
  border:1px solid rgba(79,156,255,0.2);
  border-radius:14px;
}

.grid{
  display:grid;
  grid-template-columns:
  repeat(auto-fit,minmax(220px,1fr));
  gap:20px;
}

.chartsGrid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:20px;
}

.panel{
  margin-top:20px;
  padding:24px;
  background:
  linear-gradient(145deg,#111827,#0f172a);
  border:1px solid rgba(255,255,255,0.05);
  border-radius:20px;
  box-shadow:
  0 10px 30px rgba(0,0,0,0.25);
  transition:0.3s ease;
}

.panel:hover{
  transform:translateY(-4px);
}

.panel h3{
  margin-top:0;
  margin-bottom:20px;
}

.kpiCard{
  background:
  linear-gradient(145deg,#111a2e,#0f1729);
  border:1px solid rgba(255,255,255,0.05);
  border-radius:20px;
  padding:22px;
  transition:0.3s ease;
  box-shadow:
  0 10px 25px rgba(0,0,0,0.25);
}

.kpiCard:hover{
  transform:translateY(-5px);
  box-shadow:
  0 15px 35px rgba(79,156,255,0.15);
}

.kpiTop{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:15px;
}

.kpiTop p{
  opacity:0.7;
  font-size:14px;
  margin:0;
}

.kpiTop span{
  color:#22c55e;
  font-size:13px;
  font-weight:bold;
}

.kpiCard h2{
  margin:0;
  font-size:32px;
}

.progress{
  height:6px;
  border-radius:20px;
  background:
  linear-gradient(90deg,#4f9cff,#22c55e);
  width:70%;
  margin-top:18px;
}

.activityItem{
  display:flex;
  justify-content:space-between;
  padding:16px 0;
  border-bottom:1px solid rgba(255,255,255,0.05);
}

.activityItem small{
  opacity:0.6;
}

.row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:14px 0;
  border-bottom:1px solid rgba(255,255,255,0.05);
  transition:0.3s ease;
}

.row:hover{
  background:rgba(255,255,255,0.03);
  padding-left:10px;
  padding-right:10px;
  border-radius:10px;
}

.tag{
  padding:6px 10px;
  border-radius:20px;
  font-size:12px;
  font-weight:bold;
  text-transform:capitalize;
}

.deposit{
  background:#1f8f5f;
}

.withdrawal{
  background:#c0392b;
}

.profit{
  background:#f39c12;
}

.emptyState{
  text-align:center;
  padding:40px 20px;
}

.muted{
  opacity:0.6;
}

@media(max-width:900px){

  .app{
    flex-direction:column;
  }

  .sidebar{
    width:100%;
  }

  .chartsGrid{
    grid-template-columns:1fr;
  }

  .header{
    flex-direction:column;
    align-items:flex-start;
  }

  .headerRight{
    width:100%;
    justify-content:space-between;
  }

}

      `}</style>

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