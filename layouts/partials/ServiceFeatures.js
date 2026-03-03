"use client";
import { markdownify } from "@lib/utils/textConverter";
import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

const Cards = ({ item, index, range, targetScale, progress }) => {
  const container = useRef(null);
  // const scale = useTransform(progress, range, [1, targetScale]);
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
      style={{ top: `calc(5vh + ${index * 25}px)` }}
    >
      <motion.div
        className="bg-white rounded-lg px-7 py-16 shadow-sm border border-slate-300 h-[500px] w-full flex items-center justify-between gap-10"
        style={{ scale }}
      >
        <div className="flex-1 text-start">
          <h3 className="text-4xl tracking-wide mb-5 mt-6 text-start">
            {item.title}
          </h3>
          <p className="text-lg tracking-wide line-clamp-6 text-start">
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
        <div className="animate mb-10">
          <p className="uppercase">{services.subtitle}</p>
          {markdownify(
            services.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed pb-1",
          )}
          {markdownify(
            services.description,
            "p",
            "mt-4 text-base section-title",
          )}
        </div>
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
