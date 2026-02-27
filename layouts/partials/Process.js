"use client";

import { markdownify } from "@lib/utils/textConverter";
import { FaSearch, FaDraftingCompass, FaCode, FaRocket } from "react-icons/fa";

const icons = [FaSearch, FaDraftingCompass, FaCode, FaRocket];

// const Process = ({ process }) => {
//   if (!process) return null;

//   return (
//     <section className="section min-h-dvh flex items-center">
//       <div className="container">
//         <div className="animate text-center max-w-3xl mx-auto">
//           <p className="text-md sm:text-base uppercase tracking-wider font-medium">
//             {process.subtitle}
//           </p>
//           {markdownify(process.title, "h2", "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed")}
//         </div>

//         <div className="relative mt-16">
//           <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-primary/20 md:block" />

//           <div className="space-y-12 lg:px-4">
//             {process.steps.map((step, i) => {
//               const Icon = icons[i] || FaSearch;
//               const isLeft = i % 2 === 0;

//               return (
//                 <div
//                   key={i}
//                   className={`animate cursor-pointer relative flex items-start gap-4 md:gap-0 ${
//                     isLeft ? "md:justify-start" : "md:justify-end"
//                   }`}
//                 >
//                   <div className="w-full md:w-5/12">
//                     <div className="group relative overflow-hidden rounded-2xl border border-primary/10 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
//                       <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />

//                       <div className="flex shrink-0 items-center justify-center md:hidden relative z-10">
//                         <div className="h-14 w-14 cursor-pointer bg-gradient-to-br from-secondary to-primary text-white rounded-xl shadow-lg flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
//                           <Icon size={22} />
//                         </div>
//                       </div>

//                       <span className="absolute top-6 right-6 text-sm font-semibold text-primary/40">
//                         {`0${i + 1}`}
//                       </span>

//                       <h4 className="mb-3 text-2xl font-semibold text-dark tracking-relaxed relative z-10">
//                         {step.title}
//                       </h4>

//                       <div className="w-10 h-[2px] bg-primary/70 mb-4 transition-all duration-300 group-hover:w-full" />

//                       <p className="text-text text-base leading-relaxed relative z-10">
//                         {step.content}
//                       </p>
//                     </div>
//                   </div>

//                   <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-xl transition-all duration-300 hover:scale-110">
//                     <Icon size={22} />
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

const Process = ({ process }) => {
  if (!process) return null;

  return (
    <section className="section min-h-dvh flex items-center">
      <div className="container">
        <div className="animate text-center max-w-3xl mx-auto">
          <p className="text-md sm:text-base uppercase tracking-wider font-medium">
            {process.subtitle}
          </p>

          {markdownify(
            process.title,
            "h2",
            "mt-2 section-title text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed",
          )}
        </div>

        {/* Timeline */}
        <div className="relative mt-20">
          {/* Center vertical line */}
          <div className="absolute left-1/2 top-0 hidden h-full w-[2px] -translate-x-1/2 bg-primary/20 md:block" />

          <div className="space-y-16">
            {process.steps.map((step, i) => {
              const Icon = icons[i] || FaSearch;
              const isLeft = i % 2 === 0;

              return (
                <div key={i} className="relative grid md:grid-cols-2">
                  {/* LEFT COLUMN */}
                  <div
                    className={`${
                      isLeft ? "md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="group relative min-h-[220px] rounded-2xl border border-primary/10 bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-sm cursor-pointer overflow-hidden">
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />

                      <div className="flex items-center justify-center md:hidden mb-6 relative z-10">
                        <div className="h-14 w-14 bg-gradient-to-br from-secondary to-primary text-white rounded-xl shadow-lg flex items-center justify-center">
                          <Icon size={22} />
                        </div>
                      </div>

                      <span className="absolute top-6 right-6 text-sm font-semibold text-primary/40">
                        {`0${i + 1}`}
                      </span>

                      <h4 className="mb-4 text-3xl font-semibold relative z-10">
                        {step.title}
                      </h4>

                      <div className="w-12 h-[2px] bg-primary/70 mb-6 transition-all duration-300 group-hover:w-full" />

                      <p className="text-text leading-relaxed text-base relative z-10">
                        {step.content}
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-secondary to-primary text-white shadow-xl">
                    <Icon size={22} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
