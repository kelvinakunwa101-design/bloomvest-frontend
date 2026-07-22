import {
  HiOutlineFlag,
  HiOutlineHome,
  HiOutlineAcademicCap,
  HiOutlineGlobeAlt,
} from "react-icons/hi2";

import styles from "./FinancialGoals.module.css";

const goals = [
  {
    title: "Buy a House",
    target: "$150,000",
    saved: "$96,400",
    progress: 64,
    icon: HiOutlineHome,
    color: "#2563EB",
  },
  {
    title: "Education Fund",
    target: "$40,000",
    saved: "$28,000",
    progress: 70,
    icon: HiOutlineAcademicCap,
    color: "#10B981",
  },
  {
    title: "World Tour",
    target: "$25,000",
    saved: "$12,250",
    progress: 49,
    icon: HiOutlineGlobeAlt,
    color: "#F59E0B",
  },
];

const FinancialGoals = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Financial Goals</h2>

        <button>Create Goal</button>
      </div>

      <div className={styles.grid}>
        {goals.map((goal) => (
          <div
            key={goal.title}
            className={styles.card}
          >
            <div
              className={styles.icon}
              style={{
                background: goal.color,
              }}
            >
              <goal.icon size={26} />
            </div>

            <h3>{goal.title}</h3>

            <p>
              {goal.saved} of {goal.target}
            </p>

            <div className={styles.progress}>
              <div
                className={styles.fill}
                style={{
                  width: `${goal.progress}%`,
                  background: goal.color,
                }}
              />
            </div>

            <div className={styles.footer}>
              <HiOutlineFlag />
              {goal.progress}% Complete
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FinancialGoals;