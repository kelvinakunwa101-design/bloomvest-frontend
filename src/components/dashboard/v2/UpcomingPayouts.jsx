import {
  HiOutlineCalendarDays,
  HiOutlineBanknotes,
} from "react-icons/hi2";

import { motion } from "framer-motion";
import styles from "./UpcomingPayouts.module.css";

const payouts = [
{
  plan: "Growth Plan",
  amount: "$1,250",
  date: "Aug 15, 2026",
  status: "Scheduled",
  due: "3 days",
  color: "#2563EB",
},
{
  plan: "Premium Plan",
  amount: "$3,840",
  date: "Aug 28, 2026",
  status: "Pending",
  due: "16 days",
  color: "#F59E0B",
},

{
  plan: "Starter Plan",
  amount: "$540",
  date: "Sep 02, 2026",
  status: "Scheduled",
  due: "21 days",
  color: "#10B981",
},

];

const UpcomingPayouts = () => {
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
        <h2>Upcoming Payouts</h2>

        <button>View Calendar</button>
      </div>

      <motion.div
        className={styles.list}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
            visible: {
             transition: {
             staggerChildren: 0.15,
           },
          },
        }}
       >
        {payouts.map((item) => (
          <motion.div
  key={item.plan + item.date}
  className={styles.card}
  variants={{
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  }}
  transition={{
    duration: 0.45,
    ease: "easeOut",
  }}
  whileHover={{
    y: -6,
    scale: 1.02,
  }}
>
            <div className={styles.left}>
              <div
                className={styles.icon}
                style={{
                  background: item.color,
                }}
              >
                <HiOutlineBanknotes
                  size={24}
                  color="#fff"
              />
              </div>

              <div>
                <h3>{item.plan}</h3>

                <p>{item.amount}</p>
              </div>
            </div>

            <div className={styles.right}>
              <div className={styles.date}>
                <HiOutlineCalendarDays />

                {item.date}
              </div>

              <span
               className={styles.status}
               style={{
               background: item.color,
                   color: "#fff",
                   padding: "6px 12px",
                   borderRadius: "999px",
                      fontWeight: 600,
                }}
               >
             {item.status}
             </span>
             <div
               style={{
                marginTop: "8px",
                color: "#64748B",
                fontSize: ".85rem",
               }}
             >
                Due in {item.due}
             </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default UpcomingPayouts;