"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TrippyScroll from "@/components/TrippyScroll";
import AnimatedEventDescription from "@/components/animatedEventDesc";
import CurvedLineAnimation from "@/components/animatedCurvedLine";
import MazeBackground from "@/components/MazeBackground";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {  
    setMounted(true);
  }, []);

  const speakers = [
    {
      name: "Dr. Maria Santos",
      bio: "Cognitive Neuroscientist exploring the depths of human consciousness",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Architect Juan Reyes",
      bio: "Sustainable urban designer creating spaces that heal communities",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Innovator Ana Cruz",
      bio: "Tech entrepreneur bridging digital divides in underserved regions",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Prof. David Lee",
      bio: "Philosopher examining the ethical labyrinths of emerging technologies",
      image: "/api/placeholder/300/300",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>TEDxAdMU: Labyrinthine</title>
        <meta
          name="description"
          content="TEDxAdMU presents Labyrinthine - navigating complexity through ideas worth spreading"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
      <MazeBackground />
      
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <div className="w-full max-w-4xl">
          <div className="text-center flex flex-col items-center">
            {/* Responsive logo */}
            <div className="w-32 sm:w-40 md:w-48 lg:w-56 mb-4 sm:mb-6">
              <Image 
                src="/tedx-logo.png" 
                alt="TEDx" 
                width={220} 
                height={70} 
                className="w-full h-auto"
              />
            </div>
            
            {/* Responsive title */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider mb-2 sm:mb-4">
              LABYRINTHINE
            </h1>
            
            {/* Responsive subtitle */}
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 font-normal px-4">
              Unlocking Paths, Inspiring Change
            </p>
            
            {/* Responsive button with animation */}
            <div
              className={`transition-all duration-1000 ease-out ${
                mounted
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

        {/* Rest of the components remain unchanged */}
        <section className="bg-[#161616]">
          <TrippyScroll />
        </section>

        {/* Event Description */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
              Discover Labyrinthine
            </h2>
            <AnimatedEventDescription />
            <CurvedLineAnimation />
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
              Our Speakers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="bg-gray-900 rounded-lg overflow-hidden shadow-lg hover:shadow-red-900/30 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-400">{speaker.bio}</p>
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