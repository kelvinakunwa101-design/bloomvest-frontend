import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import styles from "./PortfolioOverview.module.css";

const data = [
  { month: "Jan", value: 45000 },
  { month: "Feb", value: 52000 },
  { month: "Mar", value: 61000 },
  { month: "Apr", value: 70000 },
  { month: "May", value: 84500 },
  { month: "Jun", value: 102450 },
];

const PortfolioOverview = () => {
  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
      }}
    >
      <div className={styles.header}>
        <div>
          <h2>Portfolio Overview</h2>
          <p>Investment growth over the last 6 months</p>
        </div>

        <button>View Report</button>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="portfolio"
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

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#portfolio)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.section>
  );
};

export default PortfolioOverview;