"use client";

import React from "react";
import { useEffect, useState } from "react";
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
        <section className="bg-black py-5 relative container mx-auto px-8 sm:px-6 lg:px-16 flex flex-col">
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
            <div className="relative w-full max-w-2xl h-80">
              <Image
                src="/ingress.png"
                alt="TEDx Event"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative w-full max-w-2xl h-80">
              <Image
                src="/egress.png"
                alt="TEDx Event"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative w-full max-w-2xl h-80">
              <Image
                src="/emergency exits.png"
                alt="TEDx Event"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="relative w-full max-w-2xl h-80">
              <Image
                src="/traffic.png"
                alt="TEDx Event"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
          <div className="text-center text-4xl mt-24">
            Instructions, Reminders, etc here
          </div>
        </section>

        {/* Topics */}
        <section
          className="bg-black py-5 relative overflow-hidden pt-40" // Added pt-20 for extra padding at top
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
