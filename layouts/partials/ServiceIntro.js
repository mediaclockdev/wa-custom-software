import { markdownify } from "@lib/utils/textConverter";

const ServiceIntro = ({ intro }) => (
  <section className="section">
    <div className="container max-w-4xl text-center animate ">
      <p className="uppercase">{intro.subtitle}</p>
      {markdownify(
        intro.title,
        "h2",
        "mt-2 text-3xl lg:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent pb-1 section-title",
      )}
      {markdownify(intro.description, "p", "animate mt-8 text-lg lg:text-xl")}
    </div>
  </section>
);

export default ServiceIntro;
