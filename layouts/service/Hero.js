"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import { AnimatedText } from "./AnimatedText";
import { IoIosCall } from "react-icons/io";

export default function Hero({ banner }) {
  const parts = banner?.title?.split(/<\/?br\s*\/?>/i) || [
    "High-Performance",
    "Web Development",
  ];

  // 3D Perspective Mouse Tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for buttery smooth interpolation
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 15 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 15 });

  // Map mouse movement to rotation degrees
  const rotateX = useTransform(smoothY, [-1, 1], [15, -15]);
  const rotateY = useTransform(smoothX, [-1, 1], [-15, 15]);

  // Map mouse movement to 2D parallax (pixels) for About page
  const parallaxX = useTransform(smoothX, [-1, 1], [-20, 20]);
  const parallaxY = useTransform(smoothY, [-1, 1], [-20, 20]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // normalized -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // normalized -0.5 to 0.5
    mouseX.set(x * 2);
    mouseY.set(y * 2);
  };

  const handleMouseLeave = () => {
    // Snap back to zero on leave
    mouseX.set(0);
    mouseY.set(0);
  };

  // Stagger Text Reveal Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <section className="relative flex items-center min-h-[60dvh] bg-slate-50 overflow-hidden py-4 xl:py-6">
      {/* Decorative Grid & Glow Background */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-slate-100 z-0 pointer-events-none" />
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -z-10 mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-10 right-10 lg:right-1/4 w-[500px] h-[500px] bg-blue-300/20 rounded-full blur-[120px] -z-10 mix-blend-multiply pointer-events-none" />

      <div className="container relative z-10 mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        {/* LEFT SIDE - Staggered Text Reveal */}
        <motion.div
          className="flex flex-col items-start gap-6 lg:pr-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
            <span className="text-sm font-semibold tracking-wide text-gray-700">
              Next-Gen Software Agency
            </span>
          </motion.div>

          <motion.h1 className="text-5xl sm:text-6xl lg:text-[4.25rem] font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-3xl">
            {parts.map((part, i) => {
              const isLast = i === parts.length - 1;

              return (
                <span key={i} className="block">
                  {isLast ? (
                    <span className="bg-gradient-to-r from-primary via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      <AnimatedText text={part} delay={i * 0.4} />
                    </span>
                  ) : (
                    <AnimatedText text={part} delay={i * 0.4} />
                  )}
                </span>
              );
            })}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-gray-600 font-medium max-w-lg leading-relaxed mt-2"
          >
            {banner?.description ||
              "High-performance web development, scalable solutions, and stunning UI/UX to help your brand stand out in the digital world."}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-col sm:flex-row gap-4 w-full sm:w-auto z-20 relative"
          >
            <ButtonLink
              animate={true}
              href={banner?.link?.href || "/contact"}
              title={banner?.link?.label || "Start a Project"}
              icon={IoIosCall}
            />
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Interactive 3D Faux UI or Banner Image */}
        <div
          className="relative w-full h-[500px] lg:h-[600px] flex justify-center items-center perspective-[1200px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Framer motion wrapper combining mouse rotation mapped to 3D CSS rotation */}
          <motion.div
            style={
              banner?.image
                ? { x: parallaxX, y: parallaxY }
                : { rotateX, rotateY, transformStyle: "preserve-3d" }
            }
            className="relative w-full max-w-md h-full flex justify-center items-center"
          >
            {banner?.image ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full h-full flex justify-center items-center"
              >
                {/* Image Container with continuous float */}
                <motion.div
                  style={{ transform: "translateZ(40px)" }}
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="relative w-full z-10 flex justify-center"
                >
                  <motion.img
                    initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                    src={banner.image}
                    alt={
                      banner.title
                        ? banner.title.replace(/<[^>]*>?/gm, "")
                        : "Hero Illustration"
                    }
                    className="w-full max-w-[90%] sm:max-w-md h-auto max-h-[450px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                  />
                </motion.div>

                {/* Floating Aesthetic Badges - Left */}
                <motion.div
                  style={{ transform: "translateZ(80px)" }}
                  initial={{ opacity: 0, scale: 0.8, x: -30 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [10, -10, 10] }}
                  transition={{
                    opacity: { delay: 1, duration: 0.8 },
                    scale: { delay: 1, duration: 0.8, type: "spring" },
                    x: { delay: 1, duration: 0.8, type: "spring" },
                    y: {
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    },
                  }}
                  className="absolute left-0 sm:-left-4 top-1/4 backdrop-blur-2xl bg-white/90 border border-white shadow-2xl rounded-2xl p-4 flex items-center gap-3 z-30"
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shadow-inner text-indigo-500">
                    <svg
                      className="w-5 h-5 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="hidden xs:block pr-2">
                    <div className="text-sm font-extrabold text-gray-800">
                      High Speed
                    </div>
                    <div className="text-[10px] font-bold tracking-widest text-indigo-500 uppercase">
                      Performance
                    </div>
                  </div>
                </motion.div>

                {/* Floating Aesthetic Badges - Right */}
                <motion.div
                  style={{ transform: "translateZ(120px)" }}
                  initial={{ opacity: 0, scale: 0.8, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0, y: [-10, 10, -10] }}
                  transition={{
                    opacity: { delay: 1.2, duration: 0.8 },
                    scale: { delay: 1.2, duration: 0.8, type: "spring" },
                    x: { delay: 1.2, duration: 0.8, type: "spring" },
                    y: {
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    },
                  }}
                  className="absolute -right-4 sm:-right-8 bottom-1/4 backdrop-blur-2xl bg-white/95 border border-white shadow-xl rounded-2xl p-4 flex flex-col gap-1 z-30"
                >
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Quality
                  </div>
                  <div className="text-3xl font-black text-gray-900 tracking-tighter">
                    100<span className="text-primary text-xl">%</span>
                  </div>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 2, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-indigo-500"
                    />
                  </div>
                </motion.div>

                {/* Background ambient glow spheres for depth */}
                <motion.div
                  style={{ transform: "translateZ(-60px)" }}
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 bg-blue-400/20 rounded-full filter blur-[60px] -z-10 pointer-events-none"
                />
                <motion.div
                  style={{ transform: "translateZ(-80px)" }}
                  animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
                  transition={{
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="absolute top-1/2 right-0 -translate-y-1/2 w-56 h-56 bg-primary/20 rounded-full filter blur-[70px] -z-10 pointer-events-none"
                />
              </motion.div>
            ) : (
              <>
                {/* The Main IDE / Code Window */}
                <motion.div
                  style={{ transform: "translateZ(0px)" }}
                  className="absolute w-full h-[320px] sm:h-[380px] bg-white/70 backdrop-blur-xl border border-white rounded-3xl shadow-2xl p-6 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-400"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                      <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="text-xs font-mono font-medium text-gray-500">
                      core_system.jsx
                    </div>
                  </div>

                  {/* Fake Code / Tech UI inside IDE */}
                  <div className="flex-1 rounded-2xl bg-[#0d1117] p-5 font-mono text-xs sm:text-sm text-gray-300 flex flex-col gap-2 shadow-inner border border-white/10 relative">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: 1.5,
                        delay: 0.5,
                        ease: "easeOut",
                      }}
                      className="whitespace-nowrap overflow-hidden"
                    >
                      <span className="text-pink-400">import</span> {"{ "}
                      <span className="text-blue-300">Innovation</span>
                      {" }"} <span className="text-pink-400">from</span>{" "}
                      <span className="text-green-300">'@agency/core'</span>;
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="mt-2 text-gray-400"
                    >
                      // Initialize highly scalable infrastructure
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.8 }}
                    >
                      <span className="text-blue-400">const</span>{" "}
                      <span className="text-yellow-200">project</span> ={" "}
                      <span className="text-pink-400">await</span>{" "}
                      Innovation.build({"{"}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.0 }}
                      className="pl-4"
                    >
                      performance: <span className="text-purple-400">100</span>,
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 2.2 }}
                      className="pl-4"
                    >
                      design: <span className="text-green-300">'stunning'</span>
                      ,
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 2.4 }}
                    >
                      {"}"});
                    </motion.div>

                    {/* Simulated blinking cursor */}
                    <div className="mt-auto group flex items-center gap-2">
                      <span className="text-green-400 text-lg leading-none">
                        ❯
                      </span>
                      <div className="w-2.5 h-4 bg-gray-400 animate-pulse"></div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating UI Elements bursting out at different Z depths */}
                <motion.div
                  style={{ transform: "translateZ(100px)" }} // Pushed strongly toward user
                  className="absolute -right-6 top-10 sm:-right-12 sm:top-16 backdrop-blur-2xl bg-white/95 border border-white shadow-xl rounded-2xl p-4 flex items-center gap-4 z-20 pointer-events-none"
                >
                  <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-xl shadow-inner">
                    🚀
                  </div>
                  <div className="hidden xs:block">
                    <div className="text-sm font-extrabold text-gray-800">
                      Deployed
                    </div>
                    <div className="text-xs font-medium tracking-wide text-green-500 uppercase">
                      Live - 0.2s
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  style={{ transform: "translateZ(140px)" }} // Floating further out
                  className="absolute -left-6 bottom-16 sm:-left-16 sm:bottom-24 backdrop-blur-xl bg-white border border-white shadow-2xl rounded-2xl p-4 sm:p-5 flex flex-col gap-2 w-36 sm:w-44 z-20 pointer-events-none"
                >
                  <div className="text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Lighthouse
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tighter">
                    100<span className="text-primary text-xl">%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1 shadow-inner">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary via-blue-500 to-indigo-500"
                    />
                  </div>
                </motion.div>

                {/* Accent glowing sphere that moves negatively in Z depth */}
                <motion.div
                  style={{ transform: "translateZ(-80px)" }}
                  className="absolute top-10 right-0 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse pointer-events-none"
                ></motion.div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
