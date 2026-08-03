import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Modal from "../../ui/Modal";
import API_URL from "../../../config/api";
import { toast } from "react-toastify";
import styles from "./InvestmentPlans.module.css";

  const InvestmentPlans = ({ onInvestmentCreated }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
  const loadPlans = async () => {
    try {
      const res = await fetch(`${API_URL}/api/investments/plans`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPlans(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  loadPlans();
}, []);

  const getMinimumAmount = (minimum) => Number(minimum);

  const handleInvestment = async () => {
  if (!amount) {
    toast.warning("Please enter an investment amount.");
    return;
  }

  const investmentAmount = Number(amount);
  const minimumAmount = getMinimumAmount(
  selectedPlan.minimumAmount
);

  if (investmentAmount < minimumAmount) {
    toast.warning(
  `Minimum investment for ${selectedPlan.name} is ₦${minimumAmount.toLocaleString()}.`
);
    return;
  }

  try {
    const token = localStorage.getItem("token");
    setLoading(true);
    

    const res = await fetch(`${API_URL}/api/investments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: investmentAmount,
        plan: selectedPlan.name,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Investment failed");
    }

    toast.success("Investment created successfully!");

    if (onInvestmentCreated) {
  await onInvestmentCreated();
}

setAmount("");
setSelectedPlan(null);


  } catch (err) {
    toast.error(err.message);
  }
  finally {
  setLoading(false);
}
};
  
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
             {plan.returnRate}% Expected Return
       </div>

      <div className={styles.info}>
        <span>Duration</span>
        <strong>{plan.duration} Days</strong>
      </div>

      <div className={styles.info}>
        <span>Minimum</span>
        <strong>₦{plan.minimumAmount.toLocaleString()}</strong>
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
          onClick={() => setSelectedPlan(plan)}
       >
             Invest Now
     </button>
    </motion.div>
        ))}
            
         </div>

          <Modal
  isOpen={!!selectedPlan}
  onClose={() => setSelectedPlan(null)}
  title={selectedPlan?.name || "Investment"}
>
  <div className={styles.modalContent}>
    <p>
      Invest in <strong>{selectedPlan?.name}</strong>
    </p>

    <div className={styles.summary}>
      <div>
        <span>Expected Return</span>
        <strong>{selectedPlan?.returnRate}</strong>
      </div>

      <div>
        <span>Duration</span>
        <strong>{selectedPlan?.duration}</strong>
      </div>

      <div>
        <span>Minimum Investment</span>
        <strong>₦{selectedPlan?.minimumAmount?.toLocaleString()}</strong>
      </div>
    </div>

    <label className={styles.label}>
      Investment Amount
    </label>

    <input
  type="number"
  placeholder="Enter amount"
  className={styles.input}
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
/>


<button
  className={styles.confirmButton}
  onClick={handleInvestment}
  disabled={loading}
>
  {loading ? "Processing..." : "Confirm Investment"}
</button>
             </div>
            </Modal>
      
          </motion.section>
  );
};
export default InvestmentPlans;