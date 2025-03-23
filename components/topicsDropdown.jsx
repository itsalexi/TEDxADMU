"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TopicsDropdown = () => {
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const topics = [
    {
      id: "curiosity",
      title: "Curiosity",
      shortDescription: "The spark that ignites our journey",
      fullDescription:
        "Curiosity is the initial spark that sets us on a path of discovery. It's about questioning the status quo, exploring new territories, and being open to the unknown. This stage of the labyrinth represents our innate desire to learn and understand more about ourselves and the world around us.",
      image: "/curiosity.jpg",
      color: "from-red-600 to-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: "impasse",
      title: "Impasse",
      shortDescription: "Confronting obstacles and uncertainty",
      fullDescription:
        "An impasse is a point where progress seems impossible, where we confront obstacles and uncertainty. In the labyrinth, these are the dead-ends and false paths that challenge our resolve. This stage is about acknowledging difficulties and finding the resilience to continue despite them.",
      image: "/impasse.jpg",
      color: "from-blue-600 to-indigo-500",
      textColor: "text-blue-500",
    },
    {
      id: "turning-point",
      title: "Turning Point",
      shortDescription: "Moments of clarity and decision",
      fullDescription:
        "A turning point marks a critical moment of clarity and decision. In the labyrinth, it's where we find a new direction after being lost. This stage represents transformation, where challenges become opportunities and we gain new perspectives that shape our path forward.",
      image: "/turning-point.jpg",
      color: "from-green-600 to-emerald-500",
      textColor: "text-green-500",
    },
    {
      id: "transformation",
      title: "Transformation",
      shortDescription: "Emerging changed and enlightened",
      fullDescription:
        "Transformation is the culmination of our journey through the labyrinth, where we emerge changed and enlightened. This stage represents the growth and insight gained from navigating complexity, embracing uncertainty, and persevering through challenges. It's about becoming more than we were when we started.",
      image: "/transformation.jpg",
      color: "from-purple-600 to-violet-500",
      textColor: "text-purple-500",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex flex-col w-full">
        {topics.map((topic, index) => (
          <TopicSection
            key={topic.id}
            topic={topic}
            isSelected={selectedTopic === topic.id}
            onClick={() =>
              setSelectedTopic(selectedTopic === topic.id ? null : topic.id)
            }
            isExpanded={selectedTopic !== null}
          />
        ))}
      </div>
    </div>
  );
};

const TopicSection = ({ topic, isSelected, onClick, isExpanded }) => {
  return (
    <motion.div
      layout
      className={cn(
        "relative overflow-hidden transition-all duration-700 ease-in-out cursor-pointer border-b border-gray-800",
        isSelected
          ? "h-[600px]" // Fixed expanded height
          : "h-[200px]" // Fixed collapsed height
      )}
      onClick={onClick}
      initial={false}
    >
      <motion.div
        layout
        className={cn(
          "relative w-full h-full flex flex-col bg-gradient-to-b",
          `${topic.color}`,
          isSelected ? "opacity-100" : "opacity-80 hover:opacity-90"
        )}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div
            className={cn(
              "absolute inset-0 bg-black z-10 transition-opacity duration-700",
              isSelected ? "opacity-40" : "opacity-60"
            )}
          ></div>
          <div className="h-full w-full relative">
            <div
              className={cn(
                "w-full h-full bg-gradient-to-b absolute z-10 transition-opacity duration-700",
                isSelected
                  ? "from-black/20 to-black/50"
                  : "from-black/30 to-black/60"
              )}
            ></div>
            <Image
              src={topic.image}
              alt={topic.title}
              layout="fill"
              objectFit="cover"
              className={cn(
                "z-0 transition-transform duration-700",
                isSelected ? "scale-105" : "scale-100"
              )}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/800x600?text=Topic+Image";
              }}
            />
          </div>
        </div>

        {/* Content */}
        <div
          className={cn(
            "relative z-20 w-full flex flex-col p-4 md:p-8 transition-all duration-700",
            isSelected ? "justify-center" : "justify-start"
          )}
        >
          {/* Title always visible */}
          <motion.div layout className="flex items-center justify-between">
            <motion.h2
              layout
              className={cn(
                "font-bold transition-all duration-700 ease-in-out",
                isSelected
                  ? "text-3xl md:text-5xl lg:text-6xl"
                  : "text-xl md:text-2xl",
                "text-white"
              )}
            >
              {topic.title}
            </motion.h2>

            <motion.div
              animate={{ rotate: isSelected ? 180 : 0 }}
              className="text-white"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </motion.div>

          {/* Description - only visible when selected */}
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-white mt-8 max-w-3xl"
              >
                <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light">
                  {topic.shortDescription}
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                  {topic.fullDescription}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Show short description when not selected */}
          {!isSelected && (
            <motion.p className="text-white text-sm md:text-base mt-2">
              {topic.shortDescription}
            </motion.p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopicsDropdown;
