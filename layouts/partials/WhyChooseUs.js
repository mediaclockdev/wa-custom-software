"use client";

import { markdownify } from "@lib/utils/textConverter";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping } from "react-icons/fa";

const icons = [FaMapMarkerAlt, FaCogs, FaBolt, FaHandsHelping];

const WhyChooseUs = ({ why }) => {
  const safeWhy = why ?? {
    subtitle: "",
    title: "",
    list: [],
  };
  const targetRef = useRef(null);
  const rowRef = useRef(null);

  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const updateWidth = () => {
      if (rowRef.current) {
        const totalWidth = rowRef.current.scrollWidth;
        const visibleWidth = rowRef.current.clientWidth;
        setScrollWidth(totalWidth - visibleWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rawX = useTransform(scrollYProgress, [0, 1], [0, -(scrollWidth * 1.3)]);

  const x = useSpring(rawX, {
    stiffness: 120,
    damping: 25,
    mass: 0.6,
  });

  return (
    <section
      ref={targetRef}
      className="section h-[200vh] relative bg-gradient-to-b from-theme-light/80 via-white to-theme-light/40"
    >
      <div className="container sticky h-screen top-[13vh] overflow-hidden">
        <div className="animate max-w-3xl mx-auto text-center">
          {safeWhy.subtitle && (
            <p className="text-md sm:text-base uppercase tracking-wider font-medium">
              {safeWhy.subtitle}
            </p>
          )}

          {safeWhy.title &&
            markdownify(
              safeWhy.title,
              "h2",
              "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
            )}
        </div>

        {Array.isArray(safeWhy.list) && safeWhy.list.length > 0 && (
          <motion.div className="flex gap-4 mt-16" style={{ x }} ref={rowRef}>
            {safeWhy.list.map((item, i) => {
              const Icon = icons[i] || FaCogs;

              return (
                <motion.div
                  key={i}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="group animate relative rounded-3xl p-[2px] h-[360px] w-[300px] lg:h-[380px] lg:w-[400px] shrink-0 overflow-hidden cursor-pointer"
                >
                  <motion.div
                    className="absolute -inset-[150%] rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      ease: "linear",
                      repeat: Infinity,
                    }}
                    style={{
                      background: `conic-gradient(#24326A 0deg 300deg, #fe6019 300deg 330deg, #24326A 330deg 360deg)`,
                    }}
                  />

                  <div className="relative rounded-3xl bg-white p-8 h-full">
                    <div className="mb-5 text-primary">
                      <Icon size={28} />
                    </div>

                    <h3 className="text-2xl mb-2 tracking-wide">
                      {item.title}
                    </h3>

                    <p className="text-base text-text leading-relaxed tracking-wide">
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WhyChooseUs;
// <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//   {safeWhy.list.map((item, i) => {
//     const Icon = icons[i] || FaCogs;

//     return (
//       <motion.div
//         key={i}
//         whileHover={{ y: -6, scale: 1.02 }}
//         transition={{ type: "spring", stiffness: 200 }}
//         className="group animate relative rounded-3xl p-[2px] overflow-hidden cursor-pointer"
//       >
//         <motion.div
//           className="absolute -inset-[150%] rounded-full"
//           animate={{ rotate: 360 }}
//           transition={{
//             duration: 4,
//             ease: "linear",
//             repeat: Infinity,
//           }}
//           style={{
//             background: `conic-gradient(#24326A 0deg 300deg, #fe6019 300deg 330deg, #24326A 330deg 360deg)`,
//           }}
//         />

//         <div className="relative rounded-3xl bg-white p-8 h-full">
//           <div className="mb-5 text-primary">
//             <Icon size={28} />
//           </div>

//           <h3 className="text-2xl mb-2 tracking-wide">
//             {item.title}
//           </h3>

//           <p className="text-base text-text leading-relaxed tracking-wide">
//             {item.content}
//           </p>
//         </div>
//       </motion.div>
//     );
//   })}
// </div>
