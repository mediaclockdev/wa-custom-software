"use client";
import { markdownify } from "@lib/utils/textConverter";
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
    <section className="section min-h-dvh flex items-center">
      <div className="container">
        <div className="animate text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {industries.subtitle}
          </p>
          {markdownify(
            industries.title,
            "h2",
            "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
          )}
        </div>

        <div className="mt-16 flex flex-col lg:flex-row h-auto lg:h-[420px] overflow-hidden rounded-3xl">
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

                <div className="relative z-10 flex flex-col items-center justify-center h-[300px] lg:h-full text-center px-6 transform transition-transform duration-500 ease-out will-change-transform group-hover:scale-105">
                  <div className="mb-6 transition-transform duration-500 ease-out group-hover:scale-125 group-hover:rotate-6">
                    <Icon
                      size={42}
                      className="text-gray-700 group-hover:text-white transition"
                    />
                  </div>

                  <h3
                    className="text-lg lg:text-xl font-semibold text-gray-800 
                         group-hover:text-white transition-all duration-500 
                         translate-y-2 group-hover:translate-y-0 
                         opacity-80 group-hover:opacity-100 break-words"
                  >
                    {item}
                  </h3>

                  <p
                    className="mt-3 text-sm text-gray-600 opacity-0 
                        group-hover:opacity-100 
                        group-hover:text-white/90 
                        transition-[transform,opacity,color] duration-500 ease-out translate-y-4 
                        group-hover:translate-y-0"
                  >
                    Transforming {item} with smart solutions.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;

{
  /* <div className="flex h-[400px]">
          {industries.list.map((item, i) => {
            const Icon = icons[i] || FaIndustry;

            return (
              <div
                key={i}
                className="flex-1 hover:flex-[3] transition-all duration-500 bg-gradient-to-br from-gray-100 to-white flex flex-col justify-center items-center"
              >
                <Icon size={40} />
                <h3 className="mt-4 text-xl font-bold">{item}</h3>
              </div>
            );
          })}
        </div> */
}
