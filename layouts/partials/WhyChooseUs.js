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
  if (!why) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container">
        {/* Header */}
        <div className="animate text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {why.subtitle}
          </p>
          {markdownify(why.title, "h2", "mt-4 section-title")}
        </div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {why.list.map((item, i) => {
            const Icon = icons[i] || FaCogs;

            return (
              <div
                key={i}
                className="animate group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl transition group-hover:bg-primary group-hover:text-white">
                  <Icon />
                </div>

                <h3 className="mb-3 text-lg font-semibold text-dark group-hover:text-primary transition">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-text">
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

export default WhyChooseUs;
