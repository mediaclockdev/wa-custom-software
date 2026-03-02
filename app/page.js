import Cta from "@layouts/components/Cta";
import GSAPWrapper from "@layouts/components/GSAPWrapper";
import ServicePanel from "@layouts/components/ServicePanel";
import Expertise from "@layouts/partials/Expertise";
import Faq from "@layouts/partials/Faq";
import Features from "@layouts/partials/Features";
import Process from "@layouts/partials/Process";
import SeoMeta from "@layouts/partials/SeoMeta";
import Hero from "@layouts/service/Hero";
import { getListPage } from "@lib/contentParser";

const Home = async () => {
  const homepage = await getListPage("content/_index.md");
  const { frontmatter } = homepage;
  const { banner, services, features, process, expertise, faq } =
    frontmatter;

  return (
    <GSAPWrapper>
      <SeoMeta title="Home" />
      <Hero banner={banner} isParticle={true} />
      <Features features={features} />
      <ServicePanel services={services} />
      <Process process={process} />
      <Expertise expertise={expertise} />
      <Faq faq={faq} />
    </GSAPWrapper>
  );
};

export default Home;
