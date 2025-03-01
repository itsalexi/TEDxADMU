'use client'

import React from "react";
import Navbar from "../Navbar";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl sm:text-6xl font-bold text-center my-12">
          About TEDxAdMU
        </h1>
        <section className="prose prose-lg mx-auto prose-invert">
          <p className="text-gray-300 leading-relaxed text-xl">
            TEDxAdMU is an independently organized TED event held at Ateneo de
            Manila University. Our mission is to bring together bright minds to
            give talks that are idea-focused, and on a wide range of subjects,
            to foster learning, inspiration, and wonder – and provoke
            conversations that matter.
          </p>
          <p className="text-gray-300 leading-relaxed text-xl mt-6">
            Our event is organized by a passionate team of volunteers who are
            dedicated to creating a platform for sharing innovative ideas and
            inspiring stories. We believe in the power of ideas to change
            attitudes, lives, and ultimately, the world.
          </p>
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
};

export default AboutPage;
