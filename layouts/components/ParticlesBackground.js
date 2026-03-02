// "use client";
// import Particles, { initParticlesEngine } from "@tsparticles/react";
// import { useEffect, useMemo, useState } from "react";
// import { loadSlim } from "@tsparticles/slim";

// const ParticlesComponent = (props) => {
//   const [init, setInit] = useState(false);

//   useEffect(() => {
//     initParticlesEngine(async (engine) => {
//       await loadSlim(engine);
//     }).then(() => {
//       setInit(true);
//     });
//   }, []);

//   const options = useMemo(
//     () => ({
//       fullScreen: {
//         enable: false,
//       },
//       background: {
//         color: {
//           value: "#000",
//         },
//       },
//       fpsLimit: 90,
//       interactivity: {
//         events: {
//           onClick: {
//             enable: true,
//             mode: "repulse",
//           },
//           onHover: {
//             enable: true,
//             mode: "repulse",
//           },
//         },
//         modes: {
//           push: {
//             distance: 200,
//             duration: 15,
//           },
//           grab: {
//             distance: 150,
//           },
//         },
//       },
//       particles: {
//         color: {
//           value: "#FFFFFF",
//         },
//         links: {
//           color: "#FFFFFF",
//           distance: 150,
//           enable: true,
//           opacity: 0.5,
//           width: 1,
//         },
//         move: {
//           direction: "none",
//           enable: true,
//           outModes: {
//             default: "bounce",
//           },
//           random: true,
//           speed: 5,
//           straight: false,
//         },
//         number: {
//           density: {
//             enable: true,
//           },
//           value: 150,
//         },
//         opacity: {
//           value: 1.0,
//         },
//         shape: {
//           type: "circle",
//         },
//         size: {
//           value: { min: 1, max: 3 },
//         },
//       },
//       detectRetina: true,
//     }),
//     [],
//   );

//   return (
//     <div className="absolute h-screen inset-0">
//       <Particles id="tsparticles" options={options} />
//     </div>
//   );
// };

// export default ParticlesComponent;

"use client";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: {
        enable: false,
      },

      // remove black background
      background: {
        color: {
          value: "transparent",
        },
      },

      fpsLimit: 90,

      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          onClick: {
            enable: true,
            mode: "repulse",
          },
        },
        modes: {
          push: {
            distance: 200,
            duration: 15,
          },
          grab: {
            distance: 150,
          },
        },
      },

      particles: {
        color: {
          value: ["#24326A", "#fe6019"], // brand colors
        },

        links: {
          color: "#24326A",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },

        move: {
          enable: true,
          speed: 3,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "bounce",
          },
        },

        number: {
          density: {
            enable: true,
          },
          value: 100,
        },

        opacity: {
          value: 1,
        },

        shape: {
          type: "circle",
        },

        size: {
          value: { min: 1, max: 3 },
        },
      },

      detectRetina: true,
    }),
    [],
  );

  return (
    <div className="absolute inset-0 h-full w-full -z-10">
      {init && <Particles id="tsparticles" options={options} />}
    </div>
  );
};

export default ParticlesComponent;
