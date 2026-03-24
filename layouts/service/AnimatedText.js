"use client";
import { motion } from "framer-motion";

export const AnimatedText = ({ text = "", delay = 0 }) => {
  const words = text.trim().split(/\s+/);

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
        delayChildren: delay,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline"
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap">
          {word.split("").map((char, j) => (
            <motion.span key={j} variants={child} className="inline-block">
              {char}
            </motion.span>
          ))}
          {"\u00A0"}
        </span>
      ))}
    </motion.span>
  );
};
