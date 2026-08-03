import styles from "./InvestmentHistory.module.css";
import { formatCurrency } from "../../../utils/currency";

const InvestmentHistory = ({
  investments = [],
}) => {


  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Investment History</h2>
        <p>Track every investment in your portfolio.</p>
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
          {investments.length === 0 ? (
            <tr>
              <td colSpan="5">No investments found.</td>
            </tr>
          ) : (
            investments.map((investment) => (
  <tr key={investment._id}>
    <td>{investment.plan}</td>

    <td>
      {formatCurrency(investment.amount)}
    </td>

    <td>
      {(
        (Number(investment.expectedProfit || 0) /
          Number(investment.amount || 1)) *
        100
      ).toFixed(1)}
      %
    </td>

    <td>
      <span
        className={
          investment.status === "active"
            ? styles.active
            : investment.status === "completed"
            ? styles.completed
            : styles.cancelled
        }
      >
        {investment.status}
      </span>
    </td>

    <td>
      {new Date(
        investment.createdAt
      ).toLocaleDateString()}
    </td>
  </tr>
))
          )}
        </tbody>
      </table>
    </section>
  );
};

export default InvestmentHistory;