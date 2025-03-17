"use client";

import React, { useState, useEffect, useRef } from 'react';

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
        threshold: 0.2 
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
      className={`prose prose-lg mx-auto prose-invert transition-all duration-1000 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'
      }`}
    >
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
  );
};

export default AnimatedEventDescription;