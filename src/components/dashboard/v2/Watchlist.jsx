import { motion } from "framer-motion";
import { HiArrowTrendingUp, HiArrowTrendingDown } from "react-icons/hi2";
import styles from "./Watchlist.module.css";

const Watchlist = ({ assets = [] }) => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <h2>Watchlist</h2>

        <button className={styles.viewAll}>
          View All
        </button>
      </div>

      {assets.length === 0 ? (
  <div className={styles.empty}>
    Your watchlist is empty.
  </div>
) : (
  <div className={styles.list}>
    {assets.map((asset) => (
      <motion.div
        key={asset.id}
        className={styles.card}
        whileHover={{ y: -3 }}
      >
        <div className={styles.left}>
          <div className={styles.symbol}>
            {asset.symbol}
          </div>

          <div>
            <h4>{asset.name}</h4>
            <p>{asset.symbol}</p>
          </div>
        </div>

        <div className={styles.right}>
          <strong>
            ${asset.price.toLocaleString()}
          </strong>

          <span
            className={
              asset.change >= 0
                ? styles.positive
                : styles.negative
            }
          >
            {asset.change >= 0 ? (
              <HiArrowTrendingUp />
            ) : (
              <HiArrowTrendingDown />
            )}

            {asset.change > 0 ? "+" : ""}
            {asset.change}%
          </span>
        </div>
      </motion.div>
    ))}
  </div>
)}
    </motion.section>
  );
};

export default Watchlist;