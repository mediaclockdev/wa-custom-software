"use client";

import { FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping } from "react-icons/fa";
import { FaUsers, FaClock } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Autoplay, Pagination } from "swiper";
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
    title: "",
    list: [],
  };

  return (
    <section className="section bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title={safeWhy.title}
            description={safeWhy.description}
          />
        </motion.div>

        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <motion.div
            className="mt-8 lg:mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Swiper
              className="!px-1 lg:!px-4 lg:-mx-4"
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              speed={800}
              loop={true}
              spaceBetween={24}
              pagination={{ clickable: true }}
              grabCursor={true}
              breakpoints={{
                320: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
              }}
            >
              {safeWhy.list.map((item, i) => {
                const Icon = icons[i] || FaCogs;

                return (
                  <SwiperSlide key={i} className="!h-auto">
                    <div
                      className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md border border-primary/10 transition-all duration-500 flex flex-col h-full relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                      <div className="p-6 lg:p-8 flex flex-col flex-grow relative z-10 bg-white">
                        <div className="mb-6 lg:mb-8 text-primary/90 group-hover:text-primary transition-colors duration-300 origin-left inline-flex">
                          <Icon size={44} className="transform transition-transform duration-500 group-hover:scale-110" />
                        </div>

                        <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 group-hover:text-primary transition-colors duration-300">
                          {item.title}
                        </h3>

                        <p className="text-lg text-gray-600 flex-grow leading-relaxed">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </motion.div>
        )}
      </div>
    </section >
  );
};

export default WhyChooseUs;
