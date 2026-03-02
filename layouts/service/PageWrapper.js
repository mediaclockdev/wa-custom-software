// "use client";

// import { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollSmoother } from "gsap/ScrollSmoother";

// gsap.registerPlugin(ScrollSmoother);

// export default function PageWrapper({ children }) {
//   useEffect(() => {
//     ScrollSmoother.create({
//       wrapper: "#smooth-wrapper",
//       content: "#smooth-content",
//       smooth: 1.2,
//       effects: true,
//     });
//   }, []);

//   return (
//     <div id="smooth-wrapper" style={{ height: "100%" }}>
//       <div id="smooth-content">{children}</div>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// IMPORTANT: Register BOTH
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function PageWrapper({ children }) {
  useEffect(() => {
    // Prevent duplicate instances (Next.js strict mode)
    if (ScrollSmoother.get()) return;

    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.2,
      effects: true,
    });

    return () => smoother.kill();
  }, []);

  return (
    <div id="smooth-wrapper" style={{ height: "100%" }}>
      <div id="smooth-content">{children}</div>
    </div>
  );
}
