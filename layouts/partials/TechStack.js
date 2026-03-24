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
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <SectionHeader
          subtitle={technologies.subtitle}
          title={technologies.title}
          description={technologies.description}
        />

        <div className="animate w-full lg:w-[90%] mx-auto mt-10 md:mt-16 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:gap-10 lg:grid-cols-3">
          {technologies.groups.map((group, i) => (
            <div key={i} className="space-y-5 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3">
                {group.items.map((tech, j) => {
                  const Icon = IconMap[tech];

                  return (
                    <div
                      key={j}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 hover:bg-white hover:border-primary/30 hover:shadow-sm transition-all text-gray-700 hover:text-primary"
                    >
                      {Icon && <Icon className="text-lg" />}
                      <span className="text-[15px] font-medium">
                        {tech}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
