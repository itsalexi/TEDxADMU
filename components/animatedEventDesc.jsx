"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const AnimatedEventDescription = () => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className={`prose prose-lg mx-auto prose-invert transition-all duration-1000 transform max-md:flex max-md:flex-col items-center ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <p className="text-gray-300 leading-relaxed text-xl">
        TEDxAteneodeManilaU: Labyrinthine invites you to explore the intricate pathways of
        human innovation, challenges, and triumphs. Like a labyrinth, our
        journey through life presents complex choices and unexpected turns.
      </p>
      <Link href="/event-details">
        <span className="inline-block rounded-md mt-12 bg-[#eb0028] hover:bg-red-700 text-white text-base sm:text-lg md:text-xl px-5 sm:px-6 py-2 sm:py-3 font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
          View Event Details
        </span>
      </Link>
    </div>
  );
};

export default AnimatedEventDescription;
