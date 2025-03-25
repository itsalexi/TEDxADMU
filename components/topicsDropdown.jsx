"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TopicsDropdown = () => {
  const [selectedTopic, setSelectedTopic] = React.useState(null);
  const [preSelectTopic, setPreSelectTopic] = React.useState(null);
  const [preCollapseTopic, setPreCollapseTopic] = React.useState(null);

  // Create refs for each topic section
  const topicRefs = React.useRef({});

  // Handle the click with appropriate delays for both expanding and collapsing
  const handleTopicClick = (topicId) => {
    if (selectedTopic === topicId) {
      // First mark for pre-collapse to fade out descriptions
      setPreCollapseTopic(topicId);

      // Then actually collapse after delay
      setTimeout(() => {
        setSelectedTopic(null);
        setPreCollapseTopic(null);
      }, 200);
    } else {
      // Expanding - set pre-select immediately (for fade-out)
      setPreSelectTopic(topicId);

      // Actual expansion after delay
      setTimeout(() => {
        setSelectedTopic(topicId);
        setPreSelectTopic(null);
      }, 200);
    }
  };

  const topics = [
    {
      id: "curiosity",
      title: "Curiosity",
      shortDescription: "Microbiome: The Ecosystem Inside You",
      fullDescription: `The microbiome is the diverse community of microorganisms which includes bacteria, fungi, 
        and viruses that live within us. From digestion to mental health, this intricate ecosystem plays 
        a crucial role in shaping our overall well-being. This talk will explore the interconnectedness 
        between our gut and brain, the potential of microbiome-based therapies, and the impact of modern 
        lifestyles on this vital ecosystem. By understanding the importance of the microbiome, we can take 
        proactive steps to cultivate a healthy internal ecosystem. Adopt mindful eating practices, reduce 
        antibiotic use, and consider personalized microbiome-based interventions. By nurturing the microbiome, 
        we can unlock our full potential and improve our overall well-being.`,
      image: "/empty-head.png", // Keep only the image property
      backgroundColor: "bg-blue-950",
      textColor: "text-orange-400",
    },
    {
      id: "impasse",
      title: "Impasse",
      shortDescription: "Finding Purpose and Strength in Stillness and Grief",
      fullDescription: `In a fast-paced world where instant gratification is the norm, we’re often unprepared 
      for moments that force us to pause—especially in times of loss, uncertainty, or pain. This talk explores 
      how waiting, particularly in grief, can become a powerful tool for transformation, clarity, and resilience. 
      Grief is one of life’s longest waits—waiting for healing, answers, or a sense of wholeness. Yet, like all 
      forms of waiting, it can also be a departure point: a painful but necessary pause that teaches the value of 
      stillness and the lessons we’d miss in our rush to move on. For college students, this stage of life is 
      often marked by excitement but also uncertainty, fear, and loss—whether it’s the death of a loved one, a 
      failed relationship, the loss of a work opportunity, or the struggle to find identity. These experiences 
      remind us that some things can’t be rushed or fixed. By reframing grief as an active, strategic part of 
      our journey, this talk offers students a new perspective on challenges and loss. It reminds them that 
      waiting isn’t passive—it’s a time of preparation, reflection, and, ultimately, transformation.`,
      image: "/red-drawing.png", // Keep only the image property
      backgroundColor: "bg-[#eb0028]",
      textColor: "text-black",
    },
    {
      id: "turning-point",
      title: "Turning Point",
      shortDescription: "Artivism: The Power of Art in Activism",
      fullDescription: `In a world marked by growing societal divides, art has emerged as a powerful force for unity, understanding,
         and social change. Through shared experiences and emotional engagement, art transcends boundaries, inspiring 
         action, building empathy, and fostering community. This topic explores how artists harness their creativity 
         as a tool for activism, using storytelling, performance, and visual expression to address pressing societal 
         challenges and advocate for meaningful change. From protest art to community-driven projects, discover how 
         artivism empowers individuals and movements to imagine—and create—a better world.`,
      image: "/fishing.png",
      backgroundColor: "bg-green-900",
      textColor: "text-lime-100",
    },
    {
      id: "transformation",
      title: "Transformation",
      shortDescription: "Digital Nomads: Work with Freedom and Fulfillment",
      fullDescription: `Imagine a world where work transcends geographical boundaries, allowing individuals to explore new cultures, 
        pursue their passions, and live life on their own terms. This reality is embraced by millions of digital nomads, 
        who challenge the traditional 9-to-5 work model and redefine what it means to have a successful career. However, 
        the digital nomad lifestyle is not without its controversies. As global companies push for employees to return to 
        the office, questions arise about the value of this lifestyle in terms of productivity, collaboration, and work-life 
        balance. This talk will delve into the complexities of digital nomadism, examining both its advantages and drawbacks 
        across different industries.`,
      image: "/batman.png",
      backgroundColor: "bg-gray-900",
      textColor: "text-yellow-400",
    },
  ];

  return (
    <div className="w-full bg-">
      <div className="flex flex-col w-full">
        {topics.map((topic, index) => (
          <TopicSection
            key={topic.id}
            topic={topic}
            isSelected={selectedTopic === topic.id}
            isPreSelected={preSelectTopic === topic.id}
            isPreCollapsed={preCollapseTopic === topic.id}
            onClick={() => handleTopicClick(topic.id)}
            isExpanded={selectedTopic !== null}
            ref={(el) => (topicRefs.current[topic.id] = el)}
          />
        ))}
      </div>
    </div>
  );
};

