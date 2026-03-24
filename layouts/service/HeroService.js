"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedText } from "./AnimatedText";

export default function HeroService({ banner, title: propTitle, description: propDescription }) {
  const rawTitle = banner?.title || propTitle || "Digital Service";
  const description = banner?.description || propDescription;
  const image = banner?.image;

  const parts = rawTitle?.split(/<\/?br\s*\/?>/i);

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  };

  return (
    <section className="relative py-6 lg:pb-12 overflow-hidden bg-white">


      <div className="container relative z-10 mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-6 items-center">

          {/* LEFT: Text (Half width) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start text-left lg:pr-2"
          >
            {/* Minimalist Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-[0_2px_10px_rgba(0,0,0,0.02)] mb-8">
              <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-gray-500">Service Overview</span>
            </motion.div>

            {/* Super Clean Typography Title */}
            <motion.h1
              className="text-5xl sm:text-6xl lg:text-[4.5rem] font-bold text-gray-900 tracking-tight leading-[1.05] mb-8"
            >
              {parts?.map((part, i) => {
                if (i === parts.length - 1) {
                  return (
                    <motion.span key={i} variants={itemVariants} className="block mt-2">
                      <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent pb-3">
                        <AnimatedText text={part} />
                      </span>
                    </motion.span>
                  );
                }
                return (
                  <motion.span key={i} variants={itemVariants} className="block text-gray-900 drop-shadow-sm">
                    {part}
                  </motion.span>
                );
              })}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted max-w-xl leading-relaxed"
            >
              {description || "We architect and build robust, scalable, and high-performance digital solutions custom-tailored to accelerate your business growth."}
            </motion.p>
          </motion.div>

          {/* RIGHT: Wide Image Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:flex relative w-full justify-center lg:justify-end items-center"
          >
            {image ? (
              <div className="relative w-full aspect-[4/3] lg:aspect-[4/3] xl:aspect-[16/11] group perspective-[1000px] z-10">
                {/* Levitating Image Wrapper */}
                <motion.div
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] bg-slate-100 border border-white/60"
                >
                  <Image
                    src={image}
                    alt={rawTitle?.replace(/<\/?br\s*\/?>/i, ' ')}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 400px"
                    priority
                  />

                  {/* Soft inner vignette overlay */}
                  <div className="absolute inset-0 border border-white/20 rounded-[2rem] pointer-events-none mix-blend-overlay"></div>
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"></div>
                </motion.div>

                {/* Sleek floating pill popping out over the image corner */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, rotateZ: -5 }}
                  animate={{ opacity: 1, scale: 1, rotateZ: -3, y: [-4, 4, -4] }}
                  transition={{
                    opacity: { delay: 1, duration: 0.8 },
                    scale: { delay: 1, duration: 0.8, type: "spring" },
                    y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                  }}
                  className="absolute -bottom-5 -left-5 sm:-bottom-6 sm:-left-6 backdrop-blur-2xl bg-white/95 border border-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center gap-3 z-20"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg sm:text-xl text-primary drop-shadow-sm">✦</span>
                  </div>
                  <div className="flex flex-col pr-2 sm:pr-3">
                    <span className="text-[9px] sm:text-[10px] font-bold tracking-widest uppercase text-gray-400 mb-0.5">Status</span>
                    <span className="text-xs sm:text-sm font-extrabold text-gray-900 leading-tight">Active Service</span>
                  </div>
                </motion.div>
              </div>
            ) : (
              <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 bg-slate-50 flex items-center justify-center">
                <div className="text-gray-400 font-medium tracking-wide">No Image Provided</div>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
