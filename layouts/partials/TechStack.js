"use client";

import { markdownify } from "@lib/utils/textConverter";

const TechStack = ({ technologies }) => {
  if (!technologies) return null;

  return (
    <section className="section bg-theme-light">
      <div className="container">
        <div className="animate text-center max-w-3xl mx-auto">
          <p>{technologies.subtitle}</p>
          {markdownify(technologies.title, "h2", "mt-4 section-title")}
        </div>

        <div className="grid gap-6 mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.list.map((tech, i) => (
            <div
              key={i}
              className="animate rounded-xl bg-white p-6 shadow text-center"
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
