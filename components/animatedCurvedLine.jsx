'use client';

import { useEffect, useRef, useState } from 'react';

const CurvedLineAnimation = () => {
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Set up the Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 } // Trigger when at least 10% of the element is visible
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    // Clean up observer on component unmount
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (!isVisible || !pathRef.current) return;
    
    // Get the total length of the path
    const pathLength = pathRef.current.getTotalLength();
    
    // Initially set the stroke dasharray and dashoffset to hide the path
    pathRef.current.style.strokeDasharray = pathLength;
    pathRef.current.style.strokeDashoffset = pathLength;
    
    // Trigger the animation by setting the transition and changing the dashoffset
    setTimeout(() => {
      pathRef.current.style.transition = 'stroke-dashoffset 2s ease-in-out';
      pathRef.current.style.strokeDashoffset = '0';
    }, 100);
  }, [isVisible]);
  
  return (
    <div ref={containerRef} className="w-full h-60 flex items-center justify-center overflow-hidden">
      <svg 
        ref={svgRef}
        viewBox="0 0 1000 240" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d="M0,120 Q200,40 400,120 T800,120 T1000,120"
          fill="none"
          stroke="#e63946"
          strokeWidth="8"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CurvedLineAnimation;