"use client";

import { markdownify } from "@lib/utils/textConverter";
import { FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping } from "react-icons/fa";
import { FaUsers, FaClock } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import SectionHeader from "@layouts/components/SectionHeader";

const icons = [
  FaMapMarkerAlt,
  FaCogs,
  FaBolt,
  FaHandsHelping,
  FaUsers,
  FaClock,
];

const WhyChooseUs = ({ why }) => {
  const safeWhy = why ?? {
    subtitle: "",
    title: "",
    list: [],
  };

  return (
    <section className="section bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            subtitle={safeWhy.subtitle}
            title={safeWhy.title}
            description={safeWhy.description}
          />
        </motion.div>

        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Swiper
              className="!p-4 -m-4 !pb-8"
              modules={[Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              grabCursor={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {safeWhy.list.map((item, i) => {
                const Icon = icons[i] || FaCogs;

                return (
                  <SwiperSlide key={i} className="flex !h-auto mb-10">
                    <motion.div
                      className="w-full h-full flex transform-gpu"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.2 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="group relative rounded-3xl p-[2px] w-full h-full flex overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <motion.div
                          className="absolute -inset-[150%] rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 4,
                            ease: "linear",
                            repeat: Infinity,
                          }}
                          style={{
                            background:
                              "conic-gradient(#24326A 0deg 300deg, #fe6019 300deg 330deg, #24326A 330deg 360deg)",
                          }}
                        />

                        <div className="relative rounded-3xl bg-white p-6 flex flex-col w-full h-full">
                          <motion.div
                            className="mb-4 text-primary origin-left w-fit"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <Icon size={40} />
                          </motion.div>

                          <h3 className="text-xl lg:text-3xl font-semibold mb-2 line-clamp-3">
                            {item.title}
                          </h3>

                          <p className="text-lg text-text flex-grow">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
