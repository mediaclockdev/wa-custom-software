"use client";

import Circle from "@layouts/components/Circle";
import { markdownify } from "@lib/utils/textConverter";

export default function ServiceHero({ title }) {
  return (
    <section className="banner banner-single">
      <div className="container-xl">
        <div className="banner-wrapper relative text-center">

          {markdownify(title, "h1", "mb-6 banner-regular-title")}

          <p className="mx-auto max-w-2xl text-lg">
            Custom-built software solutions for Perth businesses,
            designed to scale securely.
          </p>

          {/* REQUIRED BACKGROUND */}
          <div className="bg-theme banner-bg absolute left-0 top-0 col-12">
            <Circle className="circle left-[12%] top-[20%]" width={32} height={32} />
            <Circle className="circle right-[18%] bottom-[30%]" width={62} height={62} fill={false} />
          </div>

        </div>
      </div>
    </section>
  );
}
