"use client";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import SectionHeader from "./SectionHeader";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import { IoIosCall } from "react-icons/io";

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
            className="container grid md:grid-cols-2 gap-2 lg:gap-12 items-start relative z-10"
          >
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left justify-center pb-3 md:pb-0">
              <SectionHeader
                title={clients.title}
                description={clients.description}
              />
              <div className="w-full text-center">
                <ButtonLink href={clients.href} title="Contact Us" icon={IoIosCall} />
              </div>
            </div>

            {/* RIGHT SIDE - Animated Cards */}
            <motion.div
              variants={container}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="grid gap-4"
            >
              {clients.list.map((item, index) => (
                <motion.div
                  key={index}
                  variants={card}
                  whileHover={{ y: -6 }}
                  className="bg-white border border-gray-100 p-2 px-3 lg:p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="text-left">
                    <p className="relative pl-6 before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-2.5 before:h-2.5 before:bg-secondary before:rounded-full text-gray-700 text-lg">
                      {item}
                    </p>
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
