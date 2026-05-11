"use client";

import { motion } from "framer-motion";
import SectionHeader from "@layouts/components/SectionHeader";
import {
  FaIndustry,
  FaTruckMoving,
  FaHeartbeat,
  FaChartLine,
  FaHardHat,
  FaShoppingCart,
  FaGraduationCap,
  FaRocket,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const icons = [
  FaIndustry,
  FaTruckMoving,
  FaHeartbeat,
  FaChartLine,
  FaHardHat,
  FaShoppingCart,
  FaGraduationCap,
  FaRocket,
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const Industries = ({ industries }) => {
  if (!industries) return null;

  return (
    <section className="relative overflow-hidden section border-y border-border/50">
      <div className="container">
        <SectionHeader
          subtitle={industries.subtitle}
          title={industries.title}
          description={industries.description}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="w-full"
        >
          <Swiper
            className="industries-marquee-slider py-4!"
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
              .industries-marquee-slider .swiper-wrapper {
                  transition-timing-function: linear !important;
              }
              .industries-marquee-slider .swiper-slide {
                  width: auto !important; 
              }
            `}</style>

            {industries.list.map((item, i) => {
              const Icon = icons[i] || FaIndustry;

              return (
                <SwiperSlide key={i} className="!w-[280px] md:!w-[330px]">
                  <div
                    className="group relative flex flex-col h-full items-center gap-4 p-5 lg:p-6 rounded-2xl overflow-hidden bg-white/70 backdrop-blur-md border border-gray-100 hover:border-gray-200 shadow-sm transition-all duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 text-primary transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md group-hover:from-secondary group-hover:to-primary">
                      <Icon size={24} />
                    </div>

                    <h3 className="relative z-10 font-semibold text-gray-800 text-xl leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default Industries;
