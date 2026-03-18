"use client";

import { markdownify } from "@lib/utils/textConverter";
import { FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping } from "react-icons/fa";
import { FaUsers, FaClock } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";

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
        <div className="max-w-3xl mx-auto text-center">
          {safeWhy.subtitle && <p className="uppercase">{safeWhy.subtitle}</p>}

          {safeWhy.title &&
            markdownify(
              safeWhy.title,
              "h2",
              `mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed pb-1 ${safeWhy.description ? "" : "section-title"}`,
            )}
          {safeWhy.description &&
            markdownify(
              safeWhy.description,
              "p",
              "animate mt-2 text-xl section-title",
            )}
        </div>

        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <div className="mt-16">
            <Swiper
              modules={[Pagination]}
              spaceBetween={20}
              pagination={{ clickable: true }}
              breakpoints={{
                320: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {safeWhy.list.map((item, i) => {
                const Icon = icons[i] || FaCogs;

                return (
                  <SwiperSlide key={i} className="flex h-auto mb-10">
                    <div className="group relative rounded-3xl p-[2px] w-full h-full flex overflow-hidden">
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
                        <div className="mb-4 text-primary">
                          <Icon size={40} />
                        </div>

                        <h3 className="text-3xl font-semibold mb-2">
                          {item.title}
                        </h3>

                        <p className="text-lg leading-snug text-text flex-grow line-clamp-4">
                          {item.content}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
