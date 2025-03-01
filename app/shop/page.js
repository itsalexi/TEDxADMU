'use client'

import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const ShopPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-6xl font-bold text-center my-12">
          Shop at TEDxAdMU
        </h1>
        <section className="prose prose-lg mx-auto prose-invert">
          <p className="text-gray-300 leading-relaxed text-xl">
            Welcome to the TEDxAdMU shop. Here you can find exclusive
            merchandise and products related to our events. Stay tuned for more
            updates!
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShopPage;
