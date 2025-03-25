"use client";

import React, { useEffect, useState } from "react";
import TopicsDropdown from "@/components/topicsDropdown";
import Image from "next/image";
import CircularSpeakersSection from "@/components/CircularSpeakersSection";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});

  const imageTitles = {
    "ingress.webp": "Ingress",
    "egress.webp": "Egress",
    "emergency exits.webp": "Emergency Exits",
    "traffic.webp": "Traffic",
    "prohibited1.webp": "Prohibited Items 1",
    "prohibited2.webp": "Prohibited Items 2",
    "health-guidelines.webp": "Health Guidelines 1",
    "health-guidelines2.webp": "Health Guidelines 2",
    "health-guidelines3.webp": "Health Guidelines 3",
  };

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  useEffect(() => {
    // Set Topics section (top of page) to visible after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
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

    // Only use observer for the about section
    document.querySelectorAll(".about-section").forEach((section) => {
      section.classList.add("opacity-0", "translate-y-16");
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
        {/* Topics */}
        <section
          className="bg-black py-5 relative overflow-hidden pt-32"
          id="topics-section"
        >
          <div className="w-full h-full flex flex-col items-center">
            <div
              className={`transform transition-all duration-1000 ease-out flex flex-col items-center ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
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
            <div
              className={`w-full h-full mt-12 transform transition-all duration-1000 ease-out delay-200 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <TopicsDropdown />
            </div>
          </div>
        </section>

        {/* Speakers Section - Circular Layout */}
        <CircularSpeakersSection />

        {/* Event Details */}
        <section className="about-section bg-black py-5 relative container mx-auto px-8 sm:px-6 lg:px-16 flex flex-col transition-all duration-1000 ease-out">
          <div className="flex flex-col mt-24 gap-10">
            <h1 className="text-2xl sm:text-3xl md:text-6xl text-center font-bold text-[#eb0028]">
              <p>Labyrinthine</p>
              <p>Event Details</p>
            </h1>
          </div>

          {/* Event Information */}
          <div className="max-w-2xl mx-auto mt-12 mb-16 bg-white/5 p-8 rounded-lg border border-white/10">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#eb0028]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white">Date</h3>
                  <p className="text-gray-300">April 30, 2025 (Wednesday)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#eb0028]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white">Venue</h3>
                  <p className="text-gray-300">Leong Hall</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#eb0028]" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="text-lg font-semibold text-white">Time</h3>
                  <p className="text-gray-300">1:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Image gallery - vertically stacked */}
          <div className="flex flex-col gap-8 mt-12 items-center w-full">
            {[
              "ingress.webp",
              "egress.webp",
              "emergency exits.webp",
              "traffic.webp",
              "prohibited1.webp",
              "prohibited2.webp",
              "health-guidelines.webp",
              "health-guidelines2.webp",
              "health-guidelines3.webp",
            ].map((src, index) => (
              <div key={index} className="w-full max-w-2xl">
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={`/${src}`}
                    alt={imageTitles[src] || "Event detail image"}
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
