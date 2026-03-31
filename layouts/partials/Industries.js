"use client";
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

const Industries = ({ industries }) => {
  if (!industries) return null;

  return (
    <section className="section bg-slate-50 ">
      <div className="container">
        <SectionHeader
          subtitle={industries.subtitle}
          title={industries.title}
          description={industries.description}
        />

        <div className="mt-6 lg:mt-12">
          <Swiper
            className="industries-marquee-slider !py-4"
            modules={[Autoplay]}
            spaceBetween={24}
            loop={true}
            speed={6000}
            freeMode={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: false,
            }}
            allowTouchMove={false}
            slidesPerView="auto"
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
                    className="group flex flex-col h-full items-center gap-4 p-5 lg:p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 text-primary transition-all duration-500 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md group-hover:from-secondary group-hover:to-primary">
                      <Icon size={24} />
                    </div>

                    <h3 className="font-semibold text-gray-800 text-base lg:text-xl leading-snug group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Industries;
