"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import SectionHeader from "@layouts/components/SectionHeader";

const Cards = ({ item, index, range, targetScale, progress }) => {
  const container = useRef(null);
  const rawScale = useTransform(progress, range, [1, targetScale]);
  const scale = useSpring(rawScale, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  return (
    <div
      key={index}
      ref={container}
      className={`card w-full h-dvh sticky`}
      style={{ top: `calc(8vh + ${index * 25}px)` }}
    >
      <motion.div
        className="bg-white rounded-[2rem] p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100 h-[500px] w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative overflow-hidden"
        style={{ scale }}
      >
        <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="flex-1 text-start relative z-10 flex flex-col justify-center h-full mt-0">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-50 border border-gray-100 shadow-sm mb-6 flex-shrink-0">
            <span className="text-lg font-bold text-gray-800">0{index + 1}</span>
          </div>
          <h3 className="text-3xl lg:text-[2.5rem] font-bold tracking-tight text-gray-900 mb-4 leading-[1.15]">
            {item.title}
          </h3>
          <p className="text-lg lg:text-xl text-gray-500 font-medium leading-relaxed line-clamp-5">
            {item.content}
          </p>
        </div>

        <div className="flex-1 hidden lg:flex items-center justify-end h-full relative z-10">
          <div className="relative w-full max-w-[450px] aspect-[4/3] rounded-[1.5rem] overflow-hidden shadow-2xl border border-white flex-shrink-0">
            {item.url ? (
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="w-full h-full bg-slate-100 flex items-center justify-center text-gray-400 font-medium">No Image</div>
            )}
            <div className="absolute inset-0 border border-black/5 rounded-[1.5rem] pointer-events-none"></div>
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent pointer-events-none mix-blend-multiply"></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ServiceFeatures = ({ services }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="section relative z-10 ">
      <div className="container text-center">
        <SectionHeader
          subtitle={services.subtitle}
          title={services.title}
          description={services.description}
        />
        <div className="w-full min-h-screen flex flex-col items-center">
          <div ref={container} className="flex flex-col items-center w-[95%]">
            {services.list.map((item, index) => {
              const targetScale = 1 - (services.list.length - index) * 0.05;
              return (
                <Cards
                  item={item}
                  index={index}
                  // range={[0.14 * index, 1]}
                  range={[index / services.list.length, 1]}
                  targetScale={targetScale}
                  progress={scrollYProgress}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;
