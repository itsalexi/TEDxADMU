"use client";
import React, { useState, useEffect, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = React.memo(() => {
  const [init, setInit] = useState(false);

  // Initialize tsParticles
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
      console.log("Particles initialized");
    });
  }, []);

  const particlesOptions = useMemo(
    () => ({
      background: {
        color: {
          value: "#000000",
        },
      },
      fpsLimit: 60,
      interactivity: {
        events: {
          onClick: {
            enable: true,
            mode: "push",
          },
          onHover: {
            enable: true,
            mode: "repulse",
            distance: 100,
          },
        },
        modes: {
          push: {
            quantity: 5,
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: ["#ffffff", "#f53333"],
        },
        links: {
          color: "#ffffff",
          distance: 150,
          enable: false,
          opacity: 0.5, 
          width: 0.2, 
        },
        collisions: {
          enable: false,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "out",
          },
          random: true,
          speed: 0.8, // movement for stars
          straight: false,
        },
        number: {
          density: {
            enable: true,
            area: 800,
          },
          value: 200, // density
        },
        opacity: {
          value: {
            min: 0.1,
            max: 0.9, // Some stars brighter than others
          },
          animation: {
            enable: true,
            speed: 0.3, // Slow twinkling effect
            minimumValue: 0.1,
            sync: false,
          },
        },
        shape: {
          type: "star",
        },
        size: {
          value: {
            min: 1,
            max: 3, // Varied sizes for different star brightness
          },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.1,
            sync: false,
          },
        },
        twinkle: {
          particles: {
            enable: true,
            frequency: 0.05,
            opacity: 1,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  const particlesLoaded = (container) => {
    console.log("Particles container loaded", container);
  };

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0">
      <Particles
        id="tsparticles"
        particlesLoaded={particlesLoaded}
        options={particlesOptions}
        className="h-full w-full"
      />
    </div>
  );
});

// Add display name for React DevTools
ParticlesBackground.displayName = "ParticlesBackground";

export default ParticlesBackground;
