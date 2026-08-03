import { useEffect, useState } from "react";
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

import API_URL from "../../../config/api";
import styles from "./PortfolioOverview.module.css";

const PortfolioOverview = () => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const portfolioValue = chartData.length
    ? chartData[chartData.length - 1].value
    : 0;

  const estimatedProfit = chartData.reduce(
    (total, item) => total + (item.invested * item.roi) / 100,
    0
  );

  const roi =
    portfolioValue > 0
      ? ((estimatedProfit / portfolioValue) * 100).toFixed(2)
      : "0.00";

  const activeInvestments = chartData.length;

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await fetch(`${API_URL}/api/investments`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const investments = await res.json();

        if (!Array.isArray(investments)) {
          setChartData([]);
          return;
        }

        let runningTotal = 0;

        const data = investments.map((investment) => {
          runningTotal += investment.amount;

          const date = new Date(investment.createdAt);

          return {
            month: date.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            }),
            value: runningTotal,
            invested: investment.amount,
            roi: investment.profitRate * 100,
          };
        });

        setChartData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, []);

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
          <h2>Portfolio Overview</h2>
          <p>Your investment portfolio performance</p>
        </div>

        <button>View Report</button>
      </div>

      <div className={styles.summary}>
        <div className={styles.metric}>
          <span>Portfolio Value</span>
          <strong>${portfolioValue.toLocaleString()}</strong>
        </div>

        <div className={styles.metric}>
          <span>Estimated Profit</span>
          <strong>${estimatedProfit.toFixed(2)}</strong>
        </div>

        <div className={styles.metric}>
          <span>ROI</span>
          <strong>{roi}%</strong>
        </div>

        <div className={styles.metric}>
          <span>Active Investments</span>
          <strong>{activeInvestments}</strong>
        </div>
      </div>

      {loading ? (
        <p>Loading portfolio...</p>
      ) : chartData.length === 0 ? (
        <p>No investments available.</p>
      ) : (
        <div className={styles.chart}>
          <ResponsiveContainer width="100%" height={380}>
            <AreaChart data={chartData}>
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

              <Tooltip
                formatter={(value) => [
                  `$${Number(value).toLocaleString()}`,
                  "Portfolio Value",
                ]}
                labelFormatter={(label) => `Date: ${label}`}
              />

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
      )}
    </motion.section>
  );
};

export default PortfolioOverview;