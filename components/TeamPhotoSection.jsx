"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

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
      threshold: 0.35,
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

  const teamSections = [
    {
      id: "section1",
      title: "Collaboration & Creativity",
      description:
        "Our dedicated team of organizers brings together diverse perspectives and talents to create an unforgettable TEDx experience. Through collaborative brainstorming and creative problem-solving, we craft an event that challenges perspectives and inspires action.",
      image: "/team-collaboration.jpg",
      alt: "Team members collaborating on TEDx planning",
    },
    {
      id: "section2",
      title: "Passion & Purpose",
      description:
        "Driven by a shared passion for ideas worth spreading, our team works tirelessly behind the scenes to curate thought-provoking content and seamless experiences. Every member contributes their unique skills with purpose, ensuring that each TEDx event creates lasting impact.",
      image: "/team-planning.jpg",
      alt: "TEDx team planning session",
    },
    {
      id: "section3",
      title: "Community & Connection",
      description:
        "Beyond organizing events, we're building a community that values intellectual curiosity and meaningful connections. Our team fosters an environment where diverse ideas can flourish, bringing together speakers, attendees, and volunteers who share our vision for positive change.",
      image: "/team-event.jpg",
      alt: "TEDx team at the event",
    },
  ];

  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
          Meet Our Team
        </h2>

        <div className="space-y-32">
          {teamSections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } items-center gap-8 transform transition-all duration-1000 ease-out ${
                visibleSections[section.id]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <div className="w-full lg:w-1/2 space-y-6">
                <h3 className="text-2xl sm:text-4xl font-bold text-white relative inline-block">
                  {section.title}
                  <span
                    className={`absolute bottom-0 left-0 w-full h-1 bg-[#eb0028] transform origin-left transition-transform duration-1000 ease-out ${
                      visibleSections[section.id] ? "scale-x-100" : "scale-x-0"
                    }`}
                    style={{ transformOrigin: "left" }}
                  ></span>
                </h3>
                <p className="text-lg text-gray-300 leading-relaxed">
                  {section.description}
                </p>
              </div>

              <div className="w-full lg:w-1/2 h-[400px] relative rounded-md overflow-hidden shadow-lg shadow-red-900/20 border-2 border-[#eb0028] transform transition-all duration-500 hover:scale-[1.02]">
                <Image
                  src={section.image}
                  alt={section.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamPhotoSection;
