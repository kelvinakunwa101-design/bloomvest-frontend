import { motion } from "framer-motion";
import styles from "./AssetAllocation.module.css";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563EB",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

const defaultData = [
  {
    name: "Stocks",
    value: 45,
  },
  {
    name: "Real Estate",
    value: 25,
  },
  {
    name: "Crypto",
    value: 20,
  },
  {
    name: "Cash",
    value: 10,
  },
];

const AssetAllocation = ({
  data = defaultData,
}) => {

  const total = data.reduce(
    (sum, item) => sum + item.value,
    0
  );

  return (
    <motion.section
      className={styles.wrapper}
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
      }}
    >

      <div className={styles.header}>
        <h2>Asset Allocation</h2>

        <p>
          Portfolio diversification overview.
        </p>
      </div>

      <div className={styles.content}>

        <div className={styles.chart}>
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <PieChart>

    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      outerRadius={110}
      innerRadius={60}
      paddingAngle={4}
      isAnimationActive={true}
      animationDuration={1400}
    >
  {data.map((item, index) => (
    <Cell
      key={item.name}
      fill={COLORS[index % COLORS.length]}
    />
  ))}
</Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>
        </div>

        <div className={styles.summary}>

          {data.map((item, index) => {

            const percent =
              total === 0
                ? 0
                : ((item.value / total) * 100).toFixed(1);

            return (

              <div
                key={item.name}
                className={styles.item}
              >

                <div className={styles.left}>

                  <div
                    className={styles.dot}
                    style={{
                      background: COLORS[index],
                    }}
                  />

                  <span className={styles.name}>
                    {item.name}
                  </span>

                </div>

                <span className={styles.value}>
                  {percent}%
                </span>

              </div>

            );

          })}

        </div>

      </div>

  </motion.section>
  );

};

export default AssetAllocation;