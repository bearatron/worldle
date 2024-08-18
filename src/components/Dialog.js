import { motion } from "framer-motion";
import "./Dialog.css";

function Dialog({ text }) {
  return text ? (
    <motion.div
      className="dialog"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      {text}
    </motion.div>
  ) : (
    <></>
  );
}

export default Dialog;
