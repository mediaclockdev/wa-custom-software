"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@layouts/components/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

const ServiceFeatures = ({ services }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section className="section relative z-10 overflow-hidden">
      <div className="container">
        <div className="text-center mb-8 lg:mb-12">
          <SectionHeader
            subtitle={services.subtitle}
            title={services.title}
            description={services.description}
          />
        </div>

        {/* Mobile Slider (hidden on md and up) */}
        <div className="block md:hidden pb-12">
          <Swiper
            modules={[Pagination]}
            spaceBetween={20}
            pagination={{ clickable: true }}
            grabCursor={true}
            slidesPerView={1}
            className="pb-12"
          >
            {services.list.map((item, index) => (
              <SwiperSlide key={index} className="!h-auto">
                <div
                  className="group bg-white rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 transition-all duration-500 flex flex-col h-full w-full relative mb-5"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50 z-10">
                    {item.url ? (
                      <Image
                        src={item.url}
                        alt={item.title || "Feature Image"}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                        <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                    )}

                    <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow relative z-10 bg-white">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-lg text-gray-600 leading-normal max-w-none transition-all duration-300">
                      {item.content}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid (hidden below md) */}
        <motion.div
          className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 xl:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
        >
          {services.list.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md border border-slate-100 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full relative"
            >
              {/* Optional background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

              <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-50 z-10">
                {item.url ? (
                  <Image
                    src={item.url}
                    alt={item.title || "Feature Image"}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                    <svg className="w-12 h-12 mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              <div className="p-4 lg:p-6 flex flex-col flex-grow relative z-10 bg-white">
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                </div>
                <p className="text-lg text-gray-600 leading-normal max-w-none transition-all duration-300">
                  {item.content}
                </p>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
