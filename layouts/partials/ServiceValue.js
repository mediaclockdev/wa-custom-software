"use client";

import { markdownify } from "@lib/utils/textConverter";
import { FaCogs, FaChartLine, FaExpandArrowsAlt } from "react-icons/fa";

const icons = [FaCogs, FaChartLine, FaExpandArrowsAlt];

const ServiceValue = ({ value }) => {
  if (!value) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container-xl">
        {/* Header */}
        <div className=" text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {value.subtitle}
          </p>
          {markdownify(value.title, "h2", "mt-4 section-title")}
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {value.list.map((item, i) => {
            const Icon = icons[i] || FaCogs;

            return (
              <div
                key={i}
                className=" group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl transition group-hover:bg-primary group-hover:text-white">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-lg font-semibold text-dark">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-text leading-relaxed">
                  {item.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceValue;
