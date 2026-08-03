import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { motion } from "framer-motion";
import styles from "./TransactionFilters.module.css";

const TransactionFilters = () => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <input
        type="text"
        placeholder="Search transactions..."
        className={styles.search}
      />

      <select className={styles.select}>
        <option>All Status</option>
        <option>Completed</option>
        <option>Pending</option>
        <option>Failed</option>
      </select>

      <select className={styles.select}>
        <option>All Types</option>
        <option>Deposit</option>
        <option>Withdrawal</option>
        <option>Investment</option>
      </select>

      <button className={styles.button}>
        <HiOutlineMagnifyingGlass size={20} />
        Search
      </button>
    </motion.section>
  );
};

export default TransactionFilters;