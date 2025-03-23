"use client";

import React from "react";
import { useEffect, useState } from "react";
import TopicsDropdown, { FaqSectionDemo } from "@/components/topicsDropdown";

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
      threshold: 0.2,
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
      <main className="py-20 relative">
        {/*Event Details */}
        <section className="bg-black py-5 relative overflow-hidden container mx-auto px-8 sm:px-6 lg:px-16">
          <div
            className={`flex flex-col mt-24 gap-10 transform transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
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
        </section>

        {/* Topics */}
        <section
          className="bg-black py-5 relative overflow-hidden"
          id="topics-section"
        >
          <div className="w-full h-full flex flex-col items-center">
            <div className="text-center text-xl mb-4 md:mb-8">Topics</div>
            <div className="w-full h-full">
              <TopicsDropdown />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
