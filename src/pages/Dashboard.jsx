import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { motion } from "framer-motion";

import { api } from "../api/client";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import TransactionRow from "../components/TransactionRow";

function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [type, setType] = useState("deposit");
  const [amount, setAmount] = useState("");

  const token = localStorage.getItem("token");

  let user = null;
  if (token) {
    try {
      user = jwtDecode(token);
    } catch {}
  }

  useEffect(() => {
    const load = async () => {
      const tx = await api.get("/api/transactions");
      const inv = await api.get("/api/investments");

      setTransactions(tx || []);
      setInvestments(inv || []);
      setLoading(false);
    };

    load();
  }, []);

  const balance = transactions.reduce((acc, t) => {
    if (t.type === "deposit" || t.type === "profit") return acc + t.amount;
    if (t.type === "withdrawal") return acc - t.amount;
    return acc;
  }, 0);

  const addTransaction = async () => {
    if (!amount) return;

    const newTx = await api.post("/api/transactions", {
      type,
      amount: Number(amount),
      description: "Investor demo transaction",
    });

    setTransactions([newTx, ...transactions]);
    setAmount("");
  };

  return (
    <div className="app">
      <Sidebar user={user} />

      <div className="main">
        {/* HEADER */}
        <div className="header">
          <div>
            <h1>Portfolio Overview</h1>
            <p>{user?.email}</p>
          </div>

          <div className="status">
            <span>🟢 Live System</span>
          </div>
        </div>

        {/* STATS */}
        <div className="grid">
          <StatCard title="Total Balance" value={`$${balance}`} />
          <StatCard title="Active Investments" value={investments.length} />
          <StatCard title="Transactions" value={transactions.length} />
        </div>

        {/* ACTION PANEL */}
        <motion.div className="panel" whileHover={{ scale: 1.01 }}>
          <h3>Execute Transaction</h3>

          <div className="form">
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option>deposit</option>
              <option>withdrawal</option>
              <option>profit</option>
            </select>

            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Amount"
              type="number"
            />

            <button onClick={addTransaction}>Confirm</button>
          </div>
        </motion.div>

        {/* LEDGER */}
        <div className="panel">
          <h3>Transaction Ledger</h3>

          {loading ? (
            <p>Loading secure financial data...</p>
          ) : (
            transactions.map((t) => (
              <TransactionRow key={t._id} t={t} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;