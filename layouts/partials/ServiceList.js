const ServiceList = ({ services }) => (
  <section className="section bg-theme-light">
    <div className="container">
      <p className="text-center text-primary">{services.subtitle}</p>
      <h2 className="section-title text-center mb-12">
        {services.title}
      </h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {services.list.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-8 shadow transition hover:-translate-y-2"
          >
            <h3 className="mb-3">{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ServiceList;
