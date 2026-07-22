import styles from "./PortfolioHero.module.css";
import { motion } from "framer-motion";

const PortfolioHero = ({ user, balance }) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.section
      className={styles.hero}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    
      >
        
      <div className={styles.top}>
        <div className={styles.greeting}>
          <p>Welcome back 👋</p>

          <h1>{user?.name || "Investor"}</h1>

          <p className={styles.subtitle}>
            Your portfolio is performing well today.
          </p>
        </div>

        <div className={styles.date}>
          <strong>{today}</strong>
        </div>
      </div>

      <div className={styles.balance}>
        <span>Total Portfolio Value</span>

        <h2>${Number(balance).toLocaleString()}</h2>

        <div className={styles.growth}>
          ▲ +12.84% This Month
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.card}>
          <span>Available Cash</span>
          <h3>$24,500</h3>
        </div>

        <div className={styles.card}>
          <span>Active Investments</span>
          <h3>12 Plans</h3>
        </div>

        <div className={styles.card}>
          <span>Monthly Returns</span>
          <h3>$3,820</h3>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primary}>
          Deposit
        </button>

        <button className={styles.secondary}>
          Invest
        </button>

        <button className={styles.secondary}>
          Withdraw
        </button>
      </div>
    </motion.section>
  );
};

export default PortfolioHero;