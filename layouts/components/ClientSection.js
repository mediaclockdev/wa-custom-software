"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "./SectionHeader";
import ButtonLink from "@layouts/components/ui/ButtonLink";

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
    <section className="section flex items-center pb-0">
      <div className="container text-center">
        <div className="relative py-4 lg:py-6 bg-gray-50 overflow-hidden">
          {/* Soft Orange Glow */}
          <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

          <div
            ref={ref}
            className="container mx-auto px-6 grid md:grid-cols-2 gap-2 lg:gap-16 items-start relative z-10"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center gap-5 md:items-start text-center md:text-left justify-center pb-10 md:pb-0">
              <SectionHeader
                subtitle={clients.subtitle}
                title={clients.title}
                description={clients.description}
              />
              <div className="w-full text-center">
                <ButtonLink href="/contact" title="Contact Us" />
              </div>
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
