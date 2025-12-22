"use client";

import { markdownify } from "@lib/utils/textConverter";
import {
  FaSearch,
  FaDraftingCompass,
  FaCode,
  FaRocket,
} from "react-icons/fa";

const icons = [
  FaSearch,              // Discovery
  FaDraftingCompass,     // Design & Planning
  FaCode,                // Development & Testing
  FaRocket,              // Launch & Maintenance
];

const Process = ({ process }) => {
  if (!process) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container-xl">
        {/* Header */}
        <div className=" text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {process.subtitle}
          </p>
          {markdownify(process.title, "h2", "mt-4 section-title")}
        </div>

        {/* Process Steps */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {process.steps.map((step, i) => {
            const Icon = icons[i] || FaSearch;

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
                <h4 className="mb-3 text-lg font-semibold text-dark">
                  {step.title}
                </h4>

                {/* Content */}
                <p className="text-text leading-relaxed text-center">
                  {step.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
