"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IS_SPEAKERS_ANNOUNCED } from "../app/config/config";

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

  const speakers = [
    {
      name: "Dr. Maria Santos",
      bio: "Cognitive Neuroscientist exploring the depths of human consciousness",
      image: "/api/placeholder/300/300",
      position: "north",
      details:
        "Dr. Santos has conducted groundbreaking research on neural plasticity and consciousness, with over 50 publications in leading scientific journals. Her TED talk will explore the frontiers of human perception and how we navigate the labyrinths of our own minds.",
    },
    {
      name: "Architect Juan Reyes",
      bio: "Sustainable urban designer creating spaces that heal communities",
      image: "/api/placeholder/300/300",
      position: "east",
      details:
        "Juan Reyes has transformed urban spaces across South America, implementing biophilic design principles that bring nature into cities. His award-winning structures serve as both functional spaces and psychological sanctuaries, guiding people through mindful journeys in the concrete jungle.",
    },
    {
      name: "Innovator Ana Cruz",
      bio: "Tech entrepreneur bridging digital divides in underserved regions",
      image: "/api/placeholder/300/300",
      position: "south",
      details:
        "Ana Cruz founded ConnectAll, a social enterprise that has brought internet access to over 200 remote communities. Her innovative mesh network technology runs on renewable energy and has become a model for sustainable connectivity solutions worldwide.",
    },
    {
      name: "Prof. David Lee",
      bio: "Philosopher examining the ethical labyrinths of emerging technologies",
      image: "/api/placeholder/300/300",
      position: "west",
      details:
        "Professor Lee combines Eastern and Western philosophical traditions to create new ethical frameworks for AI development and implementation. His work with major tech companies has influenced responsible design practices and policy recommendations for the ethical deployment of autonomous systems.",
    },
  ];

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
          width: "320px", // Wider to accommodate more content
          maxHeight: "80vh", // Prevent it from growing too large
        };
      } else {
        return {
          transform: "scale(1.05)",
          zIndex: 100,
          transition: "all 0.5s ease-out",
          height: "auto", // Allow height to expand for mobile too
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
      const radius = 180; // radius of the circle in pixels

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
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
          Our Speakers
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
                      : "h-64 w-56 overflow-hidden"
                  }`}
                  style={getPositionStyles(index, speakers.length, false)}
                  onClick={() => handleSpeakerClick(index)}
                >
                  <div
                    className={`w-full flex flex-col rounded-md ${
                      expandedSpeakerIndex === index ? "" : "h-full"
                    }`}
                  >
                    <div className="relative h-32 w-full overflow-hidden rounded-t-md">
                      {IS_SPEAKERS_ANNOUNCED ? (
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          fill
                          className="object-cover"
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
                            <p className="text-gray-200 text-sm mb-4">
                              {speaker.bio}
                            </p>
                            <p className="text-gray-300 text-sm mb-4">
                              {speaker.details}
                            </p>
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
                          <p className="text-gray-400 text-sm line-clamp-2">
                            {speaker.bio}
                          </p>
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
                    className="object-cover"
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
                      <p className="text-gray-300 text-sm mb-4">
                        {speaker.details}
                      </p>
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
                    <p className="text-gray-400">{speaker.bio}</p>
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
