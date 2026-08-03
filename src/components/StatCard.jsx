import { motion } from "framer-motion";
import styles from "./StatCard.module.css";

export default function StatCard({
  title,
  value,
  icon,
  color = "#10B981",
}) {
  return (
    <motion.div
      className={styles.card}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.25 }}
    >
      <div
        className={styles.icon}
        style={{ background: color }}
      >
        {icon}
      </div>

      <div className={styles.info}>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </motion.div>
  );
}