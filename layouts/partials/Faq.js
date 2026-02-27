"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";
import { FaChevronDown } from "react-icons/fa";

const Faq = ({ faq }) => {
  const [active, setActive] = useState(null);
  if (!faq) return null;

  return (
    <section className="section min-h-dvh flex items-center bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="container w-[80%]">
        {/* Title */}
        <div className="text-center">
          {markdownify(
            faq.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed section-title",
          )}
        </div>

        <div className="mt-16 space-y-6">
          {faq.list.map((item, i) => {
            const isActive = active === i;

            return (
              <div
                key={i}
                onClick={() => setActive(isActive ? null : i)}
                className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 bg-white
                ${
                  isActive
                    ? "bg-white shadow-none border-primary/40"
                    : "bg-white hover:shadow-sm border-slate-200"
                }`}
              >
                <motion.div
                  initial={false}
                  animate={{ scaleX: isActive ? 1 : 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="h-1 w-full origin-left bg-gradient-to-r from-primary to-purple-500"
                />

                <div className="p-6 py-5">
                  {/* Question */}
                  <div className="flex items-center justify-between">
                    <h5
                      className={`text-xl font-semibold transition-colors duration-300 ${
                        isActive ? "text-primary" : "text-slate-800"
                      }`}
                    >
                      {item.q}
                    </h5>

                    <motion.div
                      animate={{ rotate: isActive ? 180 : 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <FaChevronDown
                        className={`transition-colors duration-300 ${
                          isActive ? "text-primary" : "text-slate-400"
                        }`}
                      />
                    </motion.div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pt-4 text-slate-600 text-base leading-relaxed">
                      {item.a}
                    </p>
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
