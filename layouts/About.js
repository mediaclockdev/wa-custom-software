"use client";

import ClientsSection from "./components/ClientSection";
import Process from "./partials/Process";
import ServiceFeatures from "./partials/ServiceFeatures";
import AboutSection from "./partials/Who";
import Hero from "./service/Hero";

const About = ({ data }) => {
  const { frontmatter } = data;
  const { banner, about, services, process, clients } = frontmatter;

  return (
    <section>
      <Hero banner={banner} isParticle={false} />
      <AboutSection about={about} />
      <ServiceFeatures services={services} />
      <Process process={process} />
      <ClientsSection clients={clients} />
    </section>
  );
};

export default About;
