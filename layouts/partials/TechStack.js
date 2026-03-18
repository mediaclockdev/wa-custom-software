"use client";

import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";
import { IconMap } from "@lib/service/IconMap";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const TechStack = ({ technologies }) => {
  if (!technologies) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white min-h-[50dvh] flex items-center my-10">
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="uppercase">
            {technologies.subtitle}
          </p>

          {markdownify(
            technologies.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed pb-1 section-title",
          )}
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 grid gap-5 sm:gap-6 md:gap-10 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {technologies.list.map((tech, i) => {
            const Icon = IconMap[tech];

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                <div className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 bg-primary/10 blur-lg" />

                <motion.div
                  {...floatingAnimation}
                  className="relative flex flex-col items-center justify-center rounded-xl sm:rounded-2xl bg-white/90 border border-slate-200 p-5 sm:p-6 md:p-8 shadow-sm  transition-all duration-300"
                >
                  {Icon && (
                    <Icon className="text-3xl sm:text-4xl text-primary transition-colors duration-300 group-hover:text-purple-600" />
                  )}

                  <span className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-slate-700 tracking-wide truncate overflow-hidden text-ellipsis whitespace-nowrap w-full text-center">
                    {tech}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
