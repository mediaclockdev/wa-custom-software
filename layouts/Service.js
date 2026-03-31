import ServiceIntro from "@layouts/partials/ServiceIntro";
import WhyChooseUs from "@layouts/partials/WhyChooseUs";
import Process from "@layouts/partials/Process";
import ServiceValue from "@layouts/partials/ServiceValue";
import Industries from "@layouts/partials/Industries";
import TechStack from "@layouts/partials/TechStack";
import Faq from "@layouts/partials/Faq";
import ServiceFeatures from "@layouts/partials/ServiceFeatures";
import HeroService from "./service/HeroService";

const Service = ({ data }) => {
  const { frontmatter } = data;

  return (
    <>
      {/* HERO (same quality as homepage) */}
      <HeroService banner={frontmatter.banner} />

      {/* TECH STACK */}
      <TechStack technologies={frontmatter.technologies} />

      {/* INTRO */}
      <ServiceIntro intro={frontmatter.intro} />

      {/* SERVICES */}
      <ServiceFeatures services={frontmatter.services} />

      {/* WHY CHOOSE US */}
      <WhyChooseUs why={frontmatter.why} />

      {/* PROCESS */}
      <Process process={frontmatter.process} />

      {/* BUSINESS VALUE */}
      <ServiceValue value={frontmatter.value} />

      {/* INDUSTRIES */}
      <Industries industries={frontmatter.industries} />

      {/* FAQ */}
      <Faq faq={frontmatter.faq} />
    </>
  );
};

export default Service;
