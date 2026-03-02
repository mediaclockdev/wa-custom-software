import { markdownify } from "@lib/utils/textConverter";

const ServiceIntro = ({ intro }) => (
  <section className="section">
    <div className="container max-w-4xl text-center">
      <p className="animate mb-2 text-primary">{intro.subtitle}</p>
      {markdownify(intro.title, "h2", "animate section-title")}
      {markdownify(intro.description, "p", "animate mt-8 text-base")}
    </div>
  </section>
);

export default ServiceIntro;
