import { markdownify } from "@lib/utils/textConverter";

const ServiceIntro = ({ intro }) => (
  <section className="section">
    <div className="container max-w-4xl text-center">
      <p className="mb-4 text-primary">{intro.subtitle}</p>
      {markdownify(intro.title, "h2", "section-title")}
      {markdownify(intro.description, "p", "mt-6 text-lg")}
    </div>
  </section>
);

export default ServiceIntro;
