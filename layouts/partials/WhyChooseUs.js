"use client";

import { markdownify } from "@lib/utils/textConverter";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping } from "react-icons/fa";

const icons = [FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping];

const WhyChooseUs = ({ why }) => {
  const safeWhy = why ?? {
    subtitle: "",
    title: "",
    list: [],
  };

  return (
    <section className="section min-h-dvh flex items-center bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="container">
        <div className="animate max-w-3xl mx-auto text-center">
          {safeWhy.subtitle && (
            <p className="text-md sm:text-base uppercase tracking-wider font-medium">
              {safeWhy.subtitle}
            </p>
          )}

          {safeWhy.title &&
            markdownify(
              safeWhy.title,
              "h2",
              "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
            )}
        </div>

        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeWhy.list.map((item, i) => {
              const Icon = icons[i] || FaCogs;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="group animate relative rounded-3xl p-[2px] overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className="absolute -inset-[150%] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    style={{
                      background: `conic-gradient(#24326A 0deg 300deg, #fe6019 300deg 330deg, #24326A 330deg 360deg)`,
                    }}
                  />

                  <div className="relative rounded-3xl bg-white p-8 h-full">
                    <div className="mb-5 text-primary">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl mb-2 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-base text-text leading-relaxed tracking-wide">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
