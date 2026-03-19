"use client";

import SectionHeader from "@layouts/components/SectionHeader";
import { FaCogs, FaChartLine, FaExpandArrowsAlt } from "react-icons/fa";

const icons = [FaCogs, FaChartLine, FaExpandArrowsAlt];

const ServiceValue = ({ value }) => {
  if (!value) return null;

  return (
    <section className="section min-h-[50dvh] flex items-center bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="container">
        <SectionHeader
          subtitle={value.subtitle}
          title={value.title}
          description={value.description}
        />

        <div className="animate mt-16 max-w-4xl mx-auto space-y-8">
          {value.list.map((item, i) => {
            const Icon = icons[i] || FaCogs;

            return (
              <div
                key={i}
                className="group cursor-pointer relative flex flex-col md:flex-row items-start gap-6 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg overflow-hidden ring-1 ring-slate-200 hover:ring-0"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl">
                  <span className="absolute inset-0 rounded-2xl border border-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>

                  <span className="absolute inset-0 rounded-2xl border border-secondary [clip-path:inset(0_100%_100%_0)] transition-all duration-700 ease-out group-hover:[clip-path:inset(0_0_0_0)]"></span>
                </span>

                <div className="flex items-center justify-center gap-10 flex-col sm:flex-row">
                  <div className="relative z-10 flex h-20 w-20 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary text-2xl transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon size={36} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="mb-2 text-2xl lg:text-3xl  text-dark">
                      {item.title}
                    </h3>
                    <p className="text-text text-base lg:text-lg">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceValue;
