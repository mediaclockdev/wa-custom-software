"use client";
const { motion } = require("framer-motion");

export const AnimatedText = ({ text }) => {
  const letters = text.trim().split("");

  const words = text.trim().split(" ");

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="visible"
      className="inline-block"
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-2">
          {word.split("").map((letter, index) => (
            <motion.span key={index} variants={child} className="inline-block">
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};
