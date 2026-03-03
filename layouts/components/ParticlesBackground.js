

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
          opacity: 0.25,
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
          value: 90,
        },

        opacity: {
          value: 0.7,
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
    <div className="absolute inset-0 min-h-dvh w-full -z-10">
      {init && <Particles id="tsparticles" options={options} />}
    </div>
  );
};

export default ParticlesComponent;
