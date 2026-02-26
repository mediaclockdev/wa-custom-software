// "use client";

// import { motion } from "framer-motion";
// import { markdownify } from "@lib/utils/textConverter";
// import {
//   SiJavascript,
//   SiPython,
//   SiCsharp,
//   SiPhp,
//   SiReact,
//   SiAngular,
//   SiBattledotnet,
//   SiLaravel,
//   SiDjango,
//   SiSwift,
//   SiKotlin,
//   SiFlutter,
//   SiMysql,
//   SiPostgresql,
//   SiMongodb,
//   SiGooglecloud,
// } from "react-icons/si";
// import { FaAws } from "react-icons/fa";
// import { VscAzure } from "react-icons/vsc";
// import { DiMsqlServer } from "react-icons/di";
// import { PiFileCSharp } from "react-icons/pi";

// const iconMap = {
//   JavaScript: SiJavascript,
//   Python: SiPython,
//   "C#": PiFileCSharp,
//   PHP: SiPhp,
//   React: SiReact,
//   Angular: SiAngular,
//   ".NET": SiBattledotnet,
//   Laravel: SiLaravel,
//   Django: SiDjango,
//   Swift: SiSwift,
//   Kotlin: SiKotlin,
//   Flutter: SiFlutter,
//   MySQL: SiMysql,
//   PostgreSQL: SiPostgresql,
//   MongoDB: SiMongodb,
//   "SQL Server": DiMsqlServer,
//   AWS: FaAws,
//   Azure: VscAzure,
//   "Google Cloud": SiGooglecloud,
// };

// const containerVariants = {
//   hidden: {},
//   show: {
//     transition: {
//       staggerChildren: 0.06,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   show: { opacity: 1, y: 0 },
// };

// const TechStack = ({ technologies }) => {
//   if (!technologies) return null;

//   return (
//     <section className="section bg-gradient-to-b from-white via-slate-50 to-white">
//       <div className="container">
//         {/* Header */}
//         <div className="text-center max-w-3xl mx-auto">
//           <p className="uppercase tracking-widest text-sm text-primary/80">
//             {technologies.subtitle}
//           </p>
//           {markdownify(technologies.title, "h2", "mt-4 section-title")}
//         </div>

//         {/* Tech Grid */}
//         <motion.div
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="show"
//           viewport={{ once: true }}
//           className="mt-20 grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
//         >
//           {technologies.list.map((tech, i) => {
//             const Icon = iconMap[tech];

//             return (
//               <motion.div
//                 key={i}
//                 variants={itemVariants}
//                 className="group flex flex-col items-center justify-center rounded-2xl bg-white border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
//               >
//                 {Icon && (
//                   <Icon
//                     size={36}
//                     className="text-primary transition-all duration-300 group-hover:text-primary group-hover:scale-110"
//                   />
//                 )}

//                 <span className="mt-4 text-sm font-medium text-slate-700">
//                   {tech}
//                 </span>
//               </motion.div>
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default TechStack;

"use client";

