"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IS_SPEAKERS_ANNOUNCED } from "../app/config/config";
import speakers from "@/data/speakers.json";

export default function CircularSpeakersSection() {
  const [mounted, setMounted] = useState(false);
  const [speakerSectionVisible, setSpeakerSectionVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [expandedSpeakerIndex, setExpandedSpeakerIndex] = useState(null);

  useEffect(() => {
    setMounted(true);

    // Observer for speaker section
    const speakerSectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSpeakerSectionVisible(true);
          speakerSectionObserver.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.4,
      }
    );

    const speakerSection = document.getElementById("circular-speaker-section");

    if (speakerSection) speakerSectionObserver.observe(speakerSection);

    return () => {
      if (speakerSectionObserver) {
        speakerSectionObserver.disconnect();
      }
    };
  }, [mounted]);

  // Rotate the entire speaker container slowly
  useEffect(() => {
    if (!speakerSectionVisible || expandedSpeakerIndex !== null) return;

    const rotationInterval = setInterval(() => {
      setRotation((prev) => (prev + 0.1) % 360);
    }, 50);

    return () => clearInterval(rotationInterval);
  }, [speakerSectionVisible, expandedSpeakerIndex]);

  const getPositionStyles = (index, totalSpeakers, isMobile) => {
    // If this speaker is expanded
    if (expandedSpeakerIndex === index) {
      if (!isMobile) {
        return {
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%) scale(1.5)",
          zIndex: 100,
          transition: "all 0.5s ease-out",
          height: "auto", // Allow height to expand to fit content
          width: "800px", // Increased from 320px to 400px for more width
          maxHeight: "80vh", // Prevent it from growing too large
        };
      } else {
        return {
          transform: "scale(1.05)",
          zIndex: 100,
          transition: "all 0.5s ease-out",
          height: "auto", // Allow height to expand for mobile too
          width: "95%", // Make it take up most of the container width on mobile
          maxWidth: "400px", // But cap it at 400px for larger phones
        };
      }
    }

    // If any speaker is expanded but not this one, hide this one
    if (expandedSpeakerIndex !== null && expandedSpeakerIndex !== index) {
      return {
        opacity: 0,
        transform: "scale(0.8)",
        zIndex: 0,
        transition: "all 0.5s ease-out",
      };
    }

    // For desktop: circular layout with north, east, south, west positions
    if (!isMobile) {
      // Calculate angle for each position around the circle
      const angle = (index * (360 / totalSpeakers) + rotation) % 360;
      const radius = 250; // Increased radius from 180px to 250px for more spacing

      // Convert angle to radians and calculate position
      const radians = (angle * Math.PI) / 180;
      const x = Math.sin(radians) * radius;
      const y = -Math.cos(radians) * radius; // Negative because y-axis is inverted in CSS

      // Calculate center positions
      const centerX = 50; // Center X position in percentage
      const centerY = 50; // Center Y position in percentage

      return {
        left: `${centerX}%`,
        top: `${centerY}%`,
        transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
        zIndex: 10 + index,
        transition:
          "transform 0.3s ease-out, left 0.3s ease-out, top 0.3s ease-out",
      };
    }

    // For mobile: vertical stack with slight rotation
    return {
      transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
      marginBottom: "20px",
      transition: "all 0.3s ease-out",
    };
  };

  const handleSpeakerClick = (index) => {
    // Only allow click if speakers are announced
    if (IS_SPEAKERS_ANNOUNCED) {
      // Toggle expanded state
      setExpandedSpeakerIndex(expandedSpeakerIndex === index ? null : index);
    }
  };

  return (
    <section id="circular-speaker-section" className="py-20 bg-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-48 max-sm:mb-16 text-[#eb0028]">
          Our Speakers
          <p className="mt-2 text-lg italic font-normal text-gray-400">
            Click the cards for more info
          </p>
        </h2>

        {/* Desktop version - circular layout */}
        <div className="hidden md:block">
          <div className="relative w-full h-[600px] mb-16 flex items-center justify-center">
            <div
              className="relative w-[500px] h-[500px] transition-all duration-1000"
              style={{
                opacity: speakerSectionVisible ? 1 : 0,
                transform: speakerSectionVisible ? "scale(1)" : "scale(0.8)",
              }}
            >
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className={`absolute bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 transition-all duration-500 shadow-lg ${
                    IS_SPEAKERS_ANNOUNCED ? "cursor-pointer" : ""
                  } ${
                    expandedSpeakerIndex === index
                      ? "overflow-y-auto"
                      : "h-96 w-72 overflow-hidden"
                  }`}
                  style={getPositionStyles(index, speakers.length, false)}
                  onClick={() => handleSpeakerClick(index)}
                >
                  <div
                    className={`w-full flex flex-col rounded-md ${
                      expandedSpeakerIndex === index ? "" : "h-full"
                    }`}
                  >
                    <div
                      className={`relative w-full overflow-hidden rounded-t-md ${
                        IS_SPEAKERS_ANNOUNCED && expandedSpeakerIndex !== index
                          ? "h-60"
                          : "h-0"
                      }`}
                    >
                      {IS_SPEAKERS_ANNOUNCED &&
                      expandedSpeakerIndex !== index ? (
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="text-gray-500 relative h-40 w-full overflow-hidden rounded-t-md bg-gray-800 text-4xl opacity-30 flex items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex-1 flex flex-col">
                      <h3 className="text-lg font-semibold mb-2 text-white">
                        {IS_SPEAKERS_ANNOUNCED ? speaker.name : "Coming Soon"}
                      </h3>

                      {IS_SPEAKERS_ANNOUNCED ? (
                        expandedSpeakerIndex === index ? (
                          <div className="flex-1">
                            {/* Change layout to horizontal when expanded */}
                            <div className="flex flex-col lg:flex-row">
                              {/* Image container on the left */}
                              <div className="lg:w-2/5 mb-4 lg:mb-0 lg:mr-4">
                                <div className="relative h-60 w-full rounded-md overflow-hidden">
                                  <Image
                                    src={speaker.image}
                                    alt={speaker.name}
                                    fill
                                    className="object-cover object-top"
                                  />
                                </div>
                              </div>
                              {/* Text content on the right */}
                              <div className="lg:w-3/5">
                                {speaker.bioLong.map((paragraph, i) => (
                                  <p
                                    key={i}
                                    className="text-gray-200 text-sm mb-4"
                                  >
                                    {paragraph}
                                  </p>
                                ))}
                              </div>
                            </div>

                            <div className="mt-4 text-center">
                              <button
                                className="text-xs text-white bg-red-600 px-3 py-1 rounded-full hover:bg-red-700 transition-colors"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setExpandedSpeakerIndex(null);
                                }}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="text-gray-400 text-md">
                              {speaker.bio}
                            </p>
                            <p className="mt-2 text-sm italic font-normal text-gray-400">
                              Click the cards for more info
                            </p>
                          </div>
                        )
                      ) : (
                        <p className="text-gray-400 text-sm">
                          Speaker details will be revealed soon
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile version - vertical stack with click to expand */}
        <div className="md:hidden space-y-0 max-w-sm mx-auto">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className={`relative mx-auto w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 shadow-lg transition-all duration-300 ${
                IS_SPEAKERS_ANNOUNCED ? "cursor-pointer" : ""
              }`}
              style={getPositionStyles(index, speakers.length, true)}
              onClick={() => handleSpeakerClick(index)}
            >
              <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                {IS_SPEAKERS_ANNOUNCED ? (
                  <Image
                    src={speaker.image}
                    alt={speaker.name}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="text-gray-500 relative h-40 w-full overflow-hidden rounded-t-md bg-gray-800 text-4xl opacity-30 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  {IS_SPEAKERS_ANNOUNCED ? speaker.name : "Coming Soon"}
                </h3>

                {IS_SPEAKERS_ANNOUNCED ? (
                  expandedSpeakerIndex === index ? (
                    <div>
                      <p className="text-gray-200 mb-3">{speaker.bio}</p>
                      {speaker.bioLong.map((paragraph, i) => (
                        <p key={i} className="text-gray-200 text-sm mb-4">
                          {paragraph}
                        </p>
                      ))}
                      <div className="text-center">
                        <button
                          className="text-white bg-red-600 px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedSpeakerIndex(null);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-400 text-md">{speaker.bio}</p>
                      <p className="mt-2 text-sm italic font-normal text-gray-400">
                        Click the cards for more info
                      </p>
                    </div>
                  )
                ) : (
                  <p className="text-gray-400 text-sm">
                    Speaker details will be revealed soon
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
