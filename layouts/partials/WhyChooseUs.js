"use client";

import { markdownify } from "@lib/utils/textConverter";
import {
  FaMapMarkerAlt,
  FaCogs,
  FaBolt,
  FaHandsHelping,
} from "react-icons/fa";

const icons = [
  FaMapMarkerAlt,
  FaCogs,
  FaBolt,
  FaHandsHelping,
];

const WhyChooseUs = ({ why }) => {
  const safeWhy = why ?? {
    subtitle: "",
    title: "",
    list: [],
  };

  return (
    <section className="section bg-theme-light">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          {safeWhy.subtitle && (
            <p className="uppercase tracking-wider text-sm font-medium">
              {safeWhy.subtitle}
            </p>
          )}

          {safeWhy.title &&
            markdownify(safeWhy.title, "h2", "mt-4 section-title")}
        </div>

        {/* Cards */}
        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {safeWhy.list.map((item, i) => {
              const Icon = icons[i] || FaCogs;

              return (
                <div
                  key={i}
                  className="group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl transition group-hover:bg-primary group-hover:text-white">
                    <Icon />
                  </div>

                  <h3 className="mb-3 text-lg font-semibold text-dark transition group-hover:text-primary">
                    {item.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-text">
                    {item.content}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
