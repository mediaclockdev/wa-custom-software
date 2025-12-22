"use client";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";

const Banner = ({ title }) => {
  const banner = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const header = document.querySelector(".header");
      const headerHeight = header?.clientHeight || 0;

      const tl = gsap.timeline();
      tl.fromTo(
        ".banner-regular-title",
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.5 }
      ).fromTo(
        ".breadcrumb",
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.5 },
        ">-.3"
      );

      const parallaxTl = gsap.timeline({
        ease: "none",
        scrollTrigger: {
          trigger: banner.current,
          start: () => `top ${headerHeight}`,
          end: () => `+=${banner.current.offsetHeight}`,
          scrub: true,
        },
      });

      const position = banner.current.offsetHeight * 0.15;
      parallaxTl.fromTo(
        ".banner-single .circle",
        { y: 0 },
        { y: position },
        "<"
      );
    }, banner);

    return () => ctx.revert();
  }, []);

  return (
    <div className="banner banner-single" ref={banner}>
      {/* JSX unchanged */}
    </div>
  );
};

export default Banner;
