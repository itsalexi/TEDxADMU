"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import InfiniteImageScroll from "./InfiniteImageScroll";

const TeamPhotoSection = () => {
  const [visibleSections, setVisibleSections] = useState({
    section1: false,
    section2: false,
    section3: false,
  });

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [entry.target.id]: true,
          }));
          sectionObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    ["section1", "section2", "section3"].forEach((id) => {
      const element = document.getElementById(id);
      if (element) sectionObserver.observe(element);
    });

    return () => {
      sectionObserver.disconnect();
    };
  }, []);

  const images = [
    {
      src: "/meeting1.webp",
      alt: "TEDx organizers collaborating",
    },
    {
      src: "/zoom1.webp",
      alt: "Team planning session",
    },
    {
      src: "/meeting2.webp",
      alt: "TEDx team members",
    },
    {
      src: "/zoom2.webp",
      alt: "Brainstorming ideas",
    },
    {
      src: "/meeting3.webp",
      alt: "TEDx team at event",
    },
    {
      src: "/zoom3.webp",
      alt: "Preparing for talks",
    },
    {
      src: "/meeting4.webp",
      alt: "Team building activities",
    },
    {
      src: "/zoom4.webp",
      alt: "Organizing logistics",
    },
    {
      src: "/meeting5.webp",
      alt: "TEDx volunteers",
    },
    {
      src: "/2ctm.webp",
      alt: "Behind the scenes",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16 md:space-y-32">
          {/* Section 1 */}
          <div
            id="section1"
            className={`flex flex-col lg:flex-row items-center gap-8 transform transition-all duration-1000 ease-out ${
              visibleSections.section1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-bold text-white relative inline-block">
                Collaboration & Creativity
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#eb0028] transform origin-left transition-transform duration-1000 ease-out ${
                    visibleSections.section1 ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transformOrigin: "left" }}
                ></span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our dedicated team of organizers brings together diverse
                perspectives and talents to create an unforgettable TEDx
                experience. Through collaborative brainstorming and creative
                problem-solving, we craft an event that challenges perspectives
                and inspires action.
              </p>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] relative rounded-md overflow-hidden shadow-lg shadow-red-900/20 border-2 border-[#eb0028] transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src="/1ctm.webp"
                alt="Team members collaborating on TEDx planning"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
            </div>
          </div>

          <InfiniteImageScroll images={images} />

          {/* Section 2 */}
          <div
            id="section2"
            className={`flex flex-col lg:flex-row-reverse items-center gap-8 transform transition-all duration-1000 ease-out ${
              visibleSections.section2
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-bold text-white relative inline-block">
                Passion & Purpose
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#eb0028] transform origin-left transition-transform duration-1000 ease-out ${
                    visibleSections.section2 ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transformOrigin: "left" }}
                ></span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Driven by a shared passion for ideas worth spreading, our team
                works tirelessly behind the scenes to curate thought-provoking
                content and seamless experiences. Every member contributes their
                unique skills with purpose, ensuring that each TEDx event
                creates lasting impact.
              </p>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] relative grid grid-cols-2 gap-2">
              {/* Image 1 */}
              <div className="relative overflow-hidden rounded-md shadow-lg shadow-red-900/20 border border-[#eb0028] transition-all duration-300 hover:scale-[1.05] hover:rotate-1 z-10">
                <Image
                  src="/meeting1.webp"
                  alt="TEDx team planning session 1"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
              </div>

              {/* Image 2 */}
              <div className="relative overflow-hidden rounded-md shadow-lg shadow-red-900/20 border border-[#eb0028] transition-all duration-300 hover:scale-[1.05] hover:rotate-1 z-10">
                <Image
                  src="/meeting2.webp"
                  alt="TEDx team planning session 2"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
              </div>

              {/* Image 3 */}
              <div className="relative overflow-hidden rounded-md shadow-lg shadow-red-900/20 border border-[#eb0028] transition-all duration-300 hover:scale-[1.05] hover:rotate-1 z-10">
                <Image
                  src="/meeting3.webp"
                  alt="TEDx team planning session 3"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
              </div>

              {/* Image 4 */}
              <div className="relative overflow-hidden rounded-md shadow-lg shadow-red-900/20 border border-[#eb0028] transition-all duration-300 hover:scale-[1.05] hover:rotate-1 z-10">
                <Image
                  src="/meeting4.webp"
                  alt="TEDx team planning session 4"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div
            id="section3"
            className={`flex flex-col lg:flex-row items-center gap-8 transform transition-all duration-1000 ease-out ${
              visibleSections.section3
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
          >
            <div className="w-full lg:w-1/2 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-bold text-white relative inline-block">
                Community & Connection
                <span
                  className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#eb0028] transform origin-left transition-transform duration-1000 ease-out ${
                    visibleSections.section3 ? "scale-x-100" : "scale-x-0"
                  }`}
                  style={{ transformOrigin: "left" }}
                ></span>
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                Beyond organizing events, we're building a community that values
                intellectual curiosity and meaningful connections. Our team
                fosters an environment where diverse ideas can flourish,
                bringing together speakers, attendees, and volunteers who share
                our vision for positive change.
              </p>
            </div>

            <div className="w-full lg:w-1/2 h-[400px] relative rounded-md overflow-hidden shadow-lg shadow-red-900/20 border-2 border-[#eb0028] transform transition-all duration-500 hover:scale-[1.02]">
              <Image
                src="/2ctm.webp"
                alt="TEDx team at the event"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamPhotoSection;
