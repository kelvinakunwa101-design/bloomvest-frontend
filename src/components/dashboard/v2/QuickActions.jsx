import { useState } from "react";
import {
  HiOutlineBanknotes,
  HiOutlineArrowDownTray,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
} from "react-icons/hi2";


import { motion } from "framer-motion";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import styles from "./QuickActions.module.css";

const actions = [
  {
    title: "Deposit",
    subtitle: "Add funds to your wallet",
    icon: HiOutlineBanknotes,
    color: "#2563EB",
  },
  {
    title: "Withdraw",
    subtitle: "Transfer money out",
    icon: HiOutlineArrowDownTray,
    color: "#EF4444",
  },
  {
    title: "Invest",
    subtitle: "Start a new investment",
    icon: HiOutlineArrowTrendingUp,
    color: "#10B981",
  },
  {
    title: "Analytics",
    subtitle: "View detailed reports",
    icon: HiOutlineChartBar,
    color: "#7C3AED",
  },
];

const QuickActions = ({ onActionComplete }) => {
const [depositOpen, setDepositOpen] = useState(false);
const [withdrawOpen, setWithdrawOpen] = useState(false);
  return (
    <motion.section
  className={styles.wrapper}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  }}
>
      <h2>Quick Actions</h2>

      <div className={styles.grid}>
        {actions.map((action) => (
        <motion.div
  key={action.title}
   onClick={() => {
  if (action.title === "Deposit") {
    setDepositOpen(true);
  }

  if (action.title === "Withdraw") {
    setWithdrawOpen(true);
  }
}}
  className={styles.card}
  style={{ background: action.color }}
  variants={{
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
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
    scale: 1.03,
  }}
  whileTap={{
    scale: 0.96,
  }}
>
            <motion.div
  className={styles.icon}
  whileHover={{
    rotate: 8,
    scale: 1.15,
  }}
  transition={{
    duration: 0.25,
  }}
>
            <action.icon size={30} />
              </motion.div>

            <div className={styles.title}>
              {action.title}
            </div>

            <div className={styles.subtitle}>
              {action.subtitle}
            </div>
          </motion.div>
        ))}
      </div>
      <DepositModal
  isOpen={depositOpen}
  onClose={() => setDepositOpen(false)}
  onSuccess={onActionComplete}
/>

<WithdrawModal
  isOpen={withdrawOpen}
  onClose={() => setWithdrawOpen(false)}
  onSuccess={onActionComplete}
/>
    </motion.section>
  );
};

export default QuickActions;