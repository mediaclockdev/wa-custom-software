"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState } from "react";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import { AnimatedText } from "./AnimatedText";

export default function Hero({ banner }) {
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

  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05, // controls speed between letters
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-bg-light to-white py-10 lg:py-18 min-h-[calc(100dvh-50px)] flex items-center">
      <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE */}
        <div className="z-10">
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl lg:text-6xl font-bold leading-tight text-gray-900"
          >
            {parts?.map((part, i) => {
              if (i === parts.length - 1) {
                return (
                  <span
                    key={i}
                    className="block bg-gradient-to-r from-primary via-blue-400 to-primary bg-[length:200%_100%] bg-clip-text text-transparent"
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
            className="mt-6 text-lg text-text max-w-xl"
          >
            High-performance web development, scalable solutions, and stunning
            UI/UX to help your brand stand out in the digital world.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="mt-8 flex gap-4"
          >
            {/* Primary CTA with pulse effect */}
            <ButtonLink
              animate={false}
              href={banner?.link?.href}
              title={banner?.link?.label}
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center items-center perspective">
          <motion.div
            animate={{
              y: [0, -15, 0, 15, 0],
              x: [0, 10, 0, -10, 0],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* 3D Tilt + Floating Image */}
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
