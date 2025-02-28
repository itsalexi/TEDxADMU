"use client";

// pages/index.js
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black z-50 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <span className="font-bold text-xl cursor-pointer">
                  TEDx<span className="text-red-600">AteneoDeManilaU</span>
                </span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Home
                  </span>
                </Link>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    About
                  </span>
                </Link>
                <Link href="/shop">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Shop
                  </span>
                </Link>
                <Link href="/apply">
                  <span className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Apply Now
                  </span>
                </Link>
              </div>
            </div>
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-red-500 inline-flex items-center justify-center p-2 rounded-md transition duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 transform ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out`}
        style={{ top: "64px" }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              About
            </span>
          </Link>
          <Link href="/shop">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Shop
            </span>
          </Link>
          <Link href="/apply">
            <span className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Apply Now
            </span>
          </Link>
        </div>
      </div>

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
              <Image src="/hero-bg2.png" alt="background image" width={600} height={600} className="absolute top-[20%] left-[50%]" />
          </div>

          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 ">
            <h1 className="text-5xl sm:text-7xl font-bold text-white mb-8 ml-[40%] flex flex-col">
              <Image src="/tedx-logo.png" alt="TEDx" width={220} height={70} />
              <span className="block text-6xl sm:text-8xl italic tracking-wider mb-4">
                LABYRINTHINE
              </span>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mb-12">
                Navigating complexity through ideas worth spreading
              </p>
              <div
                className={`transition-all duration-1000 ease-out ${
                  mounted
                    ? "opacity-100 transform translate-y-0"
                    : "opacity-0 transform translate-y-10"
                }`}
              >
                <Link href="/apply">
                  <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-2xl px-8 py-4 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                    Apply Now
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

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <p className="text-2xl font-bold">
                TEDx<span className="text-red-500">AdMU</span>
              </p>
              <p className="text-gray-400 mt-2">
                Independently organized TED event
              </p>
            </div>
            <div>
              <p className="text-gray-400">
                © 2025 TEDxAdMU. All rights reserved.
              </p>
              <p className="text-gray-400 mt-2">
                This independent TEDx event is operated under license from TED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
