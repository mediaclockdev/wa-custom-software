"use client";

import { motion } from "framer-motion";
import { IconMap } from "@lib/service/IconMap";
import SectionHeader from "@layouts/components/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
    <section className="relative overflow-hidden section border-y border-border/50">
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
            className="!px-1 pb-12 lg:!px-4 lg:-mx-4"
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            speed={800}
            loop={true}
            grabCursor={true}
            breakpoints={{
              320: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {technologies.groups.map((group, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
                  }}
                  className="group relative h-full overflow-hidden bg-white/70 backdrop-blur-md p-8 rounded-2xl border border-gray-100 hover:border-gray-200 shadow-sm transition-all duration-500 hover:-translate-y-1"
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
