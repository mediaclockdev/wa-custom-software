"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import { AnimatedText } from "./AnimatedText";
import ParticlesComponent from "@layouts/components/ParticlesBackground";

export default function Hero({ banner, isParticle = false }) {
  // Motion values (no React state)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const rotateX = useTransform(smoothY, (v) => v * -1);
  const rotateY = useTransform(smoothX, (v) => v * 1);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left - rect.width / 2) / 15;
    const y = (e.clientY - rect.top - rect.height / 2) / 15;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const parts = banner?.title?.split(/<\/?br\s*\/?>/i);

  return (
    <section className="relative bg-transparent py-16 lg:py-20 lg:pb-12">
      {isParticle ? <ParticlesComponent /> : null}
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-5 items-center">
        {/* LEFT SIDE */}
        <div className="z-10 flex flex-col items-start gap-5">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl lg:text-6xl font-bold  text-gray-900 "
          >
            {parts?.map((part, i) => {
              if (i === parts.length - 1) {
                return (
                  <span
                    key={i}
                    className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] bg-clip-text text-transparent pb-2"
                  >
                    <AnimatedText text={part} />
                  </span>
                );
              }

              return (
                <span key={i} className="block">
                  {part}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="animate mt-3 text-lg text-text max-w-xl"
          >
            {banner?.description
              ? banner.description
              : "High-performance web development, scalable solutions, and stunning UI/UX to help your brand stand out in the digital world."}
          </motion.p>

          <ButtonLink
            animate={false}
            href={banner?.link?.href}
            title={banner?.link?.label}
          />
        </div>

        {/* RIGHT SIDE */}
        <div className="relative hidden lg:flex justify-center items-center perspective">
          <motion.div
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div
              onMouseMove={handleMouseMove}
              onMouseLeave={handleLeave}
              style={{
                x: smoothX,
                y: smoothY,
                rotateX,
                rotateY,
              }}
              className="relative transform-gpu cursor-pointer"
            >
              <Image
                src={banner?.image}
                alt="Web Development"
                width={700}
                height={700}
                className="rounded-xl shadow-sm"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
