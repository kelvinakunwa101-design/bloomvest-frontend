import { useEffect, useState } from "react";

import API_URL from "../config/api";

import WalletOverview from "../components/dashboard/v2/WalletOverview";
import ActivityFeed from "../components/dashboard/v2/ActivityFeed";
import UpcomingPayouts from "../components/dashboard/v2/UpcomingPayouts";
import QuickActions from "../components/dashboard/v2/QuickActions";

import PageLayout from "../components/layout/PageLayout";

const Wallet = () => {
  const [wallet, setWallet] = useState({
    balance: 0,
  });

  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const loadWallet = async () => {
      try {
        const token = localStorage.getItem("token");

        const [walletRes, investmentRes] = await Promise.all([
          fetch(`${API_URL}/api/wallet`, {
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

        const walletData = await walletRes.json();
        const investmentData = await investmentRes.json();

        setWallet(walletData || { balance: 0 });
        setInvestments(
          Array.isArray(investmentData)
            ? investmentData
            : []
        );
      } catch (err) {
        console.error(err);
      }
    };

    loadWallet();
  }, []);

  return (
    <PageLayout>
      <WalletOverview
        wallet={wallet}
        investments={investments}
      />

      <QuickActions />

      <UpcomingPayouts />

      <ActivityFeed />
    </PageLayout>
  );
};

export default Wallet;