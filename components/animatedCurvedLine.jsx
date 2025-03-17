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
      pathRef.current.style.transition = 'stroke-dashoffset 1.5s ease-in-out';
      pathRef.current.style.strokeDashoffset = '0';
    }, 100);
  }, [isVisible]);
  
  return (
    <div ref={containerRef} className="w-full h-40 flex items-center justify-center">
      <svg 
        ref={svgRef}
        viewBox="0 0 800 200" 
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        <path
          ref={pathRef}
          d="M800,100 Q650,20 500,100 T200,100"
          fill="none"
          stroke="#e63946"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default CurvedLineAnimation;