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

        <div className="mt-6 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {industries.list.map((item, i) => {
            const Icon = icons[i] || FaIndustry;

            return (
              <div
                key={i}
                className="group flex items-center gap-4 p-5 lg:p-6 rounded-2xl bg-white border border-gray-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_-10px_rgba(0,0,0,0.08)] hover:border-primary/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary/5 to-secondary/5 text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 group-hover:shadow-md">
                  <Icon size={24} />
                </div>

                <h3 className="font-semibold text-gray-800 text-base lg:text-lg leading-snug group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Industries;
