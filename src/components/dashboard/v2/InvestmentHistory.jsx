import { motion } from "framer-motion";
import styles from "./InvestmentHistory.module.css";

const history = [
  {
    id: 1,
    plan: "Growth Plan",
    amount: "$5,000",
    roi: "+15%",
    status: "Active",
    date: "July 02, 2026",
  },
  {
    id: 2,
    plan: "Premium Plan",
    amount: "$12,000",
    roi: "+22%",
    status: "Completed",
    date: "June 14, 2026",
  },
  {
    id: 3,
    plan: "Starter Plan",
    amount: "$1,500",
    roi: "+8%",
    status: "Active",
    date: "May 28, 2026",
  },
];

const InvestmentHistory = () => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <h2>Investment History</h2>

        <button>View All</button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Plan</th>
            <th>Amount</th>
            <th>ROI</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {history.map((item) => (
            <motion.tr
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <td>{item.plan}</td>
              <td>{item.amount}</td>
              <td className={styles.profit}>{item.roi}</td>

              <td>
                <span
                  className={
                    item.status === "Active"
                      ? styles.active
                      : styles.completed
                  }
                >
                  {item.status}
                </span>
              </td>

              <td>{item.date}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.section>
  );
};

export default InvestmentHistory;