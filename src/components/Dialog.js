import { AnimatePresence, motion } from "framer-motion";
import "./Dialog.css";

function Dialog({ text }) {
  return (
    <AnimatePresence>
      {text && (
        <motion.div
          className="dialog"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Dialog;
