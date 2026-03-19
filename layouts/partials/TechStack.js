"use client";

import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";
import { IconMap } from "@lib/service/IconMap";
import SectionHeader from "@layouts/components/SectionHeader";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const TechStack = ({ technologies }) => {
  if (!technologies) return null;

  return (
    <section className="section bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10">
        <SectionHeader
          subtitle={technologies.subtitle}
          title={technologies.title}
          description={technologies.description}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full lg:w-[80%] mx-auto mt-10 md:mt-16 grid gap-4 sm:gap-6 md:gap-12 grid-cols-2 md:grid-cols-3"
        >
          {technologies.groups.map((group, i) => (
            <div key={i} className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, j) => {
                  const Icon = IconMap[tech];

                  return (
                    <div
                      key={j}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:shadow-md transition"
                    >
                      {Icon && <Icon className="text-primary text-lg" />}
                      <span className="text-sm font-medium text-slate-700">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