import { motion } from "framer-motion";
import { markdownify } from "@lib/utils/textConverter";
import {
  SiJavascript,
  SiPython,
  SiCsharp,
  SiPhp,
  SiReact,
  SiAngular,
  SiBattledotnet,
  SiLaravel,
  SiDjango,
  SiSwift,
  SiKotlin,
  SiFlutter,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGooglecloud,
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";
import { PiFileCSharp } from "react-icons/pi";

const iconMap = {
  JavaScript: SiJavascript,
  Python: SiPython,
  "C#": PiFileCSharp,
  PHP: SiPhp,
  React: SiReact,
  Angular: SiAngular,
  ".NET": SiBattledotnet,
  Laravel: SiLaravel,
  Django: SiDjango,
  Swift: SiSwift,
  Kotlin: SiKotlin,
  Flutter: SiFlutter,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  "SQL Server": DiMsqlServer,
  AWS: FaAws,
  Azure: VscAzure,
  "Google Cloud": SiGooglecloud,
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const TechStack = ({ technologies }) => {
  if (!technologies) return null;

  return (
    <section
      className="relative overflow-hidden 
                    py-16 sm:py-20 md:py-28 
                    bg-gradient-to-b from-white via-slate-50 to-white"
    >
      {/* Background Glow Blobs (hidden on mobile) */}
      <div className="hidden md:block absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30" />
      <div className="hidden md:block absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl opacity-30" />

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-md sm:text-base uppercase tracking-wider font-medium">{technologies.subtitle}</p>

          {markdownify(
            technologies.title,
            "h2",
            "mt-2 text-2xl sm:text-3xl md:text-5xl tracking-wide bg-gradient-to-r from-primary via-primary to-secondary/80 bg-clip-text text-transparent leading-relaxed section-title",
          )}
        </div>

        {/* Tech Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 md:mt-20 
                 grid gap-5 sm:gap-6 md:gap-10 
                 grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          {technologies.list.map((tech, i) => {
            const Icon = iconMap[tech];

            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="relative group cursor-pointer"
              >
                {/* Subtle Outside Glow */}
                <div
                  className="absolute -inset-1 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 
                         transition duration-300 
                         bg-primary/10 blur-lg"
                />

                {/* Card */}
                <motion.div
                  {...floatingAnimation}
                  className="relative flex flex-col items-center justify-center 
                         rounded-xl sm:rounded-2xl 
                         bg-white/90 
                         border border-slate-200 
                         p-5 sm:p-6 md:p-8 
                         shadow-sm hover:shadow-md 
                         transition-all duration-300"
                >
                  {Icon && (
                    <Icon
                      className="text-3xl sm:text-4xl text-primary 
                             transition-colors duration-300 
                             group-hover:text-purple-600"
                    />
                  )}

                  <span className="mt-2 sm:mt-3 text-sm sm:text-base font-semibold text-slate-700 tracking-wide">
                    {tech}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );

  // return (
  //   <section className="relative overflow-hidden py-28 bg-gradient-to-b from-white via-slate-50 to-white">
  //     {/* Background Glow Blobs */}
  //     <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-30" />
  //     <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl opacity-30" />

  //     <div className="container relative z-10">
  //       {/* Header */}
  //       <div className="text-center max-w-3xl mx-auto">
  //         <p className="text-base">{technologies.subtitle}</p>
  //         {markdownify(
  //           technologies.title,
  //           "h2",
  //           "mt-2 text-4xl md:text-4xl tracking-wide bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent",
  //         )}
  //       </div>

  //       {/* Tech Grid */}
  //       <motion.div
  //         variants={containerVariants}
  //         initial="hidden"
  //         whileInView="show"
  //         viewport={{ once: true }}
  //         className="mt-10 grid gap-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
  //       >
  //         {technologies.list.map((tech, i) => {
  //           const Icon = iconMap[tech];

  //           return (
  //             <motion.div
  //               key={i}
  //               variants={itemVariants}
  //               whileHover={{ scale: 1.08 }}
  //               className="relative group"
  //             >
  //               {/* Glow Border */}
  //               <div
  //                 className="absolute -inset-1 rounded-2xl opacity-0
  //                     group-hover:opacity-100
  //                     transition duration-300
  //                     bg-primary/20 blur-md cursor-pointer"
  //               />

  //               {/* Card */}
  //               <motion.div
  //                 {...floatingAnimation}
  //                 className="relative flex flex-col items-center justify-center rounded-2xl bg-white/80 backdrop-blur-lg border border-slate-200 p-8 shadow-md transition-all duration-300"
  //               >
  //                 {Icon && (
  //                   <Icon
  //                     size={42}
  //                     className="text-primary transition-all duration-300 group-hover:text-purple-500"
  //                   />
  //                 )}

  //                 <span className="mt-3 text-base font-semibold text-slate-700 tracking-wide">
  //                   {tech}
  //                 </span>
  //               </motion.div>
  //             </motion.div>
  //           );
  //         })}
  //       </motion.div>
  //     </div>
  //   </section>
  // );
};

export default TechStack;
