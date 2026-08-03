import { motion, AnimatePresence } from "framer-motion";
import { HiXMark } from "react-icons/hi2";
import styles from "./Modal.module.css";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={styles.modal}
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 40,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{
              duration: 0.25,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2>{title}</h2>

              <button
                className={styles.closeBtn}
                onClick={onClose}
              >
                <HiXMark size={24} />
              </button>
            </div>

            <div className={styles.body}>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;