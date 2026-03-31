"use client";

import SectionHeader from "@layouts/components/SectionHeader";
import { FaSearch, FaDraftingCompass, FaCode, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";

const icons = [FaSearch, FaDraftingCompass, FaCode, FaRocket, FaDraftingCompass];

/* ─── colour palette per card ─── */
const cardAccents = [
  {
    gradient: "from-primary to-primary/80",
    bg: "from-primary/[0.06] to-primary/[0.02]",
    border: "border-primary/15",
    number: "text-primary/[0.07]",
    bar: "from-primary to-primary/60",
  },
  {
    gradient: "from-secondary to-secondary/80",
    bg: "from-secondary/[0.06] to-secondary/[0.02]",
    border: "border-secondary/15",
    number: "text-secondary/[0.07]",
    bar: "from-secondary to-secondary/60",
  },
  {
    gradient: "from-primary to-secondary",
    bg: "from-primary/[0.05] to-secondary/[0.03]",
    border: "border-primary/15",
    number: "text-primary/[0.07]",
    bar: "from-primary to-secondary",
  },
  {
    gradient: "from-secondary to-primary",
    bg: "from-secondary/[0.05] to-primary/[0.03]",
    border: "border-secondary/15",
    number: "text-secondary/[0.07]",
    bar: "from-secondary to-primary",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const PageProcess = ({ process }) => {
  if (!process) return null;

  return (
    <section className="section relative overflow-hidden">
      {/* ── Background Decor ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-primary/[0.04] blur-[100px]" />
        <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-secondary/[0.05] blur-[100px]" />
      </div>

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            subtitle={process.subtitle}
            title={process.title}
            description={process.description}
          />
        </motion.div>

        {/* ── Cards grid : 2×2 on desktop, stack on mobile ── */}
        <motion.div
          className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {process.steps.map((step, i) => {
            const Icon = icons[i] || FaSearch;
            const accent = cardAccents[i % cardAccents.length];

            return (
              <motion.div key={i} variants={cardVariants}>
                <div
                  className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border ${accent.border} bg-white transition-shadow duration-500 hover:shadow-2xl hover:shadow-primary/[0.08]`}
                >
                  {/* Top gradient bar */}
                  <div
                    className={`h-1.5 w-full bg-gradient-to-r ${accent.bar}`}
                  />

                  {/* Watermark step number */}
                  <span
                    className={`pointer-events-none absolute -right-3 -top-2 select-none text-[9rem] font-black leading-none ${accent.number} transition-all duration-700 group-hover:scale-110 group-hover:opacity-[0.12]`}
                  >
                    {`0${i + 1}`}
                  </span>

                  {/* Hover gradient overlay */}
                  <div
                    className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${accent.bg} opacity-0 transition-opacity duration-500 group-hover:opacity-100`}
                  />

                  {/* ── Card content ── */}
                  <div className="relative z-10 flex flex-1 flex-col p-7 pt-6 lg:p-9 lg:pt-7">
                    {/* Icon + Step label row */}
                    <div className="mb-5 flex items-center gap-4">
                      <div
                        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${accent.gradient} text-white shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon size={24} />
                      </div>
                      <span
                        className={`text-xs font-bold uppercase tracking-[0.2em] text-primary/40`}
                      >
                        Step {i + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="mb-3 text-2xl font-bold text-dark lg:text-3xl">
                      {step.title}
                    </h3>

                    {/* Accent divider */}
                    <div
                      className={`mb-4 h-[3px] w-14 rounded-full bg-gradient-to-r ${accent.bar} transition-all duration-500 group-hover:w-24`}
                    />

                    {/* Description */}
                    <p className="flex-1 text-base leading-relaxed text-text lg:text-lg">
                      {step.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Bottom connecting decoration ── */}
        <motion.div
          className="mx-auto mt-10 flex items-center justify-center gap-2 lg:mt-14"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="h-[2px] w-8 rounded-full bg-primary/20" />
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
            <FaRocket size={12} />
          </div>
          <div className="h-[2px] w-16 rounded-full bg-gradient-to-r from-secondary to-primary" />
          <div className="h-[2px] w-8 rounded-full bg-primary/20" />
        </motion.div>
      </div>
    </section>
  );
};

export default PageProcess;
