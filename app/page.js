"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import TrippyScroll from "@/components/TrippyScroll";
import AnimatedEventDescription from "@/components/animatedEventDesc";
import CurvedLineAnimation from "@/components/animatedCurvedLine";
import MazeBackground from "@/components/MazeBackground";
import AnimatedTeamDescription from "@/components/animatedTeamDecsription";
import TextLoadingScreen from "@/components/TextLoadingScreen";
import { GlareGrid } from "@/components/glareGrid";
import TedxSection from "@/components/tedxSection";
import OrganizersSection from "@/components/meetOrganizers";
import IS_SPEAKERS_ANNOUNCED from "./config/config";
import speakers from '@/data/speakers.json';


export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [subtitleLoaded, setSubtitleLoaded] = useState(false);
  const [buttonLoaded, setButtonLoaded] = useState(false);
  const [showSpread, setShowSpread] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [speakerSectionVisible, setSpeakerSectionVisible] = useState(false);
  const [visibleSections, setVisibleSections] = useState({});
  const [headingHighlights, setHeadingHighlights] = useState({});

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let isInBarrier = false;
    const MAX_SCROLL_SPEED = 12; // Maximum allowed scroll speed
    const DECELERATION_FACTOR = 0.1; // Dividing factor to slow down scroll (less than 1)
    let isMobileView = window.innerWidth < 768; // Check for mobile/small screen

    // Function to update mobile view status
    const updateViewportCheck = () => {
      isMobileView = window.innerWidth < 768;
    };

    const handleScroll = (e) => {
      // Only apply scroll barrier on mobile screens
      if (!isMobileView) return;

      const barrierSection = document.querySelector(".scroll-barrier");
      if (!barrierSection) return;

      const barrierStart = barrierSection.offsetTop;
      const barrierEnd = barrierStart + barrierSection.offsetHeight;
      const currentScrollY = window.scrollY;
      const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
      const isScrollingDown = currentScrollY > lastScrollY;

      // Check if we're within the barrier section
      if (
        currentScrollY >= barrierStart - 1500 &&
        currentScrollY <= barrierEnd + 100
      ) {
        // Only apply deceleration when scrolling downward and exceeding max speed
        if (isScrollingDown && scrollSpeed > MAX_SCROLL_SPEED) {
          // Calculate the reduced scroll position
          const reducedScrollSpeed = scrollSpeed * DECELERATION_FACTOR; // Slow down by applying factor

          // Adjust scroll position to slow down
          window.scrollTo({
            top: lastScrollY + reducedScrollSpeed, // Only positive direction since we know we're scrolling down
            behavior: "auto", // Using 'auto' instead of 'smooth' for more precise control
          });

          // Prevent default to stop normal scrolling
          if (e && e.preventDefault) {
            e.preventDefault();
          }

          isInBarrier = true;
        } else {
          // For upward scrolling, we don't interfere
          isInBarrier = false;
        }
      } else {
        isInBarrier = false;
      }

      // Update last scroll position
      // For downward scrolling in barrier, only update if speed is acceptable
      // For upward scrolling or outside barrier, always update
      if (!isInBarrier || !isScrollingDown || scrollSpeed <= MAX_SCROLL_SPEED) {
        lastScrollY = currentScrollY;
      }
    };

    // Add resize listener to update mobile check
    window.addEventListener("resize", updateViewportCheck);

    // Use passive: false to enable preventDefault in the handler
    window.addEventListener("scroll", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("resize", updateViewportCheck);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setMounted(true);

    if (!isLoading) {
      const logoTimer = setTimeout(() => setLogoLoaded(true), 900);
      const titleTimer = setTimeout(() => setTitleLoaded(true), 600);
      const subtitleTimer = setTimeout(() => setSubtitleLoaded(true), 300);
      const buttonTimer = setTimeout(() => setButtonLoaded(true), 200);

      return () => {
        clearTimeout(logoTimer);
        clearTimeout(titleTimer);
        clearTimeout(subtitleTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [isLoading]);

  useEffect(() => {
    if (!mounted || isLoading) return;

    // Observer for speaker section with higher threshold to detect when further into the section
    const speakerSectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setSpeakerSectionVisible(true);
          setTimeout(() => {
            setShowSpread(true);
          }, 800); // Small delay for better visual effect after scrolling
          speakerSectionObserver.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.6, // Trigger when 60% of the element is visible
      }
    );

    const speakerSection = document.getElementById("speaker-section");

    if (speakerSection) speakerSectionObserver.observe(speakerSection);

    // Generic observer for sections that need visibility tracking
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setVisibleSections((prev) => ({
              ...prev,
              [sectionId]: true,
            }));
            sectionObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    // Observe sections that need visibility tracking
    const sectionsToObserve = ["tedx-section", "organizers-section"];
    sectionsToObserve.forEach((id) => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });

    return () => {
      speakerSectionObserver.disconnect();
      sectionObserver.disconnect();
    };
  }, [mounted, isLoading]);

  useEffect(() => {
    // Trigger heading highlight animation with delay after section becomes visible
    Object.entries(visibleSections).forEach(([sectionId, isVisible]) => {
      if (isVisible && !headingHighlights[sectionId]) {
        const timer = setTimeout(() => {
          setHeadingHighlights((prev) => ({
            ...prev,
            [sectionId]: true,
          }));
        }, 200);

        return () => clearTimeout(timer);
      }
    });
  }, [visibleSections, headingHighlights]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  

  return (
    <div className="min-h-screen bg-black text-white">
      {isLoading && <TextLoadingScreen onLoadComplete={handleLoadComplete} />}

      <main>
        <section
          id="hero-section"
          className="relative h-screen flex items-center justify-center overflow-hidden pt-16"
        >
          <MazeBackground />

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-4xl">
              <div className="text-center flex flex-col items-center">
                <div
                  className={`w-32 sm:w-40 md:w-48 lg:w-56 mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                    logoLoaded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  <Image
                    src="/tedx-logo.png"
                    alt="TEDx"
                    width={220}
                    height={70}
                    className="w-full h-auto"
                    onLoad={() => setLogoLoaded(true)}
                    priority
                  />
                </div>

                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider mb-2 sm:mb-4`}
                >
                  LABYRINTHINE
                </h1>

                <p
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 font-normal px-4 transition-all duration-1000 ease-out ${
                    subtitleLoaded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  Unlocking Paths, Inspiring Change
                </p>

                <div
                  className={`text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 font-normal px-4 transition-all duration-1000 ease-out ${
                    subtitleLoaded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  April 30, 2025 (Wednesday) • Leong Hall • 1-4 PM
                </div>

                <div
                  className={`transition-all duration-1000 ease-out ${
                    buttonLoaded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-10"
                  }`}
                >
                  <Link href="/register">
                    <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                      Register Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#161616]">
          <TrippyScroll />
          {/* Scroll barrier positioned absolutely to avoid creating gaps */}
          <div
            className="scroll-barrier absolute w-full h-6 opacity-0 pointer-events-none"
            aria-hidden="true"
          ></div>
        </section>

        <section
          id="first-spline-section"
          className="bg-black py-20 relative overflow-hidden"
        >
          <div className="container mx-auto flex flex-col relative z-10 max-w-[1200px]">
            <div className="flex-1 pr-4 pl-4 md:pl-0">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-10 lg:mb-0">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-[#eb0028]">
                    What Awaits You at <br /> TEDxAteneodeManilaU: Labyrinthine?
                  </h2>
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>April 30, 2025 (Wednesday)</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>Leong Hall</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span>1:00 PM - 4:00 PM</span>
                    </div>
                  </div>
                  <AnimatedEventDescription />
                </div>

                <div className="w-full lg:w-1/2 h-[50vh] flex items-center justify-center">
                  <video
                    src="/goingtosomewhere.mp4"
                    width={500}
                    height={500}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-contain w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* ... (rest of the section remains the same) */}
        </section>

        <section
          id="second-spline-section"
          className="bg-black py-5 relative overflow-hidden"
        >
          <div className="container mx-auto flex flex-col relative z-10">
            <div className="flex-1 pr-4 pl-4 md:pl-0">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 h-[50vh] flex items-center justify-center">
                  <video
                    src="/movingcoolthing.mp4"
                    width={500}
                    height={500}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="object-contain w-full h-full"
                  />
                </div>
                <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-10 lg:mb-0">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-[#eb0028]">
                    Ideas, Connections, Clarity.
                  </h2>
                  <AnimatedTeamDescription />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Topics Cards */}
        <section id="topics-section" className="pt-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-2 text-[#eb0028]">
              Explore the Labyrinth
            </h2>
            <h4 className="text-center text-gray-300 text-xl md:text-2xl">
              Event topics
            </h4>
            <h5 className="text-center text-gray-300 italic text-lg md:text-xl mb-12">
              Click on a card to read about a topic
            </h5>

            <GlareGrid />
          </div>
        </section>

        {/* What is TEDx? - Now using the component with section-specific visibility */}
        <TedxSection
          isVisible={visibleSections["tedx-section"]}
          isHighlighted={headingHighlights["tedx-section"]}
        />

        {/* Meet the Organizers */}
        <OrganizersSection
          isVisible={visibleSections["organizers-section"]}
          isHighlighted={headingHighlights["organizers-section"]}
        />

        {/* Speakers Cards */}
        <section id="speaker-section" className="py-10 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
              Our Speakers
            </h2>

            {/* Desktop version - overlapping cards with spread functionality */}
            <div className="hidden md:block">
              <div className="flex justify-center items-center h-96 relative mb-16">
                {IS_SPEAKERS_ANNOUNCED
                  ? // Original speakers code when speakers are announced
                    speakers.map((speaker, index) => {
                      // Calculate spread positioning
                      let leftPosition;
                      let rotation;
                      let scale = 1;
                      let zIndex = index;

                      if (showSpread) {
                        // When button is clicked - spread cards evenly
                        const totalWidth = Math.min(
                          speakers.length * 300,
                          1200
                        );
                        const increment = totalWidth / speakers.length;
                        leftPosition = `calc(50% - ${totalWidth / 2}px + ${
                          index * increment + increment / 2
                        }px)`;
                        rotation = 0;
                        zIndex = 10;
                      } else if (hoveredIndex === index) {
                        // When this card is hovered
                        leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                        rotation = 0;
                        scale = 1.1;
                        zIndex = 50;
                      } else if (hoveredIndex !== null) {
                        // When another card is hovered - slightly move away
                        const direction = index < hoveredIndex ? -1 : 1;
                        leftPosition = `calc(45% - 32px + ${index * 70}px + ${
                          direction * 20
                        }px)`;
                        rotation =
                          (index - Math.floor(speakers.length / 2)) * 5;
                        zIndex = index;
                      } else {
                        // Default state - fanned out
                        leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                        rotation =
                          (index - Math.floor(speakers.length / 2)) * 5;
                        zIndex = index;
                      }

                      return (
                        <div
                          key={index}
                          className="absolute h-80 w-64 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 transition-all duration-300 shadow-lg cursor-pointer"
                          style={{
                            left: leftPosition,
                            transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                            zIndex: zIndex,
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="relative h-40 w-full overflow-hidden rounded-t-md">
                            <Image
                              src={speaker.image}
                              alt={speaker.name}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 text-white">
                              {speaker.name}
                            </h3>
                            <p className="text-gray-400 text-sm line-clamp-3">
                              {speaker.bio}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : // Coming soon cards
                    [...Array(4)].map((_, index) => {
                      // Calculate spread positioning for coming soon cards
                      let leftPosition;
                      let rotation;
                      let scale = 1;
                      let zIndex = index;

                      if (showSpread) {
                        const totalWidth = Math.min(4 * 300, 1200);
                        const increment = totalWidth / 4;
                        leftPosition = `calc(50% - ${totalWidth / 2}px + ${
                          index * increment + increment / 2
                        }px)`;
                        rotation = 0;
                        zIndex = 10;
                      } else if (hoveredIndex === index) {
                        leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                        rotation = 0;
                        scale = 1.1;
                        zIndex = 50;
                      } else if (hoveredIndex !== null) {
                        const direction = index < hoveredIndex ? -1 : 1;
                        leftPosition = `calc(45% - 32px + ${index * 70}px + ${
                          direction * 20
                        }px)`;
                        rotation = (index - Math.floor(4 / 2)) * 5;
                        zIndex = index;
                      } else {
                        leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                        rotation = (index - Math.floor(4 / 2)) * 5;
                        zIndex = index;
                      }

                      return (
                        <div
                          key={index}
                          className="absolute h-80 w-64 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 transition-all duration-300 shadow-lg cursor-pointer"
                          style={{
                            left: leftPosition,
                            transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                            zIndex: zIndex,
                          }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <div className="relative h-40 w-full overflow-hidden rounded-t-md bg-gray-800 flex items-center justify-center">
                            <div className="text-gray-500 text-4xl opacity-30">
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
                          </div>
                          <div className="p-4 flex flex-col items-center justify-center text-center">
                            <h3 className="text-xl font-semibold mb-2 text-white">
                              Coming Soon
                            </h3>
                            <p className="text-gray-400 text-sm">
                              Watch out for the Announcement in April!
                            </p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>

            {/* Mobile version */}
            <div className="md:hidden space-y-4 max-w-sm mx-auto">
              {IS_SPEAKERS_ANNOUNCED
                ? // Original speakers code for mobile
                  speakers.map((speaker, index) => (
                    <div
                      key={index}
                      className="relative ml-auto h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {speaker.name}
                        </h3>
                        <p className="text-gray-400">{speaker.bio}</p>
                      </div>
                    </div>
                  ))
                : // Coming soon cards for mobile
                  [...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="relative ml-auto h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative h-48 w-full overflow-hidden rounded-t-md bg-gray-800 flex items-center justify-center">
                        <div className="text-gray-500 text-4xl opacity-30">
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
                      </div>
                      <div className="p-4 text-center">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          Coming Soon
                        </h3>
                        <p className="text-gray-400">
                          Watch out for the Announcement in April!
                        </p>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