// Add forwardRef to enable using refs with the TopicSection component
const TopicSection = React.forwardRef(
  (
    { topic, isSelected, isPreSelected, isPreCollapsed, onClick, isExpanded },
    ref
  ) => {
    const [animationState, setAnimationState] = React.useState("initial");
    const [showShortDesc, setShowShortDesc] = React.useState(
      !isSelected && !isPreSelected
    );
    const [showFullDesc, setShowFullDesc] = React.useState(false);
    const [showImage, setShowImage] = React.useState(!isSelected);

    // Update animation state and content visibility
    React.useEffect(() => {
      // When pre-collapsing, hide descriptions and image immediately
      if (isPreCollapsed) {
        setShowFullDesc(false);
        setShowShortDesc(false);
        setShowImage(false); // Hide image immediately when pre-collapsing
        return;
      }

      // When pre-selected, hide short description and image
      if (isPreSelected) {
        setShowShortDesc(false);
        setShowImage(false);
        return;
      }

      if (isSelected) {
        // Begin selection sequence
        setAnimationState("expanding");
        setShowShortDesc(false);
        setShowImage(false);

        // After section expands, show the full description and image
        const timer = setTimeout(() => {
          setAnimationState("expanded");
          setShowFullDesc(true);
          setShowImage(true); // Show image in expanded state
        }, 750);

        return () => clearTimeout(timer);
      } else {
        // Begin collapse sequence - hide image first
        setAnimationState("collapsing");
        setShowFullDesc(false);
        setShowImage(false);

        // After a delay to ensure image has faded out, show the short description
        const timer = setTimeout(() => {
          setAnimationState("collapsed");
          setShowShortDesc(true);

          // Wait a bit longer before showing the image in collapsed state
          const imageTimer = setTimeout(() => {
            setShowImage(true);
          }, 300);

          return () => clearTimeout(imageTimer);
        }, 550);

        return () => clearTimeout(timer);
      }
    }, [isSelected, isPreSelected, isPreCollapsed]);

    // Main section transition (expand/collapse)
    const sectionTransition = {
      type: "spring",
      stiffness: 70,
      damping: 20,
      duration: 1.5,
    };

    return (
      <motion.div
        ref={ref}
        layout="position"
        className={cn(
          "relative w-full origin-top overflow-hidden cursor-pointer",
          topic.backgroundColor // Apply background color via classes
        )}
        onClick={onClick}
        initial={false}
        animate={{
          backgroundColor: topic.backgroundColor,
          minHeight: isSelected ? "40rem" : "18rem",
        }}
        transition={{
          duration: 0.8,
          backgroundColor: { duration: 1.5 },
        }}
      >
        <motion.div
          className="relative w-full h-full flex flex-col"
          transition={sectionTransition}
        >
          {/* Background Image */}
          <div
            className={cn(
              "absolute z-0",
              isSelected
                ? "md:w-1/2 md:right-0 inset-y-0 opacity-100 md:opacity-100"
                : "inset-0 opacity-100"
            )}
          >
            <div className="h-full w-full relative">
              {/* Static Image with proper fade in/out animation */}
              <AnimatePresence mode="sync">
                {showImage && (
                  <motion.div
                    key="static-image"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "absolute inset-0",
                      isSelected ? "md:mr-0" : "mt-24 md:mt-0" // Add top margin only on mobile when unselected
                    )}
                  >
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      layout="fill"
                      objectFit="contain"
                      className={cn(
                        "transition-transform duration-1000",
                        isSelected ? "scale-110 md:scale-110" : "scale-100"
                      )}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "";
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          <div
            className={cn(
              "relative z-20 w-full flex flex-col p-4 md:p-8",
              isSelected
                ? "justify-center md:w-1/2 md:mr-auto"
                : "justify-start"
            )}
          >
            {/* Content Background Overlay for Mobile */}
            {isSelected && (
              <div className="absolute inset-0 md:bg-transparent rounded-lg -z-10"></div>
            )}

            {/* Title always visible - updated with topic textColor */}
            <div className="flex items-center justify-between">
              <motion.h2
                layout
                transition={sectionTransition}
                className={cn(
                  "font-bold",
                  isSelected
                    ? "text-5xl md:text-6xl lg:text-7xl"
                    : "text-4xl md:text-5xl",
                  topic.textColor // Use topic-specific text color
                )}
              >
                {topic.title}
              </motion.h2>

              <motion.div
                animate={{ rotate: isSelected ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={topic.textColor} // Use topic-specific text color
              >
                <ChevronDown className="h-6 w-6" />
              </motion.div>
            </div>

            {/* Short Description - updated with topic textColor */}
            <AnimatePresence mode="wait">
              {showShortDesc && !isSelected && (
                <motion.p
                  key="short-description"
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className={cn(
                    "text-sm md:text-base mt-2 italic",
                    topic.textColor // Use topic-specific text color
                  )}
                >
                  {topic.shortDescription}
                </motion.p>
              )}
            </AnimatePresence>

            {/* Full Description - updated with topic textColor */}
            <AnimatePresence>
              {showFullDesc && isSelected && (
                <motion.div
                  key="full-description"
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    y: 100,
                    transition: { duration: 0.2, ease: "easeInOut" },
                  }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={cn(
                    "mt-8 max-w-3xl",
                    topic.textColor,
                    "rounded-lg md:p-0"
                  )}
                >
                  <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light italic">
                    {topic.shortDescription}
                  </p>
                  <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                    {topic.fullDescription}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    );
  }
);

// Add display name for the forwarded ref component
TopicSection.displayName = "TopicSection";

export default TopicsDropdown;
