"use client";

import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";

const ServiceIntro = ({ intro }) => {
  if (!intro) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className="relative section bg-white border-b border-gray-100">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[130px] -z-10 mix-blend-multiply"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-12 gap-4 lg:gap-20 items-start relative"
        >
          {/* LEFT: Structural Title & Subtitle (Now Sticky!) */}
          <div className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-32 lg:h-max z-20 transition-all duration-300">
            {intro.subtitle && (
              <motion.div variants={itemVariants} className="inline-flex items-center lg:gap-4 mb-6 sm:mb-8">
                <div className="h-[2px] w-10 bg-primary rounded-full"></div>
                <p className="text-xs sm:text-sm font-extrabold tracking-[0.2em] uppercase text-primary">
                  {intro.subtitle}
                </p>
              </motion.div>
            )}

            {intro.title && (
              <motion.div variants={itemVariants}>
                {markdownify(
                  intro.title,
                  "h2",
                  "text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight bg-gradient-to-br from-gray-900 via-gray-800 to-gray-500 bg-clip-text text-transparent pb-2"
                )}
              </motion.div>
            )}
          </div>

          {/* RIGHT: High-End Editorial Description */}
          <div className="lg:col-span-7 flex flex-col lg:pl-12 lg:border-l border-gray-200">
            {intro.description && (
              <motion.div variants={itemVariants}>
                {markdownify(
                  intro.description,
                  "div",
                  "text-lg lg:text-xl text-gray-700 leading-relaxed lg:[&>p]:mb-5 last:[&>p]:mb-0"
                )}
              </motion.div>
            )}

            {/* Premium Decorative Footer Element */}
            <motion.div variants={itemVariants} className="mt-4 sm:mt-6 flex items-center gap-5">
              <div className="w-14 h-14 rounded-full bg-slate-50 border border-gray-200 flex items-center justify-center shadow-sm">
                <span className="text-primary text-2xl drop-shadow-sm">✦</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Standard</span>
                <span className="text-sm font-extrabold text-gray-800 uppercase tracking-wide">Excellence Delivered</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceIntro;
