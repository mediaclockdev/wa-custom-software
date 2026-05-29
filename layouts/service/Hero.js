"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import ButtonLink from "@layouts/components/ui/ButtonLink";
import { AnimatedText } from "./AnimatedText";
import { IoIosCall } from "react-icons/io";

/**
 * Shared Hero for Homepage and About page.
 *
 * @param {"home"|"about"} variant
 *   • home  → text left + image right with gradient accent frame, CTA, grid bg
 *   • about → image left + text right (reversed), no CTA, clean bg
 */
export default function Hero({ banner, variant = "home" }) {
  const isHome = variant === "home";
  const isAbout = variant === "about";

  const parts = banner?.title?.split(/<\/?br\s*\/?>/i) || [
    "High-Performance",
    "Web Development",
  ];

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

  /* ── Shared text block ── */
  const textBlock = (
    <motion.div
      className={`flex flex-col items-center text-center lg:items-start lg:text-left gap-6 ${
        isHome ? "mt-3" : "mt-2 lg:pl-4"
      }`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Pill Badge */}
      <motion.div
        variants={itemVariants}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm"
      >
        <span
          className={`w-2.5 h-2.5 rounded-full animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite] ${
            isHome ? "bg-green-500" : "bg-primary"
          }`}
        />
        <span className="text-sm font-semibold tracking-wide text-gray-700">
          {isHome ? "Next-Gen Software Agency" : "Our Company"}
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        className={`font-extrabold text-gray-900 leading-[1.1] tracking-tight max-w-3xl break-words ${
          isHome
            ? "text-5xl md:text-6xl lg:text-[4.25rem]"
            : "text-5xl md:text-6xl lg:text-[4.25rem]"
        }`}
      >
        {parts.map((part, i) => {
          const isLast = i === parts.length - 1;
          return (
            <span key={i} className="block">
              {isLast ? (
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  <AnimatedText text={part} delay={i * 0.4} />
                </span>
              ) : (
                <AnimatedText text={part} delay={i * 0.4} />
              )}
            </span>
          );
        })}
      </motion.h1>

      {/* Description */}
      <motion.p
        variants={itemVariants}
        className="text-lg md:text-xl text-muted max-w-lg lg:leading-relaxed"
      >
        {banner?.description ||
          "High-performance web development, scalable solutions, and stunning UI/UX to help your brand stand out in the digital world."}
      </motion.p>

      {/* CTA Button — Home only */}
      {isHome && (
        <motion.div variants={itemVariants}>
          <ButtonLink
            animate={true}
            href={banner?.link?.href || "/contact"}
            title={banner?.link?.label || "Start a Project"}
            icon={IoIosCall}
          />
        </motion.div>
      )}
    </motion.div>
  );

  return (
    <section
      className={`relative flex items-center overflow-hidden py-6 !pt-0 ${
        isHome
          ? "min-h-[60dvh] bg-slate-50"
          : "min-h-[50dvh] bg-gradient-to-br from-white via-slate-50 to-white"
      }`}
    >
      {/* ── Background (Home: grid, About: clean) ── */}
      {isHome && (
        <>
          <div
            className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-slate-50 via-transparent to-slate-100 z-0 pointer-events-none" />
        </>
      )}

      {/* ── Ambient glows ── */}
      <div
        className={`absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full blur-[120px] z-0 pointer-events-none ${
          isHome ? "bg-primary/10" : "bg-primary/5"
        }`}
      />
      <div
        className={`absolute bottom-10 rounded-full blur-[140px] z-0 pointer-events-none ${
          isHome
            ? "right-10 lg:right-1/4 w-[500px] h-[500px] bg-blue-300/20"
            : "left-10 lg:left-1/4 w-[400px] h-[400px] bg-secondary/10"
        }`}
      />

      <div
        className={`container relative z-10 mx-auto px-4 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center`}
      >
        {isHome ? (
          <>
            {/* ═══ HOME: Text LEFT → Image RIGHT ═══ */}
            {textBlock}
            <HomeImage banner={banner} />
          </>
        ) : (
          <>
            {/* ═══ ABOUT: Image LEFT → Text RIGHT ═══ */}
            {textBlock}
            <AboutImage banner={banner} />
          </>
        )}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   HOME IMAGE — Landscape with gradient accent frame
   ───────────────────────────────────────────── */
function HomeImage({ banner }) {
  if (!banner?.image) return <NoImage />;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex relative w-full justify-center items-center"
    >
      <div className="relative w-full aspect-[4/3] xl:aspect-[16/11] group z-10">
        {/* Gradient accent rectangle — offset behind the image */}
        <div className="absolute -bottom-3 -right-3 w-full h-full rounded-[2rem] bg-gradient-to-br from-primary/20 via-secondary/15 to-primary/10 z-0" />

        {/* Image */}
        <div
          className="relative w-full h-full rounded-[2rem] overflow-hidden bg-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] hero-float z-10"
          style={{ willChange: "transform" }}
        >
          <Image
            src={banner.image}
            alt={
              banner.title
                ? banner.title.replace(/<[^>]*>?/gm, "")
                : "Hero Illustration"
            }
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/35 via-black/10 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ABOUT IMAGE — Taller, left-side, accent border-left
   ───────────────────────────────────────────── */
function AboutImage({ banner }) {
  if (!banner?.image) return <NoImage />;

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="hidden lg:flex relative w-full justify-center items-center"
    >
      <div className="relative w-full group z-10 flex gap-4 items-stretch">
        {/* Image — taller aspect for about */}
        <div className="relative w-full aspect-[3/2] xl:aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)]">
          <Image
            src={banner.image}
            alt={
              banner.title ? banner.title.replace(/<[^>]*>?/gm, "") : "About Us"
            }
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
        </div>
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   FALLBACK
   ───────────────────────────────────────────── */
function NoImage() {
  return (
    <div className="hidden lg:flex relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl border border-gray-100 bg-slate-50 items-center justify-center">
      <div className="text-gray-400 font-medium tracking-wide">
        No Image Provided
      </div>
    </div>
  );
}
