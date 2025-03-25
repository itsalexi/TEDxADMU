"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import coreTeamData from "./coreTeamMembers.json";
import CoreTeamCard from "./CoreTeamCard";
import ParticlesBackground from "../ParticlesBackground";
import TeamPhotoSection from "@/components/TeamPhotoSection";
import { Typewriter } from "@/components/typeWriter";
import { TextShimmer } from "@/components/textShimmer";

const CoreTeamPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  console.log("CoreTeamPage rendered");

  // Mounting animations
  useEffect(() => {
    // Set a small timeout to ensure the animation triggers after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
      console.log("visible true");
    }, 100);

    // Set up intersection observer for scroll animations
    const observerOptions = {
      root: null, // viewport
      rootMargin: "0px",
      threshold: 0.01,
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
      <ParticlesBackground />

      <div className="relative z-10">
        {/*About TEDxAteneoDeManilaU */}
        <div
          className={`transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="grid md:grid-cols-2 mt-60 mx-8 gap-10 flex-col">
            <div className="text-4xl md:text-6xl">
              <h1 className="text-center font-bold text-[#eb0028]">
                About
                <p>
                  TEDx
                  <span className="text-white font-thin">AteneoDeManilaU</span>
                </p>
              </h1>
            </div>
            <section className="prose prose-lg mx-auto prose-invert">
              <p className="text-gray-300 leading-relaxed text-xl">
                Since 2024, TEDxAteneoDeManilaU has been under the Ateneo
                Management Association (AMA). The event continues to serve as a
                platform for innovative ideas, thought-provoking discussions,
                and inspiring stories from a diverse range of speakers. It
                brings together students, professionals, and changemakers who
                are passionate about driving positive impact in their
                communities. With each edition, TEDxAteneoDeManilaU fosters
                meaningful conversations that challenge perspectives, ignite
                curiosity, and encourage action toward a better future.
              </p>
            </section>
          </div>
        </div>
        {/* Group Photos */}
        <TeamPhotoSection />
        {/* Core Team Section */}
        <div className="relative pt-20">
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
            <div className="leadership-section text-center mb-2 opacity-0 translate-y-16 transform transition-all duration-1000 ease-out flex flex-col items-center">
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
                LABYRINTHINE <br /> CORE TEAM
              </h1>
              <p className="text-sm md:text-lg text-white">
                Meet the people who made this event possible.
              </p>
            </div>

            <div className="mx-8">
              {/* Leadership Team */}
              <div className="leadership-section flex flex-wrap justify-center gap-12 mt-20 w-full opacity-0 translate-y-16 transform transition-all duration-1000 ease-out">
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
                  <h2 className="text-5xl mb-6 font-bold text-black text-center w-full bg-gradient-to-r from-red-700 via-[#eb0028] to-orange-600 py-6 rounded-3xl shadow-lg shadow-red-900 transition-transform transform hover:scale-[1.02]">
                    {department.name}
                  </h2>
                  <div className="flex flex-wrap justify-center gap-12 mt-6">
                    {department.committees.map((committee) => (
                      <div
                        key={committee.name}
                        className="text-center md:max-w-[50vw]"
                      >
                        <div className="text-2xl font-semibold bg-gray-900 bg-opacity-70 text-white shadow-red-600 shadow-md transition-transform transform hover:scale-105 px-4 py-2 rounded-lg mb-6">
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
      </div>

      {/* WebDev Section */}
      <section id="webdev-section">
        <div>
          <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-48">
            <div className="whitespace-pre-wrap z-50 text-white">
              <span>{"Special thanks to our "}</span>
              <Typewriter
                text={[
                  "Website Development",
                  "GOAT",
                  "hard carry",
                  "insanely handsome",
                  "infinite aura",
                ]}
                speed={70}
                className="text-[#eb0028]"
                waitTime={1500}
                deleteSpeed={40}
                cursorChar={"_"}
              />
              <span>team</span>
            </div>
          </div>
          <TextShimmer
            duration={1.2}
            className="text-xl font-medium [--base-color:theme(colors.blue.600)] [--base-gradient-color:theme(colors.blue.200)] dark:[--base-color:theme(colors.blue.700)] dark:[--base-gradient-color:theme(colors.blue.400)]"
          >
            Alexi Roth Canamo
          </TextShimmer>
        </div>
      </section>
    </div>
  );
};

export default CoreTeamPage;
