"use client";

import { markdownify } from "@lib/utils/textConverter";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export default function ClientsSection({ clients }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const card = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="section min-h-[50dvh] flex items-center">
      <div className="container text-center">
        <div className="relative py-24 bg-gray-50 overflow-hidden">
          {/* Soft Orange Glow */}
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

          <div
            ref={ref}
            className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-start relative z-10"
          >
            {/* LEFT SIDE */}
            <div className="animate mb-10">
              <p className="uppercase">{clients.subtitle}</p>
              {markdownify(
                clients.title,
                "h2",
                "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed pb-1 section-title",
              )}
              {markdownify(
                clients.description,
                "p",
                "mt-4 text-base section-title",
              )}
            </div>

            {/* RIGHT SIDE - Animated Cards */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid gap-6"
            >
              {clients.list.map((item, index) => (
                <motion.div
                  key={index}
                  variants={card}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-3 h-3 mt-2 bg-secondary rounded-full shrink-0" />
                    <p className="text-gray-700 text-lg">{item}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
