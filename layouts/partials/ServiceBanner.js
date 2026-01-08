"use client";

import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const ServiceBanner = ({ banner }) => {
  const bannerRef = useRef(null);

  useLayoutEffect(() => {
    if (!bannerRef.current) return;

    const ctx = gsap.context(() => {
      // Intro animation
      gsap
        .timeline()
        .fromTo(".service-title", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
        .fromTo(".service-btn", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, "-=0.4")
        .fromTo(".service-img", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.4");

      // Background motion
      gsap.to(".service-gradient", {
        backgroundPosition: "200% 200%",
        duration: 30,
        ease: "linear",
        repeat: -1,
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} className="section banner pt-0 service-banner">
      <div className="container-xl">
        <div className="relative overflow-hidden rounded-2xl">

          {/* BACKGROUND */}
          <div className="service-bg absolute inset-0 overflow-hidden">
            <div className="service-gradient" />

            {/* Animated coding */}
            <div className="code-background">
              <pre className="code-stream">
{`const build = () => scalable && secure;

async function deploy() {
  await pipeline.run();
  return live;
}

class System {
  constructor() {
    this.reliable = true;
  }
}`}
              </pre>

              <pre className="code-stream delay">
{`export function api() {
  return fetch().then(r => r.json());
}

if (performance > target) {
  users.happy = true;
}`}
              </pre>
            </div>
          </div>

          {/* CONTENT */}
          <div className="row justify-center pb-10 relative z-10">
            <div className="col-10 pt-20 pb-10 text-center">
              {markdownify(banner.title, "h1", "mb-8 service-title opacity-0")}
              <div className="service-btn opacity-0">
                <Link href={banner.link.href} className="btn btn-primary">
                  {banner.link.label}
                </Link>
              </div>
            </div>

            <div className="col-10">
              <ImageFallback
                className="service-img opacity-0"
                src={banner.image}
                width={1170}
                height={666}
                priority
                alt=""
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceBanner;
