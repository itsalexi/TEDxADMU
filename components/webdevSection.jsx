import React from "react";
import { Typewriter } from "@/components/typeWriter";
import { TextShimmer } from "@/components/textShimmer";
import Image from "next/image";
import { FaFacebookF, FaLinkedin } from "react-icons/fa6";
import { useEffect } from "react";

const developers = [
  {
    name: "Alexi Roth Luis Canamo",
    image: "/alex-canamo.webp",
    bio: "Loves to build cool and impactful stuff, portfolio @alexi.life",
    linkedin: "https://www.linkedin.com/in/alexicanamo/",
    facebook: "https://www.facebook.com/alexirothluis.canamo",
  },
  {
    name: "Carl Washington Siy",
    image: "/carl-siy.webp",
    bio: "Does animations and glowy things on websites",
    linkedin: "https://www.linkedin.com/in/carl-washington-siy-69b322326/",
    facebook: "https://facebook.com/carlwashington.siy",
  },
  {
    name: "John Jerome Pardo",
    image: "/jj-pardo.webp",
    bio: "Likes to create moving things and aesthetic websites",
    linkedin: "https://www.linkedin.com/in/john-jerome-pardo-24b5bb311/",
    facebook: "https://www.facebook.com/pardo3toh",
  },
];

function WebdevSection() {
  // Mounting animations
  useEffect(() => {
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
    document.querySelectorAll(".webdev-section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <section
      id="webdev-section"
      className="webdev-section p-16 lg:pt-48 bg-background text-white opacity-0 translate-y-16 transform transition-all duration-1000 ease-out"
    >
      <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden pb-16 ">
        <div className="whitespace-pre-wrap z-30 text-white">
          <span>{"Special thanks to our "}</span>
          <Typewriter
            text={[
              "Website Development💻",
              "GOAT🐐",
              "amazing😍",
              "wonderful✨",
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {developers.map((member, index) => (
          <div
            key={index}
            className="z-30 bg-gradient-to-b from-black to-gray-900 rounded-lg overflow-hidden border border-gray-800"
          >
            <div className="relative h-80 w-full">
              {/* If you don't have actual images yet, this will fallback to placeholder */}
              <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  <div className="text-gray-600 text-xl">{member.name[0]}</div>
                )}
              </div>
            </div>

            <div className="p-6">
              <TextShimmer
                duration={1.2}
                className="text-xl font-medium mb-1 [--base-color:theme(colors.red.600)] [--base-gradient-color:theme(colors.red.200)]"
              >
                {member.name}
              </TextShimmer>

              <p className="text-red-500 font-medium mb-4">{member.role}</p>

              <p className="text-gray-300 leading-relaxed">{member.bio}</p>
            </div>

            <div className="px-6 py-4 border-t border-gray-800 flex items-center justify-between">
              <p className="text-gray-400 text-xs">
                TEDxAteneodeManilaU WebDev Team
              </p>
              <div className="flex space-x-3">
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors"
                  aria-label={`LinkedIn profile of ${member.name}`}
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href={member.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-600 transition-colors"
                  aria-label={`Facebook profile of ${member.name}`}
                >
                  <FaFacebookF size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WebdevSection;
