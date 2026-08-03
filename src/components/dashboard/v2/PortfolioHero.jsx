import styles from "./PortfolioHero.module.css";
import { motion } from "framer-motion";
import { formatCurrency } from "../../../utils/currency";

const PortfolioHero = ({
  user,
  wallet,
  investments,
  profit,
  onDeposit,
  onWithdraw,
}) => {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const activeInvestments = investments.filter(
  (investment) => investment.status === "active"
).length;

const portfolioValue =
  Number(wallet?.balance || 0) +
  investments.reduce(
    (sum, investment) =>
      sum + Number(investment.amount || 0),
    0
  );

const monthlyReturns = Number(profit || 0);

const tier = user?.investorTier || "Bronze";

const verified =
  user?.kycStatus === "Verified";

const accountNumber =
  user?.accountNumber || "N/A";

const investorId =
  user?.investorId || "N/A";

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

  <div
    style={{
      display: "flex",
      gap: "10px",
      marginTop: "10px",
      flexWrap: "wrap",
    }}
  >
    <span className={styles.badge}>
      {tier} Investor
    </span>

    {verified && (
      <span className={styles.verified}>
        ✔ Verified
      </span>
    )}
  </div>

  <p className={styles.subtitle}>
    Account No: {accountNumber}
  </p>

  <p className={styles.subtitle}>
    Investor ID: {investorId}
  </p>
</div>

      <div className={styles.date}>
  <strong>{today}</strong>
</div>
</div>

<div className={styles.balance}>
  <span>Total Portfolio Value</span>

  <h2>{formatCurrency(portfolioValue)}</h2>

  <div className={styles.growth}>
    Portfolio Updated
  </div>
</div>

<div className={styles.stats}>
  <div className={styles.card}>
    <span>Available Cash</span>
    <h3>{formatCurrency(wallet?.balance || 0)}</h3>
  </div>

  <div className={styles.card}>
    <span>Active Investments</span>
    <h3>{activeInvestments} Active</h3>
  </div>

  <div className={styles.card}>
    <span>Monthly Returns</span>
    <h3>{formatCurrency(monthlyReturns)}</h3>
  </div>
</div>

      <div className={styles.actions}>
        <button
            className={styles.primary}
              onClick={onDeposit}
       >
            Deposit
          </button>

        <button className={styles.secondary}>
          Invest
        </button>

        <button
           className={styles.secondary}
           onClick={onWithdraw}
         >
          Withdraw
        </button>
      </div>
    </motion.section>
  );
};

export default PortfolioHero;