import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const OrganizersSection = ({ isVisible, isHighlighted }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [wasHovered, setWasHovered] = useState(false);

  return (
    <section
      id="organizers-section"
      className="bg-black py-20 relative overflow-hidden"
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
          border: 3px solid #eb0028;
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

        .word-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 100%;
          background-color: #eb0028;
          opacity: 0.9;
          z-index: -1;
          transition: width 0.8s ease-out;
          transform-origin: left;
        }

        .highlighted .word-highlight {
          width: 100%;
        }
      `}</style>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex flex-col lg:flex-row lg:gap-8 items-center transform transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          <div className="w-full lg:w-1/2 border-[#eb0028] border-2 rounded-md shadow-lg shadow-red-900 flex justify-center items-center transition duration-300 ease-in-out transform hover:scale-105">
            <Link
              href="/core-team"
              className="relative w-full h-[400px] overflow-hidden"
            >
              <Image
                src="/group-x.webp"
                alt="TEDx Event"
                fill
                className="object-cover rounded-lg cursor-pointer"
                priority
              />
            </Link>
          </div>
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
              <span className="relative z-10">Meet the </span>
              <span
                className={`relative z-10 px-2 pb-1  ${
                  isHighlighted ? "highlighted" : ""
                }`}
              >
                Organizers
                <span className="word-highlight p-1"></span>
              </span>
            </h2>

            <div className="space-y-4">
              <p className="text-lg md:text-xl">
                TEDxAteneodeManilaU is organized by a dedicated team of students
                and faculty members who share a passion for spreading impactful
                ideas.
              </p>

              <p className="text-lg md:text-xl">
                Our organizers come from diverse backgrounds, bringing together
                creativity, leadership, and innovation to curate an inspiring
                event for the community. From selecting speakers to managing
                logistics, each member plays a crucial role in making
                TEDxAteneodeManilaU a platform for meaningful conversations.
              </p>

              <p className="text-lg md:text-xl">
                With a shared commitment to excellence, the team works
                tirelessly to create an unforgettable experience, fostering
                dialogue and sparking change within and beyond the university.
              </p>
            </div>

            <div className="mt-8 flex gap-6">
              <div className="">
                <Link href="/core-team">
                  <span className="inline-block bg-[#eb0028] hover:bg-red-700 hover:font-bold text-white text-base md:text-lg px-6 py-3 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Get to Know the Team
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizersSection;
