"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Footer from "./Footer";

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
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-bg.png"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              className="absolute inset-0"
            />
            <Image
              src="/hero-bg2.png"
              alt="background image"
              width={600}
              height={600}
              className="absolute top-[20%] left-[50%]"
            />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-3xl sm:text-7xl font-bold text-white mb-8 ml-[40%] flex flex-col">
              <Image src="/tedx-logo.png" alt="TEDx" width={220} height={70} />
              <span className="block text-6xl sm:text-8xl italic tracking-wider mb-4">
                LABYRINTHINE
              </span>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mb-12">
                Unlocking Paths, Inspiring Change
              </p>
              <div
                className={`transition-all duration-1000 ease-out ${
                  mounted
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-10"
                }`}
              >
                <Link href="/register">
                  <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-2xl px-8 py-4 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Register Now
                  </span>
                </Link>
              </div>
            </h1>
          </div>
        </section>

        {/* Event Description */}
        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-white">
              Discover Labyrinthine
            </h2>
            <div className="prose prose-lg mx-auto prose-invert">
              <p className="text-gray-300 leading-relaxed text-xl">
                TEDxAdMU Labyrinthine invites you to explore the intricate
                pathways of human innovation, challenges, and triumphs. Like a
                labyrinth, our journey through life presents complex choices and
                unexpected turns.
              </p>
              <p className="text-gray-300 leading-relaxed text-xl mt-6">
                Join us for a day of thought-provoking talks, meaningful
                connections, and ideas that challenge you to navigate your own
                labyrinth with renewed purpose. Our speakers bring diverse
                perspectives on technology, culture, science, and the arts—all
                connecting to our central theme of finding clarity within
                complexity.
              </p>
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-white">
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

      <Footer />
    </div>
  );
}
