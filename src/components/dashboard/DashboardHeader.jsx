import React from "react";
import styles from "./DashboardHeader.module.css";

const DashboardHeader = ({ user }) => {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <h1>
          {greeting}, {user?.name || "Investor"} 👋
        </h1>

        <p>
          Welcome back to your investment dashboard.
        </p>
      </div>

      <button className={styles.button}>
        + New Investment
      </button>
    </div>
  );
};

export default DashboardHeader;