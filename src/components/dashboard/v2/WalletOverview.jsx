import {
  HiOutlineCurrencyDollar,
  HiOutlineBanknotes,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineCreditCard,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/currency";
import styles from "./WalletOverview.module.css";

const WalletOverview = ({
  wallet = { balance: 0 },
  investments = [],
}) => {
  const totalInvested = investments.reduce(
    (sum, investment) => sum + Number(investment.amount || 0),
    0
  );

  const totalProfit = investments.reduce(
    (sum, investment) =>
      sum + Number(investment.expectedProfit || 0),
    0
  );

  const portfolioValue = totalInvested + totalProfit;

  const wallets = [
    {
      currency: "Main Wallet",
      balance: formatCurrency(wallet.balance),
      growth: "Live Balance",
      icon: HiOutlineBanknotes,
      color: "#10B981",
    },
    {
      currency: "Investment Wallet",
      balance: formatCurrency(totalInvested),
      growth: `${investments.length} Investment(s)`,
      icon: HiOutlineCurrencyDollar,
      color: "#2563EB",
    },
    {
      currency: "Expected Profit",
      balance: formatCurrency(totalProfit),
      growth: "Projected Return",
      icon: HiOutlineGlobeEuropeAfrica,
      color: "#7C3AED",
    },
    {
      currency: "Portfolio Value",
      balance: formatCurrency(portfolioValue),
      growth: "Current Value",
      icon: HiOutlineCreditCard,
      color: "#F59E0B",
    },
  ];

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Wallet Overview</h2>
        <button>Manage Wallets</button>
      </div>

      <motion.div
        className={styles.grid}
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {wallets.map((item) => (
          <motion.div
            key={item.currency}
            className={styles.card}
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.96,
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
              },
            }}
            transition={{
              duration: 0.45,
              ease: "easeOut",
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
          >
            <div
              className={styles.icon}
              style={{ background: item.color }}
            >
              <item.icon size={28} />
            </div>

            <h3>{item.currency}</h3>

            <div className={styles.balance}>
              {item.balance}
            </div>

            <span>Current Balance</span>

            <div className={styles.growth}>
              {item.growth}
            </div>

            <button className={styles.button}>
              View Details
            </button>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default WalletOverview;