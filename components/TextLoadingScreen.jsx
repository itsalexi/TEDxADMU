"use client";
import { useState, useEffect } from "react";
import MazeBackground from "./MazeBackground";

const TextLoadingScreen = ({ onLoadComplete }) => {
  const word = "LABYRINTHINE";
  const [displayText, setDisplayText] = useState("");
  const [lockedPositions, setLockedPositions] = useState([]);
  const [isComplete, setIsComplete] = useState(false);
  const [lockAnimations, setLockAnimations] = useState([]);
  const [showSkipHint, setShowSkipHint] = useState(true);

  useEffect(() => {
    // Add class to body to prevent scrolling
    document.body.style.overflow = 'hidden';

    // Handle skip functionality
    const handleSkip = () => {
      setDisplayText(word);
      setLockedPositions(Array.from({ length: word.length }, (_, i) => i));
      setIsComplete(true);
      if (onLoadComplete) {
        setTimeout(onLoadComplete, 500);
      }
    };

    // Add event listeners for skip
    const handleKeyPress = (e) => {
      handleSkip();
    };

    const handleClick = () => {
      handleSkip();
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleClick);

    // Initialize with random characters
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-.<>?/";
    let initialText = "";
    
    for (let i = 0; i < word.length; i++) {
      initialText += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    
    setDisplayText(initialText);
    
    // Total animation duration: 3 seconds (faster)
    const totalDuration = 3000; // 3 seconds
    
    // Not all characters take the same time to "crack"
    // Some are discovered quickly, others take longer
    const baseCharacterRevealTime = totalDuration / word.length;
    const shuffleInterval = 50; // faster shuffling for more intensity
    
    // Start the animation immediately
    const cleanup = startRevealAnimation(baseCharacterRevealTime, shuffleInterval);
    
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleClick);
      cleanup();
    };
  }, []);

  const startRevealAnimation = (baseCharacterRevealTime, shuffleInterval) => {
    const randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-.<>?/";
    let currentIndex = 0;
    
    // Initialize lock animations array
    const newLockAnimations = Array(word.length).fill(false);
    setLockAnimations(newLockAnimations);
    
    // For tracking which characters have settled on the correct letter
    let tempLockedPositions = [];
    
    // Continue shuffling all non-locked positions
    const mainInterval = setInterval(() => {
      setDisplayText(prev => {
        const chars = prev.split('');
        
        // Update all non-locked positions with random characters
        for (let i = 0; i < chars.length; i++) {
          if (!tempLockedPositions.includes(i)) {
            chars[i] = randomChars.charAt(Math.floor(Math.random() * randomChars.length));
          }
        }
        
        return chars.join('');
      });
    }, shuffleInterval);
    
    // Create a randomized order to crack the password
    // This makes it feel more realistic - not just left to right
    const positions = Array.from({length: word.length}, (_, i) => i);
    
    // Occasionally, some positions will be revealed quickly in succession
    // while others might take longer (simulating difficulty in cracking)
    const shuffledPositions = positions.sort(() => Math.random() - 0.5);
    
    // Lock positions one by one at calculated intervals
    const lockNextPosition = () => {
      if (currentIndex >= word.length) {
        clearInterval(mainInterval);
        
        // Make sure all characters show the correct final word
        setDisplayText(word);
        setLockedPositions(Array.from({length: word.length}, (_, i) => i));
        setIsComplete(true);
        
        // Call onLoadComplete after a short delay
        setTimeout(() => {
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 500);
        
        return;
      }
      
      const positionToLock = shuffledPositions[currentIndex];
      
      setLockAnimations(prev => {
        const newAnimations = [...prev];
        newAnimations[positionToLock] = true;
        return newAnimations;
      });
      
      setDisplayText(prev => {
        const chars = prev.split('');
        chars[positionToLock] = word[positionToLock];
        return chars.join('');
      });
    
      tempLockedPositions.push(positionToLock);
      setLockedPositions(prev => [...prev, positionToLock]);
      currentIndex++;
      
      const variableFactor = Math.random() * 0.5 + 0.5;
      const nextRevealTime = baseCharacterRevealTime * variableFactor;
      
      setTimeout(lockNextPosition, nextRevealTime);
    };
    
    lockNextPosition();
    
    return () => {
      clearInterval(mainInterval);
    };
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ${isComplete ? 'opacity-0' : 'opacity-100'}`}>
      <MazeBackground />
      <div className="text-center">
        <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-wider">
          {displayText.split('').map((char, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-200 ${
                lockedPositions.includes(index) 
                  ? "text-white" 
                  : "text-red-500"
              } ${
                lockAnimations[index] && !isComplete
                  ? "animate-pulse scale-110" 
                  : ""
              } ${
                isComplete 
                  ? "text-white" 
                  : ""
              }`}
            >
              {char}
            </span>
          ))}
        </div>
        {showSkipHint && !isComplete && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 text-sm opacity-50">
            Press any key or click anywhere to skip
          </div>
        )}
      </div>
    </div>
  );
};

export default TextLoadingScreen;