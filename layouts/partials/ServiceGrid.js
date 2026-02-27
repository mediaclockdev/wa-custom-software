const services = [
  {
    title: "Custom Software Development",
    desc: "Fully customised software solutions aligned with your workflows and business goals.",
    icon: "🧩",
  },
  {
    title: "Web & Mobile App Development",
    desc: "High-performance applications for iOS, Android, and web platforms.",
    icon: "📱",
  },
  {
    title: "AI & Intelligent Automation",
    desc: "AI-driven automation that reduces manual workloads and improves efficiency.",
    icon: "🤖",
  },
  {
    title: "ERP & CRM Development",
    desc: "Centralised systems that improve internal coordination and decision-making.",
    icon: "📊",
  },
  {
    title: "SaaS Application Development",
    desc: "Scalable, secure cloud platforms built for long-term growth.",
    icon: "☁️",
  },
  {
    title: "Database & Backend Development",
    desc: "Robust backend architectures ensuring speed, stability, and data integrity.",
    icon: "🗄️",
  },
];


export default function ServiceList() {
  return (
    <section className="section bg-theme-light">
      <div className="container">
        <div className="service-list-header text-center mb-14">
          <h2 className="mb-4">Our Custom Software Development Services</h2>
          <p className="max-w-2xl mx-auto">
            We build scalable, secure, and future-ready software solutions that
            solve real business challenges.
          </p>
        </div>

        <div className="service-grid">
          {services.map((s, i) => (
            <div key={i} className="service-card">
              <div className="service-icon">{s.icon}</div>
              <h3 className="service-title">{s.title}</h3>
              <p className="service-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
