import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from "../config/api";

import PageLayout from "../components/layout/PageLayout";

import DashboardGrid from "../components/dashboard/v2/DashboardGrid";
import PortfolioHero from "../components/dashboard/v2/PortfolioHero";
import StatCards from "../components/dashboard/v2/StatCards";
import PerformanceChart from "../components/dashboard/v2/PerformanceChart";
import AssetAllocation from "../components/dashboard/v2/AssetAllocation";
import InvestmentPlans from "../components/dashboard/v2/InvestmentPlans";
import RecentTransactions from "../components/dashboard/v2/RecentTransactions";
import QuickActions from "../components/dashboard/v2/QuickActions";
import Notifications from "../components/dashboard/v2/Notifications";
import MarketNews from "../components/dashboard/v2/MarketNews";

function DashboardV2() {
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [wallet] = useState({ balance: 0 });

  const token = localStorage.getItem("token");

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
          },
        }),
        fetch(`${API_URL}/api/investments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const txData = await txRes.json();
      const invData = await invRes.json();

      setTransactions(Array.isArray(txData) ? txData : []);
      setInvestments(Array.isArray(invData) ? invData : []);
    } catch (err) {
      console.error(err);
    }
  }, [token]);

  useEffect(() => {
    if (token) load();
  }, [token, load]);

  const profit = transactions.reduce(
    (acc, t) =>
      t.type === "profit"
        ? acc + Number(t.amount || 0)
        : acc,
    0
  );

  const profitTrend = transactions.map((t, index) => ({
    index: index + 1,
    amount:
      t.type === "profit"
        ? Number(t.amount || 0)
        : 0,
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

  return (
    <PageLayout>
      <PortfolioHero
        user={user}
        balance={wallet.balance}
      />

      <StatCards
        wallet={wallet.balance}
        profit={profit}
        transactions={transactions.length}
        investments={investments.length}
      />

      <DashboardGrid
        left={
          <>
            <PerformanceChart data={profitTrend} />

            <InvestmentPlans />

            <RecentTransactions
              transactions={transactions}
            />
          </>
        }
        right={
          <>
            <AssetAllocation data={pieData} />

            <QuickActions />

            <Notifications />

            <MarketNews />
          </>
        }
      />
    </PageLayout>
  );
}

export default DashboardV2;