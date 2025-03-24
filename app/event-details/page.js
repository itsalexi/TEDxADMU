"use client";

import React, { useEffect, useState } from "react";
import TopicsDropdown from "@/components/topicsDropdown";
import Image from "next/image";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log("visible true");
    }, 300);

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-16");
          entry.target.classList.add("opacity-100", "translate-y-0");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    document
      .querySelectorAll(".about-section, .topics-header, .topics-dropdown")
      .forEach((section) => {
        section.classList.add("opacity-0", "translate-y-16"); // Ensure initial state
        observer.observe(section);
      });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <main className="py-20 relative">
        {/* Event Details */}
        <section className="about-section bg-black py-5 relative container mx-auto px-8 sm:px-6 lg:px-16 flex flex-col transition-all duration-1000 ease-out">
          <div
            className={`flex flex-col mt-24 gap-10 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <h1 className="text-2xl sm:text-3xl md:text-6xl text-center font-bold text-[#eb0028]">
              <p>Labyrinthine</p>
              <p>Event Details</p>
            </h1>
          </div>

          {/* Image gallery - vertically stacked */}
          <div className="flex flex-col gap-8 mt-12 items-center">
            {[
              "ingress.png",
              "egress.png",
              "emergency exits.png",
              "traffic.png",
            ].map((src, index) => (
              <div key={index} className="relative w-full max-w-2xl h-80">
                <Image
                  src={`/${src}`}
                  alt="TEDx Event"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
          </div>
          <div className="text-center text-4xl mt-24">
            Instructions, Reminders, etc here
          </div>
        </section>

        {/* Topics */}
        <section
          className="bg-black py-5 relative overflow-hidden pt-40"
          id="topics-section"
        >
          <div className="w-full h-full flex flex-col items-center">
            <div className="topics-header transform transition-all duration-1000 ease-out flex flex-col items-center">
              <div className="w-32 sm:w-40 md:w-48 lg:w-56 mb-4 sm:mb-6">
                <Image
                  src="/tedx-logo.png"
                  alt="TEDx"
                  width={220}
                  height={70}
                  className="w-full h-auto"
                  priority
                />
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white text-center tracking-wider mb-12 sm:mb-4">
                LABYRINTHINE <br /> TOPICS
              </h1>
            </div>
            <div className="topics-dropdown w-full h-full mt-12 transform transition-all duration-1000 ease-out">
              <TopicsDropdown />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
