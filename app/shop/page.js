"use client";

import React from "react";
import Link from "next/link";
import { SmoothScrollHero } from "@/components/smoothScroll";
import { ShopHero } from "@/components/shopHero";

const ShopPage = () => {
  

  return (
    <div className="min-h-screen bg-black text-white relative">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-black">
        {/* Hero Section */}
        <ShopHero />
        

        {/* Catalog Section */}
        <SmoothScrollHero />
        
      </main>
    </div>
  );
};

export default ShopPage;
