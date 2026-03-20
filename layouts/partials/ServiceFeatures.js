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
        className="bg-white rounded-lg px-7 py-16 shadow-sm border border-slate-300 h-[500px] w-full flex items-center justify-between gap-10"
        style={{ scale }}
      >
        <div className="flex-1 text-start">
          <h3 className="text-2xl lg:text-4xl mb-5 mt-6 text-start">
            {item.title}
          </h3>
          <p className="text-base lg:text-lg line-clamp-6 text-start">
            {item.content}
          </p>
        </div>

        <div className="flex-1 hidden lg:flex items-center justify-center">
          <Image
            src={item.url}
            alt={item.title}
            width={400}
            height={300}
            className="mt-5 rounded-md object-cover"
          />
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
