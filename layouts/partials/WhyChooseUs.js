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
    subtitle: "",
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
            subtitle={safeWhy.subtitle}
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
              className="lg:!pt-4 !px-1 lg:!px-4 lg:-mx-4"
              modules={[Pagination, Autoplay]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
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
                  <SwiperSlide key={i} className="flex !h-auto">
                    <motion.div
                      className="w-full h-full flex"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                    >

                      <div className="group relative rounded-[2rem] p-[2px] w-full h-full flex overflow-hidden shadow-sm lg:hover:shadow-md transition-all duration-500 lg:hover:-translate-y-2 border border-primary ">

                        {/* Card Content Layer */}
                        <div className="relative bg-white border border-slate-50/50 rounded-[calc(2rem-2px)] p-6 w-full h-full flex flex-col z-10 overflow-hidden">

                          {/* Subtle background glow on hover */}
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500" />

                          <div className="relative z-10 flex flex-col h-full">
                            <div className="mb-6 lg:mb-8 text-primary/90 lg:group-hover:text-primary transition-colors duration-300 origin-left inline-flex">
                              <Icon size={44} className="transform transition-transform duration-500 lg:group-hover:scale-110 lg:group-hover:rotate-3" />
                            </div>

                            <h3 className="text-xl lg:text-2xl font-bold mb-4 text-gray-900 lg:group-hover:text-primary transition-colors duration-300">
                              {item.title}
                            </h3>

                            <p className="text-lg text-gray-600 flex-grow leading-relaxed">
                              {item.content}
                            </p>
                          </div>
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
    </section >
  );
};

export default WhyChooseUs;
