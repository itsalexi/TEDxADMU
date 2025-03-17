"use client";

import React from "react";
import Image from "next/image";
import coreTeamData from "./coreTeamMembers.json";
import CoreTeamCard from "./CoreTeamCard";
import { useState, useEffect } from "react";

const CoreTeamPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set a small timeout to ensure the animation triggers after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 400);

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
    document.querySelectorAll(".leadership-section").forEach((section) => {
      observer.observe(section);
    });

    // Observe department sections
    document.querySelectorAll(".department-section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      <div
        className={`min-h-screen transition-opacity duration-1000 ease-out ${
          isVisible ? "opacity-100" : "opacity-0"
        } bg-fixed bg-cover`}
        style={{
          background: "url(/starry-background-dense.svg)",
          backgroundSize: "contain",
          backgroundAttachment: "fixed",
        }}
      >
        {/* Core Team Section */}
        <div className="relative pt-56">
          {/* Background Image - Sticky within the Section */}
          <div className="absolute top-[45rem] left-0 w-full h-5/6 place-items-center">
            <div className="sticky top-80 w-full h-32">
              <Image
                src="/coreteam-bg3.png"
                alt="Core Team Background"
                fill
                objectFit="contain"
                className="opacity-70"
                priority
              />
            </div>
          </div>

          {/* Core Team Members */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Core Team Header */}
            <div
              className={`text-center mb-10 transform transition-all duration-1000 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-16"
              }`}
            >
              <h2 className="text-3xl md:text-5xl text-white font-light">
                Meet the
              </h2>
              <h1 className="text-4xl md:text-6xl text-center font-bold text-red-500">
                TEDx
                <span className="text-white font-thin">AteneoDeManilaU</span>
              </h1>
              <h1 className="text-4xl md:text-7xl font-bold text-red-500 mb-4">
                Core Team
              </h1>
              <p className="text-lg text-white">
                Meet the people who made this event possible.
              </p>
            </div>

            <div className="mx-8">
              {/* Leadership Team */}
              <div className="leadership-section flex flex-wrap justify-center gap-12 mt-40 w-full opacity-0 translate-y-16 transform transition-all duration-1000 ease-out">
                {coreTeamData.leadershipTeam.map((category) => (
                  <div
                    key={category.category}
                    className="flex flex-col items-center mb-10"
                  >
                    <h2 className="text-4xl font-bold text-white text-center">
                      {category.category}
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                      {category.members.map((member) => (
                        <CoreTeamCard
                          key={member.name}
                          name={member.name}
                          image={member.image}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Core Team */}
              {coreTeamData.coreTeam.map((department) => (
                <div
                  key={department.name}
                  className="department-section flex flex-col items-center mb-10 w-full opacity-0 translate-y-16 transform transition-all duration-1000 ease-out"
                >
                  <h2 className="text-5xl mb-6 font-bold text-center w-full bg-gradient-to-r from-rose-700 via-red-500 to-orange-600 py-6 rounded-3xl shadow-lg shadow-red-900 transition-transform transform hover:scale-[1.02]">
                    {department.name}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 mt-6">
                    {department.committees.map((committee) => (
                      <div
                        key={committee.name}
                        className="text-center md:max-w-[50vw]"
                      >
                        <div className="text-2xl font-semibold bg-gray-900 bg-opacity-70 text-white shadow-red-300 shadow-md transition-transform transform hover:scale-105 px-4 py-2 rounded-lg mb-6">
                          {committee.name}
                        </div>
                        <div className="flex flex-wrap justify-center gap-6 mt-4">
                          {/* Heads */}
                          {committee.heads.map((head) => (
                            <CoreTeamCard
                              key={head.name}
                              name={head.name}
                              image={head.image}
                              role="Head"
                            />
                          ))}
                          {/* Deputies */}
                          {committee.deputies.map((deputy) => (
                            <CoreTeamCard
                              key={deputy.name}
                              name={deputy.name}
                              image={deputy.image}
                              role="Deputy"
                            />
                          ))}
                          {/* Associates */}
                          {committee.associates.map((associate) => (
                            <CoreTeamCard
                              key={associate.name}
                              name={associate.name}
                              image={associate.image}
                              role="Associate"
                            />
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/*About TEDxAteneoDeManilaU */}
        <div>
          <div className="flex xl:flex-row mt-40 mx-8 gap-10 flex-col">
            <h1 className="text-4xl md:text-6xl text-center font-bold text-red-500">
              About TEDx
              <span className="text-white font-thin">AteneoDeManilaU</span>
            </h1>
            <section className="prose prose-lg mx-auto prose-invert border-l-2 pl-2">
              <p className="text-gray-300 leading-relaxed text-xl">
                Since 2024, TEDxAteneoDeManilaU has been under the Ateneo
                Management Association (AMA). Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </p>
            </section>
          </div>
        </div>
        {/* Group Photos */}

        <div className="w-full text-white">Group Photos</div>
      </div>
    </div>
  );
};

export default CoreTeamPage;
