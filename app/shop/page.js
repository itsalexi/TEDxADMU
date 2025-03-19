"use client";

import React from "react";
import ProductCard from "./ProductCard";
import Image from "next/image";
import Link from "next/link";
import { SmoothScrollHero } from "@/components/smoothScroll";
import { ShopHero } from "@/components/shopHero";

const ShopPage = () => {
  const link = "https://google.com"; // link to google forms
  const products = [
    {
      name: "TEDxAteneoDeManila T-Shirt Light",
      image: "/shirt-light.png",
      price: 20,
      link: link,
    },
    {
      name: "TEDxAteneoDeManila T-Shirt Dark",
      image: "/shirt-dark.png",
      price: 10,
      link: link,
    },
    {
      name: "TEDxAteneoDeManila T-Shirt Core Team",
      image: "/shirt-ct.png",
      price: 15,
      link: link,
    },
  ];

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
