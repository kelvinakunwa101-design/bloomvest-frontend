import {
  HiOutlineBanknotes,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowDownTray,
  HiOutlineGift,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./ActivityFeed.module.css";

const activities = [
  {
    title: "Wallet Deposit",
    description: "$5,000 deposited successfully",
    time: "2 mins ago",
    icon: HiOutlineBanknotes,
    color: "#2563EB",
  },
  {
    title: "Investment Purchased",
    description: "Growth Plan activated",
    time: "18 mins ago",
    icon: HiOutlineArrowTrendingUp,
    color: "#10B981",
  },
  {
    title: "Withdrawal Completed",
    description: "$1,250 sent to GTBank",
    time: "1 hour ago",
    icon: HiOutlineArrowDownTray,
    color: "#EF4444",
  },
  {
    title: "Dividend Received",
    description: "$320 credited",
    time: "Today",
    icon: HiOutlineGift,
    color: "#F59E0B",
  },
];

const ActivityFeed = () => {
  return (
         <motion.section
           className={styles.wrapper}
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, amount: 0.2 }}
           transition={{
                duration: 0.6,
                ease: "easeOut",
           }}
          >
      <div className={styles.header}>
        <h2>Live Activity</h2>

        <button>View History</button>
      </div>

         <motion.div
           className={styles.timeline}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           variants={{
           visible: {
           transition: {
             staggerChildren: 0.12,
            },
           },
         }}
        >
        {activities.map((item) => (
          <motion.div
  key={item.title}
  className={styles.item}
  variants={{
    hidden: {
      opacity: 0,
      x: -25,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }}
  transition={{
    duration: 0.4,
  }}
  whileHover={{
    x: 8,
  }}
>
            <div
              className={styles.icon}
              style={{
                background: item.color,
              }}
            >
              <item.icon size={22} />
            </div>

            <div className={styles.content}>
              <h4>{item.title}</h4>

              <p>{item.description}</p>

              <span>{item.time}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default ActivityFeed;