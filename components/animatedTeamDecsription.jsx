"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

const AnimatedTeamDescription = () => {
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
        Join us for a day of thought-provoking talks, meaningful connections,
        and ideas that challenge you to navigate your own labyrinth with renewed
        purpose. Our speakers bring diverse perspectives on technology, culture,
        science, and the arts—all connecting to our central theme of finding
        clarity within complexity. make a short one for this one
      </p>
      <Link href="/event-details">
        <span className="inline-block mt-12 bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg md:text-xl px-5 sm:px-6 py-2 sm:py-3 font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
          View Topics
        </span>
      </Link>
    </div>
  );
};

export default AnimatedTeamDescription;
