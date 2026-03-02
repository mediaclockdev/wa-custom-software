"use client";

import { markdownify } from "@lib/utils/textConverter";
import { motion, stagger } from "framer-motion";

const Expertise = ({ expertise }) => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
      },
    },
  };

  return (
    <section className="section min-h-dvh flex items-center">
      <div className="container text-center">
        {/* Title */}
        <div className="animate mb-10">
          <p className="uppercase">{expertise.subtitle}</p>
          {markdownify(
            expertise.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
          )}
          {markdownify(
            expertise.description,
            "p",
            "mt-4 text-base section-title",
          )}
        </div>

        {/* Expertise Tags */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {expertise.list.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -6,
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 250,
                damping: 18,
              }}
              className="px-6 py-3 rounded-full text-sm md:text-base font-medium 
              bg-white text-primary border border-gray-200 shadow-sm
              hover:shadow-lg hover:border-secondary/50 transition-colors duration-300 cursor-pointer"
            >
              {item}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
