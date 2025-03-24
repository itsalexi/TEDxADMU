"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const TopicsDropdown = () => {
  const [selectedTopic, setSelectedTopic] = React.useState(null);

  const topics = [
    {
      id: "curiosity",
      title: "Curiosity",
      shortDescription: "Microbiome: The Ecosystem Inside You",
      fullDescription:
        "The microbiome is the diverse community of microorganisms which includes bacteria, fungi, and viruses that live within us. From digestion to mental health, this intricate ecosystem plays a crucial role in shaping our overall well-being. This talk will explore the interconnectedness between our gut and brain, the potential of microbiome-based therapies, and the impact of modern lifestyles on this vital ecosystem. By understanding the importance of the microbiome, we can take proactive steps to cultivate a healthy internal ecosystem. Adopt mindful eating practices, reduce antibiotic use, and consider personalized microbiome-based interventions. By nurturing the microbiome, we can unlock our full potential and improve our overall well-being.",
      image: "/curiosity.jpg",
      color: "from-red-600 to-orange-500",
      textColor: "text-orange-500",
    },
    {
      id: "impasse",
      title: "Impasse",
      shortDescription: "Finding Purpose and Strength in Stillness and Grief",
      fullDescription:
        "In a fast-paced world where instant gratification is the norm, we’re often unprepared for moments that force us to pause—especially in times of loss, uncertainty, or pain. This talk explores how waiting, particularly in grief, can become a powerful tool for transformation, clarity, and resilience. Grief is one of life’s longest waits—waiting for healing, answers, or a sense of wholeness. Yet, like all forms of waiting, it can also be a departure point: a painful but necessary pause that teaches the value of stillness and the lessons we’d miss in our rush to move on. For college students, this stage of life is often marked by excitement but also uncertainty, fear, and loss—whether it’s the death of a loved one, a failed relationship, the loss of a work opportunity, or the struggle to find identity. These experiences remind us that some things can’t be rushed or fixed. By reframing grief as an active, strategic part of our journey, this talk offers students a new perspective on challenges and loss. It reminds them that waiting isn’t passive—it’s a time of preparation, reflection, and, ultimately, transformation.",
      image: "/impasse.jpg",
      color: "from-blue-600 to-indigo-500",
      textColor: "text-blue-500",
    },
    {
      id: "turning-point",
      title: "Turning Point",
      shortDescription: "Artivism: The Power of Art in Activism",
      fullDescription:
        "In a world marked by growing societal divides, art has emerged as a powerful force for unity, understanding, and social change. Through shared experiences and emotional engagement, art transcends boundaries, inspiring action, building empathy, and fostering community. This topic explores how artists harness their creativity as a tool for activism, using storytelling, performance, and visual expression to address pressing societal challenges and advocate for meaningful change. From protest art to community-driven projects, discover how artivism empowers individuals and movements to imagine—and create—a better world.",
      image: "/turning-point.jpg",
      color: "from-green-600 to-emerald-500",
      textColor: "text-green-500",
    },
    {
      id: "transformation",
      title: "Transformation",
      shortDescription: "Digital Nomads: Work with Freedom and Fulfillment",
      fullDescription:
        "Imagine a world where work transcends geographical boundaries, allowing individuals to explore new cultures, pursue their passions, and live life on their own terms. This reality is embraced by millions of digital nomads, who challenge the traditional 9-to-5 work model and redefine what it means to have a successful career. However, the digital nomad lifestyle is not without its controversies. As global companies push for employees to return to the office, questions arise about the value of this lifestyle in terms of productivity, collaboration, and work-life balance. This talk will delve into the complexities of digital nomadism, examining both its advantages and drawbacks across different industries.",
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
  // Add a transition config for smoother animations
  const transition = {
    type: "spring",
    stiffness: 100,
    damping: 20,
    duration: 1,
  };

  return (
    <motion.div
      layout
      className={cn(
        "relative overflow-hidden cursor-pointer border-b border-gray-800",
        isSelected ? "h-[36rem]" : "h-[18rem]"
      )}
      onClick={onClick}
      initial={false}
      transition={transition}
    >
      <motion.div
        className={cn(
          "relative w-full h-full flex flex-col bg-gradient-to-b",
          `${topic.color}`
        )}
        transition={transition}
      >
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black z-10 bg-opacity-50"></div>
          <div className="h-full w-full relative">
            <div className="w-full h-full bg-gradient-to-b absolute z-10 from-black/25 to-black/55"></div>
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
            "relative z-20 w-full flex flex-col p-4 md:p-8",
            isSelected ? "justify-center" : "justify-start"
          )}
        >
          {/* Title always visible */}
          <div className="flex items-center justify-between">
            <motion.h2
              layout
              transition={transition}
              className={cn(
                "font-bold",
                isSelected
                  ? "text-5xl md:text-6xl lg:text-7xl"
                  : "text-4xl md:text-5xl",
                "text-white"
              )}
            >
              {topic.title}
            </motion.h2>

            <motion.div
              animate={{ rotate: isSelected ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-white"
            >
              <ChevronDown className="h-6 w-6" />
            </motion.div>
          </div>

          {/* Description - without exit animation for immediate disappearance */}
          <AnimatePresence mode="sync" initial={false}>
            {isSelected ? (
              <motion.div
                key="full-description"
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.3 }}
                className="text-white mt-8 max-w-3xl"
              >
                <p className="text-xl md:text-2xl lg:text-3xl mb-6 font-light">
                  {topic.shortDescription}
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed">
                  {topic.fullDescription}
                </p>
              </motion.div>
            ) : (
              <motion.p
                key="short-description"
                className="text-white text-sm md:text-base mt-2"
              >
                {topic.shortDescription}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TopicsDropdown;
