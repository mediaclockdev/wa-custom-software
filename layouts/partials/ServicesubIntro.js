
import { markdownify } from "@lib/utils/textConverter";
"use client";
const ServicesubIntro = ({ sub_intro }) => {
  if (!sub_intro) return null;

  return (
    <section className="section">
      <div className="container max-w-4xl text-center">
        {sub_intro.subtitle && (
          <p className="mb-4 text-primary">{sub_intro.subtitle}</p>
        )}
        {markdownify(sub_intro.title, "h2", "section-title")}
        {markdownify(sub_intro.description, "p", "mt-6 text-lg")}
      </div>
    </section>
  );
};


export default ServicesubIntro;
