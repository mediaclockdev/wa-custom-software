"use client";

import { markdownify } from "@lib/utils/textConverter";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiSmartphone, FiMonitor, FiSettings } from "react-icons/fi";

const Features = ({ features }) => {
  const rotations = [-10, 0, 10];
  const [active, setActive] = useState(null);

  const colors = [
    {
      bg: "#ffffff",
      text: "#24326A",
      title: "#24326A",
    },
    {
      bg: "#24326A",
      text: "#ffffff",
      title: "#ffffff",
    },
    {
      bg: "#fe6019",
      text: "#ffffff",
      title: "#ffffff",
    },
  ];

  const iconMap = {
    smartphone: FiSmartphone,
    monitor: FiMonitor,
    settings: FiSettings,
  };

  return (
    <section className="section min-h-dvh flex items-center">
      <div className="container text-center">
        {/* Header */}
        <div className="animate mb-10">
          <p className="uppercase">{features.subtitle}</p>
          {markdownify(
            features.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
          )}
          {markdownify(
            features.description,
            "p",
            "mt-4 text-base section-title",
          )}
        </div>

        {/* Cards */}
        <div className="relative mt-16 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
          {features.list.map((item, index) => {
            const color = colors[index % colors.length];
            const Icon = iconMap[item.icon];

            return (
              <motion.div
                key={index}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                initial={{ rotate: rotations[index] || 0 }}
                whileHover={{
                  scale: 1.06,
                  y: -12,
                  rotate: rotations[index],
                  boxShadow: "0px 35px 80px rgba(0,0,0,0.18)",
                }}
                transition={{ type: "spring", stiffness: 180, damping: 20 }}
                className="w-[260px] sm:w-[320px] h-[450px] rounded-2xl p-8 shadow-xl cursor-pointer relative"
                style={{
                  background: color.bg,
                  color: color.text,
                  zIndex: active === index ? 5 : index === 1 ? 3 : 1,
                  marginLeft:
                    index === 1 ? "-40px" : index === 2 ? "-40px" : "0",
                }}
              >
                <div className="flex flex-col justify-between h-full text-left">
                  {Icon && <Icon size={40} className="mb-6" />}

                  <h3
                    className="text-3xl font-semibold leading-tight"
                    style={{ color: color.title }}
                  >
                    {item.title}
                  </h3>

                  <p className="text-base opacity-80 mt-6">{item.content}</p>
                </div>

                {/* glow */}
                <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
