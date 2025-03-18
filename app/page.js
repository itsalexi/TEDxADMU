"use client";

import { useState, useEffect, Suspense, lazy } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TrippyScroll from "@/components/TrippyScroll";
import AnimatedEventDescription from "@/components/animatedEventDesc";
import CurvedLineAnimation from "@/components/animatedCurvedLine";
import MazeBackground from "@/components/MazeBackground";
import AnimatedTeamDescription from "@/components/animatedTeamDecsription";
import  TextLoadingScreen from "@/components/TextLoadingScreen";

// Lazy load Spline component
const LazySpline = lazy(() => import('@splinetool/react-spline'));

// Spline loading placeholder
const SplinePlaceholder = () => (
  <div className="flex items-center justify-center w-full h-full bg-gray-900 rounded-lg animate-pulse">
    <div className="text-gray-500">Loading 3D element...</div>
  </div>
);

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [subtitleLoaded, setSubtitleLoaded] = useState(false);
  const [buttonLoaded, setButtonLoaded] = useState(false);
  const [showSpread, setShowSpread] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [splineVisible, setSplineVisible] = useState({
    first: false,
    second: false
  });
  const [speakerSectionVisible, setSpeakerSectionVisible] = useState(false);

  useEffect(() => {  
    setMounted(true);
    
  
    if (!isLoading) {
   
      const logoTimer = setTimeout(() => setLogoLoaded(true), 300);
      const titleTimer = setTimeout(() => setTitleLoaded(true), 600);
      const subtitleTimer = setTimeout(() => setSubtitleLoaded(true), 900);
  
      const buttonTimer = setTimeout(() => setButtonLoaded(true), 1200);
      
      return () => {
        clearTimeout(logoTimer);
        clearTimeout(titleTimer);
        clearTimeout(subtitleTimer);
        clearTimeout(buttonTimer);
      };
    }
  }, [isLoading]);

  // Add intersection observer to load Spline elements and trigger speaker cards spread
  useEffect(() => {
    if (!mounted || isLoading) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const firstSplineObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSplineVisible(prev => ({ ...prev, first: true }));
        firstSplineObserver.disconnect();
      }
    }, observerOptions);

    const secondSplineObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSplineVisible(prev => ({ ...prev, second: true }));
        secondSplineObserver.disconnect();
      }
    }, observerOptions);

    // Observer for speaker section with higher threshold to detect when further into the section
    const speakerSectionObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setSpeakerSectionVisible(true);
        setTimeout(() => {
          setShowSpread(true);
        }, 800); // Small delay for better visual effect after scrolling
        speakerSectionObserver.disconnect();
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.6 // Trigger when 60% of the element is visible
    });

    const firstSplineSection = document.getElementById('first-spline-section');
    const secondSplineSection = document.getElementById('second-spline-section');
    const speakerSection = document.getElementById('speaker-section');

    if (firstSplineSection) firstSplineObserver.observe(firstSplineSection);
    if (secondSplineSection) secondSplineObserver.observe(secondSplineSection);
    if (speakerSection) speakerSectionObserver.observe(speakerSection);

    return () => {
      firstSplineObserver.disconnect();
      secondSplineObserver.disconnect();
      speakerSectionObserver.disconnect();
    };
  }, [mounted, isLoading]);

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  const speakers = [
    {
      name: "Dr. Maria Santos",
      bio: "Cognitive Neuroscientist exploring the depths of human consciousness",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Architect Juan Reyes",
      bio: "Sustainable urban designer creating spaces that heal communities",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Innovator Ana Cruz",
      bio: "Tech entrepreneur bridging digital divides in underserved regions",
      image: "/api/placeholder/300/300",
    },
    {
      name: "Prof. David Lee",
      bio: "Philosopher examining the ethical labyrinths of emerging technologies",
      image: "/api/placeholder/300/300",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <Head>
        <title>TEDxAdMU: Labyrinthine</title>
        <meta
          name="description"
          content="TEDxAdMU presents Labyrinthine - navigating complexity through ideas worth spreading"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {isLoading && <TextLoadingScreen onLoadComplete={handleLoadComplete} />}

      <main>
       
        <section className="relative h-screen flex items-center justify-center overflow-hidden pt-16">
          <MazeBackground />
      
          <div className="container relative z-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-4xl">
              <div className="text-center flex flex-col items-center">
           
                <div 
                  className={`w-32 sm:w-40 md:w-48 lg:w-56 mb-4 sm:mb-6 transition-all duration-1000 ease-out ${
                    logoLoaded 
                      ? "opacity-100 transform translate-y-0" 
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  <Image 
                    src="/tedx-logo.png" 
                    alt="TEDx" 
                    width={220} 
                    height={70} 
                    className="w-full h-auto"
                    onLoadingComplete={() => setLogoLoaded(true)}
                    priority
                  />
                </div>
              
              
                <h1 
                  className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-wider mb-2 sm:mb-4 transition-all duration-1000 ease-out ${
                    titleLoaded 
                      ? "opacity-100 transform translate-y-0" 
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  LABYRINTHINE
                </h1>
                
                
                <p 
                  className={`text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 font-normal px-4 transition-all duration-1000 ease-out ${
                    subtitleLoaded 
                      ? "opacity-100 transform translate-y-0" 
                      : "opacity-0 transform translate-y-16"
                  }`}
                >
                  Unlocking Paths, Inspiring Change
                </p>
                
                
                <div
                  className={`transition-all duration-1000 ease-out ${
                    buttonLoaded
                      ? "opacity-100 transform translate-y-0"
                      : "opacity-0 transform translate-y-10"
                  }`}
                >
                  <Link href="/register">
                    <span className="inline-block bg-red-600 hover:bg-red-700 text-white text-base sm:text-lg md:text-xl lg:text-2xl px-6 sm:px-8 py-3 sm:py-4 rounded-md font-medium cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
                      Register Now
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        
        <section className="bg-[#161616]">
          <TrippyScroll />
        </section>
        
        <section id="first-spline-section" className="bg-black py-20 relative overflow-hidden">
          <div className="container mx-auto flex flex-col relative z-10">
            <div className="flex-1 pr-4 pl-4 md:pl-0">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-10 lg:mb-0">
                  <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-[#eb0028]">
                    What Awaits You at <br /> TEDxAteneoeDeManilaU Labyrinthine?
                  </h2>
                  <AnimatedEventDescription />
                </div>
                
                <div className="w-full lg:w-1/2 h-[50vh]">
                  {splineVisible.first && (
                    <Suspense fallback={<SplinePlaceholder />}>
                      <LazySpline
                        scene="https://prod.spline.design/dexYsw9US6fR1uiA/scene.splinecode"
                        onLoad={() => console.log("First Spline loaded")}
                      />
                    </Suspense>
                  )}
                  {!splineVisible.first && <SplinePlaceholder />}
                </div>
              </div>
            </div>
          </div>
          
          <div className="h-24 sm:h-32 md:h-40 lg:h-48"></div>
        
          <div className="absolute left-0 bottom-0 w-full sm:w-2/3 md:w-1/2 lg:w-2/5 xl:w-1/3 transform translate-y-0">
            <CurvedLineAnimation />
          </div>
        </section>

        <section id="second-spline-section" className="bg-black py-20 relative overflow-hidden">
          <div className="container mx-auto flex flex-col relative z-10">
              <div className="flex-1 pr-4 pl-4 md:pl-0">
                <div className="flex flex-col lg:flex-row items-center">
                <div className="w-full lg:w-1/2 h-[50vh]">
                    {splineVisible.second && (
                      <Suspense fallback={<SplinePlaceholder />}>
                        <LazySpline
                          scene="https://prod.spline.design/cnkcTWHRQAPm-gkj/scene.splinecode"
                          onLoad={() => console.log("Second Spline loaded")}
                        />
                      </Suspense>
                    )}
                    {!splineVisible.second && <SplinePlaceholder />}
                  </div>
                  <div className="w-full lg:w-1/2 pr-0 lg:pr-8 mb-10 lg:mb-0">
                    <h2 className="text-3xl sm:text-5xl font-bold mb-5 text-[#eb0028]">
                      Ideas, Connections, Clarity.
                    </h2>
                    <AnimatedTeamDescription />
                  </div>
                </div>
              </div>
            </div>
        </section>

        <section id="speaker-section" className="py-20 bg-black">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-center mb-16 text-[#eb0028]">
              Our Speakers
            </h2>
            
            {/* Desktop version - overlapping cards with spread functionality */}
            <div className="hidden md:block">
              <div className="flex justify-center items-center h-96 relative mb-16">
                {speakers.map((speaker, index) => {
                  // Calculate spread positioning
                  let leftPosition;
                  let rotation;
                  let scale = 1;
                  let zIndex = index;
                  
                  if (showSpread) {
                    // When button is clicked - spread cards evenly
                    const totalWidth = Math.min(speakers.length * 300, 1200);
                    const increment = totalWidth / speakers.length;
                    leftPosition = `calc(50% - ${totalWidth/2}px + ${index * increment + increment/2}px)`;
                    rotation = 0;
                    zIndex = 10;
                  } else if (hoveredIndex === index) {
                    // When this card is hovered
                    leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                    rotation = 0;
                    scale = 1.1;
                    zIndex = 50;
                  } else if (hoveredIndex !== null) {
                    // When another card is hovered - slightly move away
                    const direction = index < hoveredIndex ? -1 : 1;
                    leftPosition = `calc(45% - 32px + ${index * 70}px + ${direction * 20}px)`;
                    rotation = (index - Math.floor(speakers.length / 2)) * 5;
                    zIndex = index;
                  } else {
                    // Default state - fanned out
                    leftPosition = `calc(45% - 32px + ${index * 70}px)`;
                    rotation = (index - Math.floor(speakers.length / 2)) * 5;
                    zIndex = index;
                  }
                  
                  return (
                    <div
                      key={index}
                      className="absolute h-80 w-64 bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 transition-all duration-300 shadow-lg cursor-pointer"
                      style={{
                        left: leftPosition,
                        transform: `translateX(-50%) rotate(${rotation}deg) scale(${scale})`,
                        zIndex: zIndex,
                      }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <div className="relative h-40 w-full overflow-hidden rounded-t-md">
                        <Image
                          src={speaker.image}
                          alt={speaker.name}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2 text-white">
                          {speaker.name}
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-3">{speaker.bio}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="md:hidden space-y-4 max-w-sm mx-auto">
              {speakers.map((speaker, index) => (
                <div
                  key={index}
                  className="relative ml-auto h-full w-full bg-white rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-white-300 shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 w-full overflow-hidden rounded-t-md">
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2 text-white">
                      {speaker.name}
                    </h3>
                    <p className="text-gray-400">{speaker.bio}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* View All Speakers button removed */}
          </div>
        </section>
      </main>
    </div>
  );
}