import { motion } from "framer-motion";
import styles from "./InvestmentPlans.module.css";

const plans = [
  {
    name: "Starter Plan",
    returnRate: "8%",
    duration: "30 Days",
    minimum: "$500",
    funded: 63,
    risk: "Low",
    color: "#2563EB",
  },
  {
    name: "Growth Plan",
    returnRate: "15%",
    duration: "90 Days",
    minimum: "$2,000",
    funded: 82,
    risk: "Medium",
    color: "#10B981",
  },
  {
    name: "Premium Plan",
    returnRate: "22%",
    duration: "180 Days",
    minimum: "$10,000",
    funded: 91,
    risk: "High",
    color: "#7C3AED",
  },
];

const InvestmentPlans = () => {
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
        staggerChildren: 0.15,
      },
    },
  }}
>
      <div className={styles.header}>
        <div>
          <h2>Investment Plans</h2>
          <p>Choose a portfolio that matches your goals.</p>
        </div>
      </div>

      <div className={styles.grid}>
  {plans.map((plan) => (
    <motion.div
      key={plan.name}
      className={styles.card}
      variants={{
        hidden: {
          opacity: 0,
          y: 40,
          scale: 0.95,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
        },
      }}
      transition={{
        duration: 0.5,
        ease: "easeOut",
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
    >
      <span
        className={styles.badge}
        style={{ background: plan.color }}
      >
        {plan.risk} Risk
      </span>

      <h3>{plan.name}</h3>

      <div className={styles.return}>
        {plan.returnRate} APR
      </div>

      <div className={styles.info}>
        <span>Duration</span>
        <strong>{plan.duration}</strong>
      </div>

      <div className={styles.info}>
        <span>Minimum</span>
        <strong>{plan.minimum}</strong>
      </div>

      <div className={styles.progress}>
        <motion.div
          className={styles.fill}
          initial={{ width: 0 }}
          whileInView={{ width: `${plan.funded}%` }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 1,
            delay: 0.3,
          }}
          style={{
            background: plan.color,
          }}
        />
      </div>

      <div className={styles.info}>
        <span>Funded</span>
        <strong>{plan.funded}%</strong>
      </div>

      <button
        className={styles.button}
        style={{ background: plan.color }}
      >
        Invest Now
      </button>
    </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default InvestmentPlans;