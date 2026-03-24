"use client";

import SectionHeader from "@layouts/components/SectionHeader";
import { FaCogs, FaChartLine, FaExpandArrowsAlt } from "react-icons/fa";

const icons = [FaCogs, FaChartLine, FaExpandArrowsAlt];

const ServiceValue = ({ value }) => {
  if (!value) return null;

  return (
    <section className="section bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="container">
        <SectionHeader
          subtitle={value.subtitle}
          title={value.title}
          description={value.description}
        />

        <div className="animate mt-10 md:mt-12 grid gap-6 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {value.list.map((item, i) => {
            const Icon = icons[i] || FaCogs;

            return (
              <div
                key={i}
                className="group relative rounded-2xl border border-primary/10 bg-white p-6 lg:p-8 shadow-sm transition-all duration-500 hover:-translate-y-1 lg:hover:-translate-y-1.5 hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] hover:border-primary/20 overflow-hidden flex flex-col h-full"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 pointer-events-none" />

                <div className="relative z-10 flex h-14 w-14 lg:h-16 lg:w-16 mb-5 lg:mb-6 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary/10 to-primary/10 text-primary transition-all duration-500 group-hover:scale-110 group-hover:shadow-md group-hover:from-secondary group-hover:to-primary group-hover:text-white">
                  <Icon size={24} className="lg:w-7 lg:h-7" />
                </div>

                <div className="relative z-10 flex-grow flex flex-col">
                  <h3 className="mb-3 text-2xl lg:text-3xl font-semibold text-gray-900 tracking-tight">
                    {item.title}
                  </h3>

                  <div className="w-8 group-hover:w-16 h-1 bg-gradient-to-r from-primary/60 to-secondary/60 rounded-full mb-4 lg:mb-5 transition-all duration-500" />

                  <p className="text-text text-lg">
                    {item.content}
                  </p>
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
