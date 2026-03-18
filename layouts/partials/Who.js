"use client";

import ButtonLink from "@layouts/components/ui/ButtonLink";
import { markdownify } from "@lib/utils/textConverter";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

function highlightFounder(text) {
  const founderName = "Kiran Kumar Patel";

  return text.split(founderName).map((part, index, array) =>
    index < array.length - 1 ? (
      <>
        {part}
        <span className="text-primary font-semibold">{founderName}</span>
      </>
    ) : (
      part
    ),
  );
}

export default function AboutSection({ about }) {
  return (
    <section className="section min-h-[50dvh] flex items-center">
      <div className="container text-center relative">
        {/* Soft Background Accent */}
        <div className="absolute -top-32 -right-32 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center relative z-10">
          {/* LEFT SIDE */}
          <div>
            <div className="animate mb-10">
              <p className="uppercase">{about.subtitle}</p>
              {markdownify(
                about.title,
                "h2",
                "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed pb-1 section-title",
              )}
            </div>

            <p className="animate mt-4 text-xl">
              {highlightFounder(about.description)}
            </p>

              {markdownify(
                about.content,
                "p",
                "animate mt-4 text-lg",
              )}

            <div className="animate mt-6">
              <ButtonLink href="/about" title="Learn More" />
            </div>
          </div>

          {/* RIGHT SIDE - Floating Card */}
          <div className="relative">
            <div className="animate bg-white border border-gray-100 p-10 rounded-3xl shadow-md">
              <div className="grid grid-cols-2 gap-10">
                <Stat number="8+" label="Years Experience" />
                <Stat number="100+" label="Projects Delivered" />
                <Stat number="50+" label="Happy Clients" />
                <Stat number="24/7" label="Support Ready" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ number, label }) {
  const [count, setCount] = useState(0);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  // Check if it's a valid countable number (like 100+ or 50)
  const isCountable = /^[0-9]+(\+)?$/.test(number);

  const numericValue = isCountable ? parseInt(number.replace(/\D/g, "")) : 0;

  const suffix = isCountable ? number.replace(/[0-9]/g, "") : "";

  useEffect(() => {
    if (!inView || !isCountable) return;

    const duration = 1500;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(easeOut * numericValue);

      setCount(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [inView, isCountable, numericValue]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <h3 className="text-4xl font-bold text-primary">
        {isCountable ? `${count}${suffix}` : number}
      </h3>
      <p className="text-gray-500 text-base mt-1">{label}</p>
    </div>
  );
}
