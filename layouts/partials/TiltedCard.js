"use client";

import { motion } from "framer-motion";

const cards = [
  {
    title: "Going Zero to One",
    description:
      "If you're navigating a new business unit or launching a new venture entirely.",
    bg: "#ffffff",
    text: "#24326A",
    rotate: -10,
  },
  {
    title: "Scaling from One to N",
    description:
      "If you have achieved product-market fit and want to scale your business.",
    bg: "#24326A",
    text: "#ffffff",
    rotate: 0,
    highlight: true,
  },
  {
    title: "Need Quick Solutions",
    description:
      "If you know exactly what you want and need a team that can quickly help.",
    bg: "#fe6019",
    text: "#ffffff",
    rotate: 10,
  },
];

export default function StrategyCards() {
  return (
    <section className="py-20 bg-white flex justify-center">
      <div className="relative flex flex-col md:flex-row items-center justify-center gap-10 md:gap-0">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.06,
              y: -12,
            }}
            transition={{ type: "spring", stiffness: 250, damping: 18 }}
            className="w-[260px] sm:w-[300px] h-[380px] rounded-2xl p-8 shadow-xl cursor-pointer relative"
            style={{
              background: card.bg,
              color: card.text,
              transform: `rotate(${card.rotate}deg)`,
              zIndex: card.highlight ? 3 : 1,
              marginLeft: i === 1 ? "-40px" : i === 2 ? "-40px" : "0",
            }}
          >
            <div className="flex flex-col justify-between h-full">
              <h3 className="text-xl sm:text-2xl font-semibold leading-tight">
                {card.title}
              </h3>

              <p className="text-sm opacity-80">{card.description}</p>
            </div>

            {/* subtle glow on hover */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.15)]"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
