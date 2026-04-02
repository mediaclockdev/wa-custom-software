"use client";

import { motion } from "framer-motion";
import { IconMap } from "@lib/service/IconMap";
import SectionHeader from "@layouts/components/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const TechStack = ({ technologies }) => {
  if (!technologies || !technologies.groups) return null;

  return (
    <section className="relative overflow-hidden py-10 border-y border-border/50">
      <div className="container">

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            subtitle={technologies.subtitle}
            title={technologies.title}
            description={technologies.description}
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full"
        >

          <Swiper
            className="tech-marquee-slider !py-4"
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            speed={4000} // increase for smoother flow
            freeMode={true} // IMPORTANT
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={false}
            slidesPerView="auto" // IMPORTANT
          >
            <style>{`
              .tech-marquee-slider .swiper-wrapper {
                  transition-timing-function: linear !important;
              }

              .tech-marquee-slider .swiper-slide {
                  width: auto !important; /* VERY IMPORTANT */
              }
            `}</style>

            {technologies.groups.map((group, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="group relative h-full overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-[2rem] border border-white/60 hover:border-primary/20 shadow-md transition-all duration-500 hover:-translate-y-1"
                >

                  <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-primary to-blue-400 rounded-full" />
                      <h3 className="text-2xl font-bold tracking-normal text-gray-900 drop-shadow-sm">
                        {group.title}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {group.items.map((tech, j) => {
                        const Icon = IconMap[tech];

                        return (
                          <div
                            key={j}
                            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-gray-100 shadow-sm hover:border-primary/40 hover:bg-primary/[0.02] hover:shadow-md transition-all duration-300 text-gray-600 hover:text-primary cursor-default group/tech"
                          >
                            {Icon && <Icon className="text-lg transition-transform duration-300 group-hover/tech:scale-110" />}
                            <span className="text-[14px] font-semibold tracking-wide">
                              {tech}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
