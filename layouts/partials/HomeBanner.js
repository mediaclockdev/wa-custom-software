"use client";

import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const HomeBanner = ({
  banner: bannerData,
  brands,
  showCircles = true,
  variant = "default",
}) => {
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      const banner = bannerRef.current;
      const bannerBg = banner.querySelector(".banner-bg");
      const bannerContent = banner.querySelector(".banner-content");
      const header = document.querySelector(".header");

      const headerHeight = header?.clientHeight || 0;

      /* INTRO ANIMATION (ALL PAGES) */
      gsap
        .timeline()
        .fromTo(
          ".banner-title",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, delay: 0.4 }
        )
        .fromTo(
          ".banner-btn",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 },
          ">-0.4"
        )
        .fromTo(
          ".banner-img",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 },
          ">-0.4"
        );

      /* PARALLAX (ALL PAGES) */
      if (bannerBg && bannerContent) {
        const position =
          (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;

        const parallaxTl = gsap.timeline({
          scrollTrigger: {
            trigger: banner,
            start: `top ${headerHeight}`,
            scrub: true,
          },
          ease: "none",
        });

        parallaxTl
          .fromTo(bannerBg, { y: 0 }, { y: -position })
          .fromTo(bannerContent, { y: 0 }, { y: position }, "<");

        if (variant === "default") {
          parallaxTl.fromTo(
            ".banner-bg .circle",
            { y: 0 },
            { y: position },
            "<"
          );
        }
      }

      /* SERVICE PAGE – AMBIENT MOTION ONLY */
      if (variant === "service") {
        gsap.to(".service-gradient-mesh", {
          backgroundPosition: "200% 200%",
          duration: 30,
          ease: "linear",
          repeat: -1,
        });

        gsap.to(".orb-1", {
          x: 80,
          y: 60,
          scale: 1.05,
          duration: 20,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(".orb-2", {
          x: -70,
          y: -50,
          scale: 1.08,
          duration: 24,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, bannerRef);

    return () => ctx.revert();
  }, [variant]);

  return (
    <section ref={bannerRef} className="section banner pt-0">
      <div className="container-xl">
        <div className="relative">

          {/* BACKGROUND */}
          <div className="bg-theme banner-bg absolute inset-0 overflow-hidden">

            {/* HOMEPAGE */}
            {variant === "default" && showCircles && (
              <>
                <Circle className="circle left-[10%] top-12" width={32} height={32} fill={false} />
                <Circle className="circle right-[15%] top-[20%]" width={70} height={70} />
              </>
            )}

            {/* SERVICE PAGE */}
            {variant === "service" && (
              <>
                {/* Gradient depth */}
                <div className="service-gradient-mesh" />

                {/* Coding background */}
                <div className="code-background">
                  <pre className="code-stream">
                    {`const buildSoftware = () => {
  return scalable && secure;
}

function deploy() {
  CI.run();
  CD.release();
}

if (performance > expectation) {
  client.happy = true;
}`}
                  </pre>

                  <pre className="code-stream delay">
                    {`export async function api() {
  const data = await fetch();
  return data.json();
}

class System {
  constructor() {
    this.reliable = true;
  }
}`}
                  </pre>
                </div>
              </>
            )}
          </div>

          {/* CONTENT */}
          <div className="row overflow-hidden rounded-2xl">
            <div className="col-12">
              <div className="row justify-center pb-10 relative">
                <div className="banner-content col-10 pt-20 pb-10 text-center">
                  {markdownify(
                    bannerData.title,
                    "h1",
                    "mb-8 banner-title opacity-0"
                  )}
                  <div className="banner-btn opacity-0">
                    <Link href={bannerData.link.href} className="btn btn-primary">
                      {bannerData.link.label}
                    </Link>
                  </div>
                </div>

                <div className="col-10">
                  <ImageFallback
                    className="banner-img opacity-0"
                    src={bannerData.image}
                    width={1170}
                    height={666}
                    priority
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          {/* BRANDS */}
          <div className="row border-y border-border py-5">
            <div className="col-12">
              <Swiper
                loop
                slidesPerView={3}
                breakpoints={{ 992: { slidesPerView: 5 } }}
                spaceBetween={20}
                modules={[Autoplay]}
                autoplay={{ delay: 3000 }}
              >
                {brands.map((brand, index) => (
                  <SwiperSlide key={index} className="h-20 px-6 grayscale hover:grayscale-0">
                    <div className="relative h-full">
                      <ImageFallback src={brand} alt="" fill className="object-contain" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
