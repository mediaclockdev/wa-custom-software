"use client";

import { markdownify } from "@lib/utils/textConverter";
import {
  FaIndustry,
  FaTruckMoving,
  FaHeartbeat,
  FaChartLine,
  FaHardHat,
  FaShoppingCart,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";

const icons = [
  FaIndustry,        // Mining & Resources
  FaTruckMoving,     // Logistics
  FaHeartbeat,       // Healthcare
  FaChartLine,       // Finance
  FaHardHat,         // Construction
  FaShoppingCart,    // E-commerce
  FaGraduationCap,   // Education
  FaRocket,          // Startups
];

const Industries = ({ industries }) => {
  if (!industries) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container">
        {/* Header */}
        <div className=" text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {industries.subtitle}
          </p>
          {markdownify(industries.title, "h2", "mt-4 section-title")}
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {industries.list.map((item, i) => {
            const Icon = icons[i] || FaIndustry;

            return (
              <div
                key={i}
                className=" group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {/* Icon */}
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl transition group-hover:bg-primary group-hover:text-white">
                  <Icon />
                </div>

                {/* Title */}
                <h3 className="text-base font-semibold text-dark group-hover:text-primary transition">
                  {item}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
