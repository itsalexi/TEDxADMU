import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const TedxSection = ({ isVisible, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);

  return (
    <section
      id="tedx-section"
      className="bg-[#eb0028] py-20 relative overflow-hidden"
    >
      <style jsx>{`
        @keyframes borderRotate {
          0% {
            clip-path: inset(0 0 100% 0);
          }
          25% {
            clip-path: inset(0 0 0 0);
          }
          50% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes borderRotateOut {
          0% {
            clip-path: inset(0 0 0 0);
          }
          100% {
            clip-path: inset(100% 0 0 0);
          }
        }

        .border-animation {
          position: absolute;
          inset: 0;
          border: 3px solid white;
          pointer-events: none;
        }

        .hover-active .border-animation {
          animation: borderRotate 1.5s ease-in-out forwards;
        }

        .border-visible {
          clip-path: inset(0 0 0 0);
        }

        .hover-inactive .border-animation {
          animation: borderRotateOut 0.5s ease-in-out forwards;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row lg:gap-8 items-center transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div
            className={`w-full lg:w-1/2 mb-10 lg:mb-0 text-white rounded-md p-6 transition duration-300 ease-in-out transform hover:scale-105 bg-black relative ${
              isHovered ? "hover-active" : wasHovered ? "hover-inactive" : ""
            }`}
            onMouseEnter={() => {
              setIsHovered(true);
              setWasHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <div
              className={`border-animation rounded-md ${
                isHovered && wasHovered ? "border-visible" : ""
              }`}
            ></div>
            <h2 className="text-3xl sm:text-5xl font-bold mb-6 p-4 relative inline-block">
              <span className="relative z-10">
                What is <span className="text-[#eb0028]">TEDx?</span>
              </span>

              {/* Highlight animation element */}
              <span
                className={`absolute bottom-0 left-0 w-full h-1 bg-[#eb0028] transform origin-left transition-transform duration-1000 ease-out ${
                  isHighlighted ? "scale-x-100" : "scale-x-0"
                }`}
                style={{
                  transformOrigin: "left",
                }}
              ></span>
            </h2>

            <div className="space-y-4">
              <p className="text-lg md:text-xl">
                TEDx is a grassroots initiative, created in the spirit of
                TED&apos;s overall mission to research and discover &quot;ideas
                worth spreading.&quot;
              </p>

              <p className="text-lg md:text-xl">
                TEDx brings the spirit of TED to local communities around the
                globe through self-organized events. TEDxAteneodeManilaU events
                are organized by students and faculty to share ideas in and
                beyond the university community.
              </p>

              <p className="text-lg md:text-xl">
                Each TEDx event is unique, but all share features like TED Talk
                videos, live speakers, and deep conversations.
              </p>
            </div>
            <div className="mt-8 flex gap-6">
              <div className="">
                <Link href="/about">
                  <span className="inline-block  text-center bg-[#eb0028] hover:bg-red-700 hover:font-bold text-white text-base md:text-lg px-6 py-3 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Learn More About Us
                  </span>
                </Link>
              </div>
              <div className="">
                <Link
                  href="https://www.ted.com/about/programs-initiatives/tedx-program"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="inline-block text-center bg-[#eb0028] hover:bg-red-700 hover:font-bold text-white text-base md:text-lg px-6 py-3 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    TEDx Program
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 border-white border-2 rounded-md shadow-lg shadow-slate-600 flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105">
            <Link
              href="/about"
              className="relative w-full h-[400px] overflow-hidden"
            >
              <Image
                src="/tedx-event-image.webp"
                alt="TEDx Event"
                fill
                className="object-cover rounded-lg cursor-pointer"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TedxSection;
