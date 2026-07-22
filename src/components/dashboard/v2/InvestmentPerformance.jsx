import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import styles from "./InvestmentPerformance.module.css";

const performance = [
  { month: "Jan", roi: 4 },
  { month: "Feb", roi: 7 },
  { month: "Mar", roi: 10 },
  { month: "Apr", roi: 13 },
  { month: "May", roi: 17 },
  { month: "Jun", roi: 21 },
];

const InvestmentPerformance = () => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className={styles.header}>
        <div>
          <h2>Investment Performance</h2>
          <p>Return on investment growth</p>
        </div>

        <button>Export Report</button>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={performance}>
            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="roi"
              stroke="#10B981"
              strokeWidth={4}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};

export default InvestmentPerformance;