"use client";

import React from "react";
import Link from "next/link";
import { SmoothScrollHero } from "@/components/smoothScroll";
import { ShopHero } from "@/components/shopHero";
import Image from "next/image";
import ParticlesBackground from "../ParticlesBackground";

const ShopPage = () => {
  const shopReleased = false;

  return (
    <div className="min-h-screen bg-black text-white relative">
      <ParticlesBackground />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        {shopReleased ? (
          <div>
            <ShopHero />
            <SmoothScrollHero />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 lg:grid-cols-5 max-lg:mt-32">
            <div className="col-span-3 flex flex-col items-center justify-center z-10">
              <div>
                <div className="w-32 sm:w-40 md:w-48 lg:w-56 sm:mb-6 flex justify-center ">
                  <Image
                    src="/tedx-logo.png"
                    alt="TEDx"
                    width={220}
                    height={70}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider mb-2 sm:mb-4"
                >
                  LABYRINTHINE <br /> MERCH
                </h1>
                <h2 className="italic text-xl">Coming Soon</h2>
                <div className="flex gap-6 mt-6">
                  <Link href="/">
                    <span className="inline-block bg-[#eb0028] hover:bg-red-700 text-white text-base sm:text-lg md:text-xl px-5 sm:px-6 py-2 sm:py-3 font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                      Back to Home Page
                    </span>
                  </Link>
                  <Link href="/register">
                    <span className="inline-block bg-[#eb0028] hover:bg-red-700 text-white text-base sm:text-lg md:text-xl px-5 sm:px-6 py-2 sm:py-3 font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                      Register
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="w-full pt-32 lg:col-span-2 flex justify-center z-10">
              <Image
                src="/question-mark-face2.png"
                alt="Question mark face graphic"
                className="w-10/12 h-5/6"
                width={100}
                height={200}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShopPage;
