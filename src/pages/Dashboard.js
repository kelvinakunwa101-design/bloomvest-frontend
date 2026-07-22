import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from "../config/api";
import PageLayout from "../components/layout/PageLayout";

import ActivityFeed from "../components/dashboard/v2/ActivityFeed";
import FinancialGoals from "../components/dashboard/v2/FinancialGoals";
import PortfolioHero from "../components/dashboard/v2/PortfolioHero";
import StatCards from "../components/dashboard/v2/StatCards";
import PerformanceChart from "../components/dashboard/v2/PerformanceChart";
import RecentTransactions from "../components/dashboard/v2/RecentTransactions";
import Watchlist from "../components/dashboard/v2/Watchlist";
import WalletOverview from "../components/dashboard/v2/WalletOverview";
import QuickActions from "../components/dashboard/v2/QuickActions";
import UpcomingPayouts from "../components/dashboard/v2/UpcomingPayouts";
import Notifications from "../components/dashboard/v2/Notifications";
import MarketNews from "../components/dashboard/v2/MarketNews";
import DashboardGrid from "../components/dashboard/v2/DashboardGrid";


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

  const profitTrend = transactions.map((t) => ({
  date: t.createdAt
    ? new Date(t.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    : "N/A",

  amount:
    t.type === "profit"
      ? Number(t.amount || 0)
      : 0,
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
  <PageLayout>
    <PortfolioHero
      user={user}
      balance={wallet.balance}
    />

      <PortfolioOverview />

    <StatCards
      wallet={wallet.balance}
      profit={profit}
      transactions={transactions.length}
      investments={investments.length}
    />

    <PerformanceChart
      data={profitTrend}
    />

    <AssetAllocation
      data={pieData}
    />

    <Watchlist />

    <FinancialGoals />

    <WalletOverview />

    <ActivityFeed />

    <UpcomingPayouts />

    <InvestmentPlans />

    <RecentTransactions
      transactions={filteredTransactions}
    />

    <QuickActions />

    <Notifications />

    <MarketNews />
    </PageLayout>
  );
}

export default Dashboard;