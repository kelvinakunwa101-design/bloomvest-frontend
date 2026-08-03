import { formatCurrency } from "../../../utils/currency";
import { motion } from "framer-motion";
import styles from "./PerformanceChart.module.css";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const PerformanceChart = ({ data }) => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>Portfolio Performance</h2>

          <p>
            Track portfolio growth over time.
          </p>
        </div>

        <div className={styles.badge}>
          Last 30 Days
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer
             width="100%"
             height={320}
          >
          <AreaChart data={data}>

            <defs>
              <linearGradient
                id="profit"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="0%"
                  stopColor="#2563EB"
                  stopOpacity={0.4}
                />

                <stop
                  offset="100%"
                  stopColor="#2563EB"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis dataKey="index" />

            <YAxis tickFormatter={(value) => formatCurrency(value)} />

            <Tooltip
            formatter={(value) => formatCurrency(value)}
           />

          <Area
            type="monotone"
            dataKey="amount"
            stroke="#2563EB"
            fill="url(#profit)"
            strokeWidth={3}
            isAnimationActive={true}
            animationDuration={1500}
            animationEasing="ease-out"
         />

          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};

export default PerformanceChart;