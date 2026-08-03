import { useEffect, useState, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import API_URL from "../config/api";

import PageLayout from "../components/layout/PageLayout";

import { useAuth } from "../context/AuthContext";
import DashboardGrid from "../components/dashboard/v2/DashboardGrid";
import PortfolioHero from "../components/dashboard/v2/PortfolioHero";
import StatCards from "../components/dashboard/v2/StatCards";
import PerformanceChart from "../components/dashboard/v2/PerformanceChart";
import AssetAllocation from "../components/dashboard/v2/AssetAllocation";
import InvestmentPlans from "../components/dashboard/v2/InvestmentPlans";
import InvestmentPortfolio from "../components/dashboard/v2/InvestmentPortfolio";
import InvestmentHistory from "../components/dashboard/v2/InvestmentHistory";
import RecentTransactions from "../components/dashboard/v2/RecentTransactions";
import QuickActions from "../components/dashboard/v2/QuickActions";


function DashboardV2() {
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [wallet, setWallet] = useState({
  balance: 0,
});

  const { user } = useAuth();

  const token = localStorage.getItem("token");

  const load = useCallback(async () => {
    try {
      const [txRes, invRes, walletRes] = await Promise.all([
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

  fetch(`${API_URL}/api/wallet`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }),
]);

      const txData = await txRes.json();
      const invData = await invRes.json();
      const walletData = await walletRes.json();

      setTransactions(Array.isArray(txData) ? txData : []);
      setInvestments(Array.isArray(invData) ? invData : []);
      setWallet(walletData || { balance: 0 });
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

  const profitTrend = transactions.reduce((acc, transaction, index) => {
  const previous =
    index === 0 ? 0 : acc[index - 1].amount;

  let amount = previous;

  if (
    transaction.type === "deposit" ||
    transaction.type === "profit"
  ) {
    amount += Number(transaction.amount || 0);
  }

  if (
    transaction.type === "withdrawal" ||
    transaction.type === "utility"
  ) {
    amount -= Number(transaction.amount || 0);
  }

  acc.push({
    index: index + 1,
    amount,
  });

  return acc;
}, []);

  const pieData = [
  {
    name: "Deposits",
    value: transactions
      .filter((t) => t.type === "deposit")
      .reduce(
        (sum, t) => sum + Number(t.amount || 0),
        0
      ),
  },
  {
    name: "Investments",
    value: investments.reduce(
      (sum, investment) =>
        sum + Number(investment.amount || 0),
      0
    ),
  },
  {
    name: "Utilities",
    value: transactions
      .filter((t) => t.type === "utility")
      .reduce(
        (sum, t) => sum + Number(t.amount || 0),
        0
      ),
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
      wallet={wallet}
 investments={investments}
      profit={profit}
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

    <InvestmentPlans onInvestmentCreated={load} />

    <InvestmentPortfolio
      investments={investments}
    />

    <InvestmentHistory
    investments={investments}
    />

    <RecentTransactions
      transactions={transactions}
    />
  </>
}
        right={
          <>
            <AssetAllocation data={pieData} />

            <QuickActions onActionComplete={load} />


            
          </>
        }
      />
    </PageLayout>
  );
}

export default DashboardV2;