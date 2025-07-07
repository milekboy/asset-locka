"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { IoMdClose } from "react-icons/io";

const toastStyles = {
  success: "bg-green-100 border-green-400 text-green-700",
  error: "bg-red-100 border-red-400 text-red-700",
  warning: "bg-yellow-100 border-yellow-400 text-yellow-700",
  info: "bg-blue-100 border-blue-400 text-blue-700",
};

export default function Toast({ message, type = "info", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`fixed top-5 right-5 border px-4 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 ${toastStyles[type]}`}
    >
      <span>
        {type === "success" && "✅"}
        {type === "error" && "⚠️"}
        {type === "warning" && "⚠️"}
        {type === "info" && "ℹ️"} {message}
      </span>
      <button onClick={onClose} className="text-xl cursor-pointer">
        <IoMdClose />
      </button>
    </motion.div>
  );
}
