"use client";

import { useState } from "react";
import { markdownify } from "@lib/utils/textConverter";

const Faq = ({ faq }) => {
  const [active, setActive] = useState(null);
  if (!faq) return null;

  return (
    <section className="section">
      <div className="container max-w-4xl">
        <div className="animate text-center">
          {markdownify(faq.title, "h2", "section-title")}
        </div>

        <div className="mt-12 space-y-4">
          {faq.list.map((item, i) => (
            <div
              key={i}
              className="animate rounded-xl border bg-white p-6 cursor-pointer"
              onClick={() => setActive(active === i ? null : i)}
            >
              <h4 className="flex justify-between items-center">
                {item.q}
                <span>{active === i ? "−" : "+"}</span>
              </h4>

              {active === i && (
                <p className="mt-4 text-text">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
