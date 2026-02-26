"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";
import { FaChevronDown } from "react-icons/fa";

const Faq = ({ faq }) => {
  const [active, setActive] = useState(null);
  if (!faq) return null;

  return (
    <section className="section ">
      <div className="container max-w-5xl">
        {/* Title */}
        <div className="text-center">
          {markdownify(faq.title, "h2", "section-title")}
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
                    ? "bg-white shadow-lg border-primary/40"
                    : "bg-white hover:shadow-sm border-slate-200"
                }`}
              >
                {/* <div
                  className={`h-1 w-full transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-purple-500"
                      : "bg-transparent"
                  }`}
                /> */}
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
                      className={`text-lg font-semibold transition-colors duration-300 ${
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
                    <p className="pt-4 text-slate-600 leading-relaxed">
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
