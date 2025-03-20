"use client";

import React from "react";
import { useEffect, useState } from "react";
import ParticlesBackground from "../ParticlesBackground";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Set a small timeout to ensure the animation triggers after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log("visible true");
    }, 300);

    // Set up intersection observer for scroll animations
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.2, // 15% of the element needs to be visible
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add visible class to the element
          entry.target.classList.remove("opacity-0", "translate-y-16");
          entry.target.classList.add("opacity-100", "translate-y-0");

          // Stop observing once animation is triggered
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    // Observe leadership team sections
    document.querySelectorAll(".about-section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticlesBackground />
      <main className="container mx-auto px-8 sm:px-6 lg:px-16 py-20 relative">
        {/*About TEDxAteneoDeManilaU */}
        <div
          className={`flex flex-col mt-24 gap-10 transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <h1 className="text-2xl sm:text-3xl md:text-6xl text-center font-bold text-[#eb0028]">
            About{" "}
            <p>
              TEDx
              <span className="text-white font-thin">AteneoDeManilaU</span>
            </p>
            <p>Event Details</p>
            <p>Labyrinthine</p>
          </h1>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
