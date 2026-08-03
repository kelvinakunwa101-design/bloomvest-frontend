import {
  HiOutlineArrowDownTray,
  HiOutlineArrowUpTray,
  HiOutlineArrowsRightLeft,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./TransactionStats.module.css";

const stats = [
  {
    title: "Total Transactions",
    value: "1,248",
    icon: HiOutlineArrowsRightLeft,
    color: "#2563EB",
  },
  {
    title: "Deposits",
    value: "$84,500",
    icon: HiOutlineArrowDownTray,
    color: "#10B981",
  },
  {
    title: "Withdrawals",
    value: "$28,700",
    icon: HiOutlineArrowUpTray,
    color: "#F59E0B",
  },
  {
    title: "Success Rate",
    value: "99.7%",
    icon: HiOutlineCheckBadge,
    color: "#7C3AED",
  },
];

const TransactionStats = () => {
  return (
    <section className={styles.wrapper}>
      <motion.div
        className={styles.grid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {stats.map((item) => (
          <motion.div
            key={item.title}
            className={styles.card}
            variants={{
              hidden: {
                opacity: 0,
                y: 25,
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
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
          >
            <div
              className={styles.icon}
              style={{
                background: item.color,
              }}
            >
              <item.icon size={28} />
            </div>

            <span>{item.title}</span>

            <h2>{item.value}</h2>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default TransactionStats;