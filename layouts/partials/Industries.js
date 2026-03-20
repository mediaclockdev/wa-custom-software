"use client";
import SectionHeader from "@layouts/components/SectionHeader";
import { useState } from "react";
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
  const [activeIndex, setActiveIndex] = useState(0);
  if (!industries) return null;

  return (
    <section className="section min-h-[30dvh] flex items-center">
      <div className="container">
        <SectionHeader
          subtitle={industries.subtitle}
          title={industries.title}
          description={industries.description}
        />

        <div className="mt-16 flex flex-col lg:flex-row h-auto lg:h-[420px] overflow-hidden rounded-3xl">
          <div className="lg:hidden">
            <Swiper spaceBetween={16} slidesPerView={1.2} grabCursor={true}>
              {industries.list.map((item, i) => {
                const Icon = icons[i] || FaIndustry;

                return (
                  <SwiperSlide key={i}>
                    <div className="rounded-2xl p-6 bg-gradient-to-br from-gray-100 to-white h-full">
                      <Icon size={36} className="mb-4 text-primary" />

                      <h3 className="text-xl font-semibold">{item.title}</h3>

                      <p className="mt-2 text-base text-gray-600">
                        {item.content ||
                          `Transforming ${item.title} with smart solutions.`}
                      </p>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="hidden lg:flex h-[420px] overflow-hidden rounded-3xl">
            {industries.list.map((item, i) => {

              const Icon = icons[i] || FaIndustry;
              const isActive = activeIndex === i;

              console.log("isActive:", isActive);

              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveIndex(i)}
                  className={`relative flex-1 cursor-pointer overflow-hidden transition-[flex] duration-500 ease-in-out
          ${isActive ? "flex-[3]" : "flex-[1]"}`}
                >
                  {/* BACKGROUND */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br transition-all duration-700
            ${
              isActive
                ? "from-primary/90 to-secondary/90"
                : "from-gray-100 via-white to-gray-50"
            }`}
                  />

                  {/* CONTENT */}
                  <div
                    className={`relative z-10 flex flex-col items-center justify-start pt-16 h-full text-center px-6 transition-all duration-500
            ${isActive ? "scale-105" : ""}`}
                  >
                    {/* ICON */}
                    <div
                      className={`h-[60px] flex items-center justify-center mb-4 transition-all duration-500
              ${isActive ? "scale-125 rotate-6" : ""}`}
                    >
                      <Icon
                        size={42}
                        className={`transition ${
                          isActive ? "text-white" : "text-gray-700"
                        }`}
                      />
                    </div>

                    {/* TITLE */}
                    <h3
                      className={`text-xl font-semibold transition-all duration-500 break-words
              ${isActive ? "text-white" : "text-gray-800"}`}
                    >
                      {item.title}
                    </h3>

                    {/* DESC */}
                    <p
                      className={`mt-3 text-lg transition-all duration-500
              ${
                isActive
                  ? "opacity-100 text-white/90"
                  : "opacity-0 text-gray-600"
              }`}
                    >
                      {item.content ||
                        `Transforming ${item.title} with smart solutions.`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* <div className="hidden lg:flex h-[420px] overflow-hidden rounded-3xl">
            {industries.list.map((item, i) => {
              const Icon = icons[i] || FaIndustry;

              return (
                <div
                  key={i}
                  className="group relative flex-1 transition-[flex] duration-500 ease-in-out lg:hover:flex-[3] cursor-pointer overflow-hidden"
                >
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 
                        group-hover:from-primary/90 group-hover:to-secondary/90 
                        transition-all duration-700"
                  />

                  <div className="relative z-10 flex flex-col items-center justify-start pt-16 h-[300px] lg:h-full text-center px-6 transform transition-transform duration-500 ease-out will-change-transform group-hover:scale-105">
                    <div className="h-[60px] flex items-center justify-center mb-4 transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-6">
                      <Icon
                        size={42}
                        className="text-gray-700 group-hover:text-white transition"
                      />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-white transition-all duration-500 break-words">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-lg text-gray-600 opacity-0 group-hover:opacity-100 group-hover:text-white/90 transition-all duration-500">
                      {item.content
                        ? item.content
                        : `Transforming ${item.title} with smart solutions.`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Industries;
