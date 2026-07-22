import {
  HiOutlineCheckCircle,
  HiOutlineBanknotes,
  HiOutlineArrowTrendingUp,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./Notifications.module.css";

const notifications = [
  {
    title: "Investment Successful",
    message: "Your Growth Plan investment has been activated.",
    time: "2 minutes ago",
    icon: HiOutlineCheckCircle,
    color: "#10B981",
  },
  {
    title: "Deposit Received",
    message: "$5,000 has been credited to your wallet.",
    time: "1 hour ago",
    icon: HiOutlineBanknotes,
    color: "#2563EB",
  },
  {
    title: "Portfolio Update",
    message: "Your portfolio gained 4.8% this week.",
    time: "Today",
    icon: HiOutlineArrowTrendingUp,
    color: "#F59E0B",
  },
];

const Notifications = () => {
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
      <h2 className={styles.title}>
        Notifications
      </h2>

      <div className={styles.list}>
        {notifications.map((item) => (
          <motion.div
  key={item.title}
  className={styles.item}
  variants={{
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
    },
  }}
  transition={{
    duration: 0.45,
  }}
  whileHover={{
    x: 8,
    scale: 1.02,
  }}
>
    <motion.div
  className={styles.icon}
  style={{
    background: item.color,
  }}
  whileHover={{
    rotate: 12,
    scale: 1.15,
  }}
  transition={{
    duration: 0.25,
  }}
>
  <item.icon size={22} />
</motion.div>

            <div className={styles.content}>
              <h4>{item.title}</h4>

              <p>{item.message}</p>

              <span className={styles.time}>
                {item.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Notifications;