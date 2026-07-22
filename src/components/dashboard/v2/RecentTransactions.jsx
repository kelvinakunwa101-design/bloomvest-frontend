import { motion } from "framer-motion";
import {
  HiArrowDownCircle,
  HiArrowUpCircle,
  HiChartBar,
} from "react-icons/hi2";

import styles from "./RecentTransactions.module.css";

const RecentTransactions = ({ transactions = [] }) => {
  return (
      <motion.section
        className={styles.wrapper}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
           duration: 0.6,
             ease: "easeOut",
        }}
      >
      <div className={styles.header}>
        <h2>Recent Transactions</h2>

        <button>View All</button>
      </div>

      {transactions.length === 0 ? (
        <div className={styles.empty}>
          No recent transactions found.
        </div>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {transactions.map((item) => (
              <motion.tr
                 key={item._id}
                 className={styles.row}
                 initial={{
                   opacity: 0,
                         x: -25,
                  }}
                  whileInView={{
                   opacity: 1,
                         x: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                  duration: 0.4,
                  }}
                 >
                <td className={styles.type}>
  <div className={styles.transactionType}>
    {item.type === "deposit" ? (
      <HiArrowDownCircle color="#10B981" size={20} />
    ) : item.type === "withdrawal" ? (
      <HiArrowUpCircle color="#EF4444" size={20} />
    ) : (
      <HiChartBar color="#2563EB" size={20} />
    )}

            <span
             style={{
            textTransform: "capitalize",
            }}
            >
             {item.type}
            </span>
               </div>
               </td>

                <td
                  className={
                    item.type === "deposit"
                      ? styles.deposit
                      : item.type === "withdrawal"
                      ? styles.withdrawal
                      : styles.profit
                  }
                >
                  ${Number(item.amount).toLocaleString()}
                </td>

                <td>
                  {item.createdAt
                    ? new Date(item.createdAt).toLocaleDateString(
  "en-US",
  {
    day: "numeric",
    month: "short",
    year: "numeric",
  }
)
                    : "-"}
                </td>

                <td>
                  <span className={styles.status}>
                    Completed
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      )}
    </motion.section>
  );
};

export default RecentTransactions;