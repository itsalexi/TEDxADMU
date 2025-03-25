"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";

const InfiniteImageScroll = ({
  images,
  height = 200,
  speed = 50,
  direction = "left", // or "right"
}) => {
  if (!images || images.length === 0) return null;

  // CSS animation properties
  const animationDirection = direction === "left" ? "normal" : "reverse";

  // Simplified keyframes - using percentage-based translation instead of pixel values
  const keyframes = `
    @keyframes scroll {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `;

  return (
    <div className="relative overflow-hidden w-full">
      <style>{keyframes}</style>
      <div
        className="flex"
        style={{
          animation: `scroll ${speed}s linear infinite ${animationDirection}`,
          width: "fit-content",
        }}
      >
        {/* First set of images */}
        {images.map((image, idx) => (
          <div
            key={`img-${idx}`}
            className="flex-shrink-0 mx-2 md:mx-4"
            style={{ height: `${height}px`, minWidth: `${height * 1.5}px` }}
          >
            <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg shadow-red-900/20 border border-[#eb0028]">
              <Image
                src={image.src}
                alt={image.alt || "Scrolling image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
            </div>
          </div>
        ))}

        {/* Duplicate set for seamless scrolling */}
        {images.map((image, idx) => (
          <div
            key={`img-dup-${idx}`}
            className="flex-shrink-0 mx-2 md:mx-4"
            style={{ height: `${height}px`, minWidth: `${height * 1.5}px` }}
          >
            <div className="relative h-full w-full rounded-md overflow-hidden shadow-lg shadow-red-900/20 border border-[#eb0028]">
              <Image
                src={image.src}
                alt={image.alt || "Scrolling image"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteImageScroll;
