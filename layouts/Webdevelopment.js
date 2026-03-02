// import HomeBanner from "@layouts/partials/HomeBanner";
// import ServiceIntro from "@layouts/partials/ServiceIntro";
// import ServicesubIntro from "@layouts/partials/ServicesubIntro";
// import ServiceList from "@layouts/partials/ServiceList";
// import WhyChooseUs from "@layouts/partials/WhyChooseUs";
// import Process from "@layouts/partials/Process";
// import ServiceValue from "@layouts/partials/ServiceValue";
// import Industries from "@layouts/partials/Industries";
// import TechStack from "@layouts/partials/TechStack";
// import Testimonial from "@layouts/partials/Testimonial";
// import Faq from "@layouts/partials/Faq";
// import ServiceFeatures from "@layouts/partials/ServiceFeatures";

// const Webdevelopment = ({ data }) => {
//   const { frontmatter } = data;
//   console.log("FRONTMATTER:", frontmatter);
//   console.log("SUB INTRO:", frontmatter?.subIntro);

//   return (
//     <>
//       {/* HERO (same quality as homepage) */}
//       <HomeBanner
//         banner={frontmatter.banner}
//         brands={frontmatter.brands}
//         showCircles={false}
//         variant="service"
//       />

//       {/* INTRO */}
//       <ServiceIntro intro={frontmatter.intro} />

//       {/* Sub INTRO */}
//       <ServicesubIntro sub_intro={frontmatter.subIntro} />

//       {/* SERVICES */}
//       <ServiceFeatures services={frontmatter.services} />

//       {/* WHY CHOOSE US */}
//       <WhyChooseUs why={frontmatter.why} />

//       {/* PROCESS */}
//       <Process process={frontmatter.process} />

//       {/* BUSINESS VALUE */}
//       <ServiceValue value={frontmatter.value} />

//       {/* INDUSTRIES */}
//       <Industries industries={frontmatter.industries} />

//       {/* TECH STACK */}
//       <TechStack technologies={frontmatter.technologies} />

//       {/* TESTIMONIAL */}
//       {/* <Testimonial testimonial={frontmatter.testimonial} /> */}

//       {/* FAQ */}
//       <Faq faq={frontmatter.faq} />
//     </>
//   );
// };

// export default Webdevelopment;
