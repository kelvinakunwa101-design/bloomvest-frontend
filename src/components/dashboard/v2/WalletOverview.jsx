import {
  HiOutlineCurrencyDollar,
  HiOutlineBanknotes,
  HiOutlineGlobeEuropeAfrica,
  HiOutlineCreditCard,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./WalletOverview.module.css";

const wallets = [
  {
  currency: "USD Wallet",
  balance: "$24,560.80",
  growth: "+8.4%",
  icon: HiOutlineCurrencyDollar,
  color: "#2563EB",
  },
  {
    currency: "NGN Wallet",
    balance: "₦8,450,200",
    growth: "+12.1%",
    icon: HiOutlineBanknotes,
    color: "#10B981",
  },
  {
    currency: "EUR Wallet",
    balance: "€12,840",
    growth: "+4.6%",
    icon: HiOutlineGlobeEuropeAfrica,
    color: "#7C3AED",
  },
  {
    currency: "Virtual Card",
    balance: "$3,250",
    growth: "+9.8%",
    icon: HiOutlineCreditCard,
    color: "#F59E0B",
  },
];

const WalletOverview = () => {
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
        {wallets.map((wallet) => (
  <motion.div
    key={wallet.currency}
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
      style={{ background: wallet.color }}
    >
      <wallet.icon size={28} />
    </div>

    <h3>{wallet.currency}</h3>

    <div className={styles.balance}>
      {wallet.balance}
    </div>

    <span>Available Balance</span>
<div className={styles.growth}>
  {wallet.growth} this month
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