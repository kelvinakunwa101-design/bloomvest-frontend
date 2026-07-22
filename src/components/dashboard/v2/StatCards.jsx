import { motion } from "framer-motion";
import {
  HiOutlineWallet,
  HiOutlineArrowTrendingUp,
  HiOutlineCreditCard,
  HiOutlineBriefcase,
} from "react-icons/hi2";

import styles from "./StatCards.module.css";

const cards = [
  {
    title: "Wallet Balance",
    key: "wallet",
    color: "#2563EB",
    icon: HiOutlineWallet,
    trend: "+4.8%",
    label: "this month",
  },
  {
    title: "Total Profit",
    key: "profit",
    color: "#10B981",
    icon: HiOutlineArrowTrendingUp,
    trend: "+12.6%",
    label: "overall",
  },
  {
    title: "Transactions",
    key: "transactions",
    color: "#F59E0B",
    icon: HiOutlineCreditCard,
    trend: "+24",
    label: "today",
  },
  {
    title: "Investments",
    key: "investments",
    color: "#8B5CF6",
    icon: HiOutlineBriefcase,
    trend: "+2",
    label: "new plans",
  },
];

const StatCards = ({
  wallet,
  profit,
  transactions,
  investments,
}) => {

  const values = {
    wallet: `$${Number(wallet).toLocaleString()}`,
    profit: `$${Number(profit).toLocaleString()}`,
    transactions,
    investments,
  };

  return (
    <motion.div
  className={styles.container}
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
      {cards.map((card) => (
      <motion.div
  className={styles.container}
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
          <div className={styles.header}>
            <span className={styles.title}>
              {card.title}
            </span>

            <div
              className={styles.icon}
              style={{
                background: card.color,
              }}
            >
              <card.icon size={24} />
            </div>
          </div>

          <div className={styles.value}>
            {values[card.key]}
          </div>

          <div className={styles.footer}>
            <span className={styles.trend}>
              ▲ {card.trend}
            </span>

            <span className={styles.label}>
              {card.label}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatCards;