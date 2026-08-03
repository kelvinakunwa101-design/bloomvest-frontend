import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { formatCurrency } from "../../../utils/currency";
import Modal from "../../ui/Modal";
import API_URL from "../../../config/api";
import styles from "./InvestmentPortfolio.module.css";

const InvestmentPortfolio = () => {
const [selectedInvestment, setSelectedInvestment] = useState(null);
const [investments, setInvestments] = useState([]);
const [loading, setLoading] = useState(true);
const [filter, setFilter] = useState("all");

  useEffect(() => {
    const loadInvestments = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/investments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

          const data = await res.json();

        setInvestments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadInvestments();
  }, []);

  const filteredInvestments =
  filter === "all"
    ? investments
    : investments.filter(
        (investment) => investment.status === filter
      );

  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h2>Investment Portfolio</h2>
        <p>Track your investment performance, profit, and maturity dates.</p>
      </div>

<div className={styles.filters}>
  <button
    className={filter === "all" ? styles.activeFilter : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={filter === "active" ? styles.activeFilter : ""}
    onClick={() => setFilter("active")}
  >
    Active
  </button>

  <button
    className={filter === "completed" ? styles.activeFilter : ""}
    onClick={() => setFilter("completed")}
  >
    Completed
  </button>

  <button
    className={filter === "cancelled" ? styles.activeFilter : ""}
    onClick={() => setFilter("cancelled")}
  >
    Cancelled
  </button>
</div>
      {loading ? (
        <p>Loading investments...</p>
      ) : investments.length === 0 ? (
        <p>No investments found.</p>
      ) : (
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Plan</th>
                <th>Invested</th>
                <th>Expected Profit</th>
                <th>Current Value</th>
                <th>Status</th>
                <th>Maturity</th>
              </tr>
            </thead>

            <tbody>
              {filteredInvestments.map((investment) => (
                <tr
                   key={investment._id}
                   onClick={() => setSelectedInvestment(investment)}
                   className={styles.clickableRow}
               >
                  <td>{investment.plan}</td>


                  <td>
                  {formatCurrency(investment.amount)}
                  </td>

                  <td>
                {formatCurrency(investment.expectedProfit)}
                   </td>

                   <td>
                {formatCurrency(investment.currentValue)}
                  </td>
                    

                  <td>
                    <span
        className={styles.status}
            style={{
             color:
            investment.status === "active"
                 ? "#10B981"
                 : investment.status === "completed"
                 ? "#2563EB"
                 : "#EF4444",
              }}
            >
            {investment.status.toUpperCase()}
                  </span>
                  </td>

                  <td>
                    {new Date(
                      investment.maturityDate
                    ).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal
  isOpen={!!selectedInvestment}
  onClose={() => setSelectedInvestment(null)}
  title="Investment Details"
>
  {selectedInvestment && (
    <div className={styles.modalContent}>
      <div className={styles.detailRow}>
        <span>Investment Plan</span>
        <strong>{selectedInvestment.plan}</strong>
      </div>

      <div className={styles.detailRow}>
        <span>Amount Invested</span>
        <strong>
          {formatCurrency(selectedInvestment.amount)}
        </strong>
      </div>

      <div className={styles.detailRow}>
        <span>Expected Profit</span>
        <strong>
          {formatCurrency(selectedInvestment.expectedProfit)}
        </strong>
      </div>

      <div className={styles.detailRow}>
        <span>Current Value</span>
        <strong>
          {formatCurrency(selectedInvestment.currentValue)}
        </strong>
      </div>

      <div className={styles.detailRow}>
        <span>Status</span>
        <strong>{selectedInvestment.status}</strong>
      </div>

      <div className={styles.detailRow}>
        <span>Investment Date</span>
        <strong>
          {new Date(
            selectedInvestment.createdAt
          ).toLocaleDateString()}
        </strong>
      </div>

      <div className={styles.detailRow}>
        <span>Maturity Date</span>
        <strong>
          {new Date(
            selectedInvestment.maturityDate
          ).toLocaleDateString()}
        </strong>
      </div>
    </div>
  )}
     </Modal>
    </motion.section>
  );
};

export default InvestmentPortfolio;