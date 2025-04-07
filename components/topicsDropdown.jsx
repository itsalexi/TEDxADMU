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
      fullDescription: (
        <>
          <p>The <strong>microbiome</strong> is the diverse community of microorganisms which includes bacteria, fungi, 
          and viruses that live within us. From <strong>digestion to mental health</strong>, this intricate ecosystem plays 
          a crucial role in shaping our overall well-being.</p>
          <br />
          <p>This talk will explore the interconnectedness 
          between our gut and brain, the potential of <strong>microbiome-based therapies</strong>, and the impact of <strong>modern 
          lifestyles</strong> on this vital ecosystem.</p>
          <br />
          <p>By understanding the importance of the microbiome, we can take 
          proactive steps to cultivate a <strong>healthy internal ecosystem</strong>. Adopt mindful eating practices, reduce 
          antibiotic use, and consider <strong>personalized</strong> microbiome-based interventions. By nurturing the microbiome, 
          we can unlock our <strong>full potential</strong> and improve our overall well-being.</p>
        </>
      ),
      image: "/empty-head.png",
      backgroundColor: "bg-blue-950",
      textColor: "text-orange-400",
    },
    {
      id: "impasse",
      title: "Impasse",
      shortDescription: "Finding Purpose and Strength in Stillness and Grief",
      fullDescription: (
        <>
          <p>In a fast-paced world where <strong>instant gratification</strong> is the norm, we’re often unprepared 
          for moments that force us to pause—especially in times of <strong>loss, uncertainty, or pain</strong>. This talk explores 
          how <strong>waiting</strong>, particularly in grief, can become a powerful tool for <strong>transformation, clarity, and resilience</strong>.</p>
          <br />
          <p>Grief is one of life’s longest waits—waiting for <strong>healing, answers, or a sense of wholeness</strong>. Yet, like all 
          forms of waiting, it can also be a <strong>departure point</strong>: a painful but necessary pause that teaches the value of 
          stillness and the lessons we’d miss in our rush to move on.</p>
          <br />
          <p>For college students, this stage of life is 
          often marked by <strong>excitement but also uncertainty, fear, and loss</strong>—whether it’s the death of a loved one, a 
          failed relationship, the loss of a work opportunity, or the struggle to find identity. These experiences 
          remind us that some things can’t be <strong>rushed or fixed</strong>.</p>
          <br />
          <p>By reframing grief as an <strong>active, strategic part</strong> of 
          our journey, this talk offers students a new perspective on <strong>challenges and loss</strong>. It reminds them that 
          <strong> waiting isn’t passive</strong>—it’s a time of preparation, reflection, and, ultimately, transformation.</p>
        </>
      ),
      image: "/red-drawing.png",
      backgroundColor: "bg-[#eb0028]",
      textColor: "text-black",
    },
    {
      id: "turning-point",
      title: "Turning Point",
      shortDescription: "Artivism: The Power of Art in Activism",
      fullDescription: (
        <>
          <p>In a world marked by growing <strong>societal divides</strong>, art has emerged as a powerful force for <strong>unity, understanding, 
          and social change</strong>. Through <strong>shared experiences and emotional engagement</strong>, art transcends boundaries, inspiring 
          action, building empathy, and fostering community.</p>
          <br />
          <p>This topic explores how <strong>artists harness their creativity </strong> 
          as a tool for activism, using <strong>storytelling, performance, and visual expression</strong> to address pressing societal 
          challenges and advocate for meaningful change.</p>
          <br />
          <p>From <strong>protest art</strong> to <strong>community-driven projects</strong>, discover how 
          <strong>artivism</strong> empowers individuals and movements to imagine—and create—a better world.</p>
        </>
      ),
      image: "/fishing.png",
      backgroundColor: "bg-green-900",
      textColor: "text-lime-100",
    },
    {
      id: "transformation",
      title: "Transformation",
      shortDescription: "Digital Nomads: Work with Freedom and Fulfillment",
      fullDescription: (
        <>
          <p>Imagine a world where <strong>work transcends geographical boundaries</strong>, allowing individuals to <strong>explore new cultures</strong>, 
          pursue their <strong>passions</strong>, and live life on their own terms. This reality is embraced by millions of <strong>digital nomads</strong>, 
          who challenge the traditional <strong>9-to-5 work model</strong> and redefine what it means to have a <strong>successful career</strong>.</p>
          <br />
          <p>However, 
          the <strong>digital nomad lifestyle</strong> is not without its controversies. As <strong>global companies</strong> push for employees to return to 
          the office, questions arise about the value of this lifestyle in terms of <strong>productivity, collaboration, and work-life balance</strong>.</p>
          <br />
          <p>This talk will delve into the complexities of <strong>digital nomadism</strong>, examining both its <strong>advantages and drawbacks </strong> 
          across different industries.</p>
        </>
      ),
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
          className="relative w-full min-h-[18rem] flex flex-col"
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
                      isSelected ? "md:mr-0" : "mt-24 md:mt-0"
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
