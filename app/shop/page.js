"use client";

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import ProductCard from "./ProductCard";
import Image from "next/image";
import Link from "next/link";

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
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 bg-black mb-20">
        {/* Hero Section */}
        <div className="h-[600px] w-full flex justify-center mb-20">
          <div className="absolute left-0 top-40 w-full h-[600px] z-0">
            <Image
              src="/shop-hero-bg.png"
              alt="Shop Hero Background"
              layout="fill"
              objectFit="cover"
            />
          </div>
          <div className="z-50 mt-[20rem] place-items-center">
            <h1 className="text-7xl mb-8">LABYRINTHINE</h1>
            <Link href="/apply">
              <span className="bg-red-600 text-white hover:bg-red-700  px-3 py-2 rounded-md text-base font-medium cursor-pointer">
                Buy Now
              </span>
            </Link>
          </div>
        </div>

        {/* Catalog Section */}
        <h1 className="text-4xl sm:text-6xl font-bold text-center my-12">
          Shop at TEDxAdMU
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
