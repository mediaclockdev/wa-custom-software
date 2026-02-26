// "use client";

// import { markdownify } from "@lib/utils/textConverter";
// import { FaCogs, FaChartLine, FaExpandArrowsAlt } from "react-icons/fa";

// const icons = [FaCogs, FaChartLine, FaExpandArrowsAlt];

// const ServiceValue = ({ value }) => {
//   if (!value) return null;

//   return (
//     <section className="section bg-theme-light">
//       <div className="container-xl">
//         {/* Header */}
//         <div className=" text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-wider text-sm font-medium">
//             {value.subtitle}
//           </p>
//           {markdownify(value.title, "h2", "mt-4 section-title")}
//         </div>

//         {/* Cards */}
//         <div className="mt-16 grid gap-8 md:grid-cols-3">
//           {value.list.map((item, i) => {
//             const Icon = icons[i] || FaCogs;

//             return (
//               <div
//                 key={i}
//                 className=" group rounded-2xl bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//               >
//                 {/* Icon */}
//                 <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-2xl transition group-hover:bg-primary group-hover:text-white">
//                   <Icon />
//                 </div>

//                 {/* Title */}
//                 <h3 className="mb-3 text-lg font-semibold text-dark">
//                   {item.title}
//                 </h3>

//                 {/* Description */}
//                 <p className="text-text leading-relaxed">
//                   {item.content}
//                 </p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ServiceValue;

"use client";

import { markdownify } from "@lib/utils/textConverter";
import { FaCogs, FaChartLine, FaExpandArrowsAlt } from "react-icons/fa";

const icons = [FaCogs, FaChartLine, FaExpandArrowsAlt];

const ServiceValue = ({ value }) => {
  if (!value) return null;

  return (
    <section className="section min-h-dvh bg-gradient-to-b from-theme-light to-white">
      <div className="container-xl">
        <div className="animate text-center max-w-3xl mx-auto">
          <p className="uppercase tracking-wider text-sm font-medium">
            {value.subtitle}
          </p>
          {markdownify(value.title, "h2", "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed")}
        </div>

        <div className="animate mt-16 max-w-4xl mx-auto space-y-8">
          {value.list.map((item, i) => {
            const Icon = icons[i] || FaCogs;

            return (
              <div
                key={i}
                className="group cursor-pointer relative flex flex-col md:flex-row items-start gap-6 rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg overflow-hidden"
              >
                <span className="pointer-events-none absolute inset-0 rounded-2xl">
                  <span className="absolute inset-0 rounded-2xl border border-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100"></span>

                  <span className="absolute inset-0 rounded-2xl border border-secondary [clip-path:inset(0_100%_100%_0)] transition-all duration-700 ease-out group-hover:[clip-path:inset(0_0_0_0)]"></span>
                </span>

                <div className="flex items-center justify-center gap-10 flex-col sm:flex-row">
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary text-2xl transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon size={26} />
                  </div>

                  <div className="relative z-10">
                    <h3 className="mb-1 text-2xl font-semibold text-dark">
                      {item.title}
                    </h3>
                    <p className="text-text leading-relaxed text-base">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceValue;
