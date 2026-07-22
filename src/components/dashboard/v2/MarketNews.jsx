import {
  HiOutlineGlobeAlt,
  HiOutlineBuildingLibrary,
  HiOutlineCpuChip,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./MarketNews.module.css";

const news = [
  {
    title: "Global equities continue to rally amid strong earnings.",
    category: "Markets",
    time: "30 min ago",
    icon: HiOutlineGlobeAlt,
    color: "#2563EB",
  },
  {
    title: "Central bank keeps interest rates unchanged.",
    category: "Economy",
    time: "2 hrs ago",
    icon: HiOutlineBuildingLibrary,
    color: "#10B981",
  },
  {
    title: "Technology stocks lead this week's gains.",
    category: "Technology",
    time: "Today",
    icon: HiOutlineCpuChip,
    color: "#7C3AED",
  },
];

const MarketNews = () => {
  return (
    <motion.section
  className={styles.wrapper}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
  variants={{
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }}
>
      <div className={styles.header}>
        <h2>Market News</h2>

        <span className={styles.viewAll}>
          View All
        </span>
      </div>

      <div className={styles.list}>
        {news.map((item) => (
          <motion.article
  key={item.title}
  className={styles.card}
  variants={{
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  }}
  transition={{
    duration: 0.45,
  }}
  whileHover={{
    y: -6,
    scale: 1.02,
  }}
>
          <motion.div
  className={styles.thumbnail}
  style={{
    background: item.color,
  }}
  whileHover={{
    rotate: 10,
    scale: 1.1,
  }}
  transition={{
    duration: 0.25,
  }}
>
  <item.icon size={36} />
</motion.div>

            <div className={styles.content}>
              <span className={styles.category}>
                {item.category}
              </span>

              <h3 className={styles.title}>
                {item.title}
              </h3>

              <div className={styles.footer}>
                <span className={styles.time}>
                  {item.time}
                </span>

                <span className={styles.readMore}>
                  Read More →
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
};

export default MarketNews;