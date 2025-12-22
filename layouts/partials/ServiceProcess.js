"use client";

import { FaSearch, FaPencilRuler, FaCode, FaRocket } from "react-icons/fa";

const steps = [
  {
    icon: <FaSearch />,
    title: "Discovery",
    desc: "We analyse your goals, challenges, and technical requirements to define a clear roadmap.",
  },
  {
    icon: <FaPencilRuler />,
    title: "Design & Planning",
    desc: "User flows, architecture, and UI/UX are crafted to ensure scalability and usability.",
  },
  {
    icon: <FaCode />,
    title: "Development & Testing",
    desc: "Our engineers build secure, high-performance software using modern technologies.",
  },
  {
    icon: <FaRocket />,
    title: "Launch & Support",
    desc: "We deploy, monitor, and continuously optimise your solution for long-term success.",
  },
];

export default function ServiceProcess() {
  return (
    <section className="section">
      <div className="container-xl">
        <h2 className="mb-16 text-center section-title">
          Our Development Process
        </h2>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="service-card text-center"
            >
              <div className="service-icon text-primary mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="service-title">{step.title}</h3>
              <p className="service-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
