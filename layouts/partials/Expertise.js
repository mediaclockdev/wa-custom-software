"use client";

import SectionHeader from "@layouts/components/SectionHeader";
import { markdownify } from "@lib/utils/textConverter";
import { motion } from "framer-motion";
import Link from "next/link";

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
    <section className="section min-h-[30dvh] flex items-center">
      <div className="container text-center">
        <SectionHeader
          subtitle={expertise.subtitle}
          title={expertise.title}
          description={expertise.description}
        />

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
            >
              <Link
                href={item.link}
                className="px-6 py-3 rounded-full text-sm md:text-base font-medium 
              bg-white text-primary border border-gray-200 shadow-sm
                hover:shadow-lg hover:border-secondary/50 transition-colors duration-300 cursor-pointer inline-block"
              >
                {item.title}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;
