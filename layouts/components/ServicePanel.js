"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import SectionHeader from "./SectionHeader";

const ServicePanel = ({ services }) => {
  const [active, setActive] = useState(0);

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="section min-h-[50dvh] flex items-center">
      <div className="container text-center">
        <SectionHeader
          subtitle={services.subtitle}
          title={services.title}
          description={services.description}
        />

        <div className="lg:hidden space-y-8">
          {services.list.map((service, index) => (
            <div key={index} className="rounded-xl border border-gray-200 p-6">
              <h3 className="text-xl font-semibold text-[#24326A] mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-4">{service.description}</p>

              <ul className="space-y-2">
                {service.items.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-700"
                  >
                    <span className="w-2 h-2 mt-2 rounded-full bg-[#fe6019]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hidden lg:flex md:h-[550px] gap-4">
          {services.list.map((service, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                layout
                onMouseEnter={() => setActive(index)}
                className="relative overflow-hidden rounded-2xl cursor-pointer"
                animate={{
                  flex: isActive ? 2 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              >
                {/* Background */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-gradient-to-br from-[#24326A] to-[#fe6019]"
                      : "bg-gray-100"
                  }`}
                />

                {/* Content */}
                <div className="relative p-10 h-full flex flex-col justify-between">
                  <h3
                    className={`text-3xl font-semibold transition ${
                      isActive ? "text-white" : "text-[#24326A]"
                    }`}
                  >
                    {service.title}
                  </h3>

                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate={isActive ? "show" : "hidden"}
                    className="mt-6"
                  >
                    <motion.p
                      variants={item}
                      className={`mb-6 text-lg ${
                        isActive ? "text-white/90" : "text-gray-600"
                      }`}
                    >
                      {service.description}
                    </motion.p>

                    <motion.ul className="space-y-2" variants={container}>
                      {service.items.map((itemText, i) => (
                        <motion.li
                          key={i}
                          variants={item}
                          className={`flex items-center gap-2 text-lg ${
                            isActive ? "text-white" : "text-gray-700"
                          }`}
                        >
                          <span className="w-2 h-2 rounded-full bg-current"></span>
                          {itemText}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicePanel;
