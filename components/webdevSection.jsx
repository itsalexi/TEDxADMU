import React from "react";
import { Typewriter } from "@/components/typeWriter";
import { TextShimmer } from "@/components/textShimmer";
import Image from "next/image";

const developers = [
  {
    name: "Alexi Roth Canamo",
    image: "/alex-canamo.webp", // Replace with actual image path
    bio: "Backend guru crafting robust APIs and databases.",
  },
  {
    name: "Carl Washington Siy",
    image: "/carl-siy.webp", // Replace with actual image path
    bio: "Frontend wizard specializing in React and animations.",
  },
  {
    name: "John Jerome Pardo",
    image: "/jj-pardo.webp", // Replace with actual image path
    bio: "Full-stack expert, bridging design and functionality.",
  },
];

function WebdevSection() {
  return (
    <section
      id="webdev-section"
      className="p-16 pt-48 bg-background text-white"
    >
      <div className="w-full h-full md:text-4xl lg:text-5xl sm:text-3xl text-2xl flex flex-row items-start justify-start bg-background font-normal overflow-hidden p-16 pt-48">
        <div className="whitespace-pre-wrap z-50 text-white">
          <span>{"Special thanks to our "}</span>
          <Typewriter
            text={[
              "Website Development",
              "GOAT",
              "amazing",
              "wonderful",
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
      className="z-40 bg-gradient-to-b from-black to-gray-900 rounded-lg overflow-hidden border border-gray-800"
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

      <div className="px-6 py-4 border-t border-gray-800">
        <p className="text-gray-400 text-sm">TEDxAteneodeManilaU WebDev Team</p>
      </div>
    </div>
  ))}
</div>
    </section>
  );
}

export default WebdevSection;
