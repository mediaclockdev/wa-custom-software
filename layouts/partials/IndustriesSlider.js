"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";

const industries = [
  "Mining & Resources",
  "Healthcare & Medical",
  "Logistics & Supply Chain",
  "Finance & Professional Services",
  "Construction & Engineering",
  "Startups & Innovation",
];

export default function IndustriesSlider() {
  return (
    <section className="section border-y">
      <div className="container-xl">
        <h2 className="mb-12 text-center section-title">
          Industries We Serve
        </h2>

        <Swiper
          loop
          slidesPerView={2}
          spaceBetween={20}
          breakpoints={{
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          autoplay={{ delay: 2500 }}
          modules={[Autoplay]}
        >
          {industries.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="service-card text-center">
                <h3 className="service-title">{item}</h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
