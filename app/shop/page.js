"use client";

import React from "react";
import Link from "next/link";
import { SmoothScrollHero } from "@/components/smoothScroll";
import { ShopHero } from "@/components/shopHero";
import Image from "next/image";

const ShopPage = () => {
  const shopReleased = false;

  return (
    <div className="min-h-screen bg-black text-white relative">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        {shopReleased ? (
          <div>
            <ShopHero />
            <SmoothScrollHero />
          </div>
        ) : (
          <div className="w-full grid grid-cols-5 text-center">
            <div className="col-span-3 flex flex-col items-center justify-center">
              <div>
                <h1
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider mb-2 mt-40 sm:mb-4`}
                >
                  LABYRINTHINE <br /> MERCH
                </h1>
                <h2>Coming Soon</h2>
                
              </div>
            </div>
            <div className="pt-32 col-span-2">
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
