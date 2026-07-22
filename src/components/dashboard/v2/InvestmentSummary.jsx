import {
  HiOutlineArrowTrendingUp,
  HiOutlineChartPie,
  HiOutlineBanknotes,
  HiOutlineSparkles,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./InvestmentSummary.module.css";

const stats = [
  {
    title: "Total Invested",
    value: "$85,000",
    icon: HiOutlineBanknotes,
    color: "#2563EB",
  },
  {
    title: "Current Value",
    value: "$102,450",
    icon: HiOutlineChartPie,
    color: "#10B981",
  },
  {
    title: "Total Profit",
    value: "+$17,450",
    icon: HiOutlineArrowTrendingUp,
    color: "#F59E0B",
  },
  {
    title: "ROI",
    value: "+20.5%",
    icon: HiOutlineSparkles,
    color: "#7C3AED",
  },
];

const InvestmentSummary = () => {
  return (
    <section className={styles.wrapper}>
      <motion.div
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
             hidden: {},
             visible: {
             transition: {
                staggerChildren: 0.15,
            },
           },
         }}
        >
        {stats.map((item) => (
             <motion.div
                 key={item.title}
                 className={styles.card}
                 variants={{
                 hidden: {
                 opacity: 0,
                 y: 25,
                scale: 0.96,
            },
               visible: {
               opacity: 1,
                  y: 0,
                  scale: 1,
            },
           }}
              transition={{
              duration: 0.45,
           }}
              whileHover={{
                 y: -8,
                scale: 1.02,
           }}
           >
            <div
              className={styles.icon}
              style={{
                background: item.color,
              }}
            >
              <item.icon size={26} />
            </div>

            <span>{item.title}</span>

            <h2>{item.value}</h2>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default InvestmentSummary;