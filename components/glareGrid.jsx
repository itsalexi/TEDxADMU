import React, { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const LayoutGrid = ({ cards }) => {
  const [selected, setSelected] = useState(null);
  const [lastSelected, setLastSelected] = useState(null);

  const handleClick = (card) => {
    setLastSelected(selected);
    setSelected(card);
    console.log("clicked");
  };

  const handleOutsideClick = () => {
    setLastSelected(selected);
    setSelected(null);
  };

  return (
    <div className="w-full h-[40rem] p-10 grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-4 relative">
      {cards.map((card, i) => (
        <div key={i} className={cn(card.className, "")}>
          <GlareCard className="p-0">
            <motion.div
              onClick={() => handleClick(card)}
              className={cn(
                "relative overflow-hidden h-full w-full",
                selected?.id === card.id
                  ? "rounded-lg cursor-pointer"
                  : lastSelected?.id === card.id
                  ? "z-40 rounded-xl"
                  : "rounded-xl"
              )}
              layoutId={`card-${card.id}`}
            >
              <ImageComponent card={card} />

              {/* Title overlay in the middle of the card */}
              <motion.div
                layoutId={`title-${card.id}`}
                className="absolute inset-0 flex items-center justify-center z-10"
              >
                <p className="text-[#eb0028] tracking-[0.15em] font-norwester drop-shadow-2xl text-xl md:text-3xl">
                  {card.title}
                </p>
              </motion.div>
            </motion.div>
          </GlareCard>
        </div>
      ))}

      <AnimatePresence>
        {selected && (
          <motion.div
            className="absolute inset-0 z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Overlay: Click to close */}
            <motion.div
              className="absolute inset-0 bg-black opacity-0 z-10"
              onClick={handleOutsideClick}
              animate={{ opacity: selected?.id ? 0.3 : 0 }}
            />

            <motion.div
              layoutId={`card-${selected.id}`}
              className="relative w-full max-w-4xl h-3/4 mx-auto z-50 rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <SelectedCard selected={selected} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImageComponent = ({ card }) => {
  return (
    <motion.img
      layoutId={`image-${card.id}-image`}
      src={card.thumbnail}
      height="500"
      width="500"
      className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
      alt="thumbnail"
    />
  );
};

const SelectedCard = ({ selected }) => {
  return (
    <div className="bg-transparent h-full w-full flex flex-col justify-end rounded-lg shadow-2xl relative z-[60]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        className="absolute inset-0 h-full w-full bg-black opacity-60 z-10"
      />
      <motion.img
        layoutId={`image-${selected.id}-image`}
        src={selected.thumbnail}
        className="object-cover object-top absolute inset-0 h-full w-full transition duration-200"
        alt="thumbnail"
      />

      {/* Preserve title position from card view */}
      <motion.div
        layoutId={`title-${selected.id}`}
        className="absolute inset-0 grid grid-rows-2 z-20"
      >
        <div className="flex justify-center items-center mt-10 px-4 py-2 rounded text-[#eb0028] tracking-[0.15em] font-norwester drop-shadow-2xl text-2xl md:text-5xl">
          {selected.title}
        </div>
        <div></div>
      </motion.div>

      <motion.div
        layoutId={`content-${selected.id}`}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative px-8 pb-4 z-[70]"
      >
        {selected.content}

        {/* Learn More button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="my-4"
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Learn more about ${selected.title}`);
          }}
        >
          <Link href="/event-details">
            <span className="px-6 py-2 bg-white text-black font-medium rounded-md hover:bg-black hover:text-white transition-colors duration-300">
              Learn More
            </span>
          </Link>
        </motion.button>
      </motion.div>
    </div>
  );
};

export const GlareCard = ({ children, className }) => {
  const isPointerInside = useRef(false);
  const refElement = useRef(null);
  const state = useRef({
    glare: { x: 50, y: 50 },
    background: { x: 50, y: 50 },
    rotate: { x: 0, y: 0 },
  });

  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "48px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  };

  const backgroundStyle = {
    "--step": "5%",
    "--foil-svg": `url("data:image/svg+xml,%3Csvg width='26' height='26' viewBox='0 0 26 26' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2.99994 3.419C2.99994 3.419 21.6142 7.43646 22.7921 12.153C23.97 16.8695 3.41838 23.0306 3.41838 23.0306' stroke='white' stroke-width='5' stroke-miterlimit='3.86874' stroke-linecap='round' style='mix-blend-mode:darken'/%3E%3C/svg%3E")`,
    "--pattern": "var(--foil-svg) center/100% no-repeat",
    "--rainbow":
      "repeating-linear-gradient(0deg, rgb(255,119,115) calc(var(--step) * 1), rgba(255,237,95,1) calc(var(--step) * 2), rgba(168,255,95,1) calc(var(--step) * 3), rgba(131,255,247,1) calc(var(--step) * 4), rgba(120,148,255,1) calc(var(--step) * 5), rgb(216,117,255) calc(var(--step) * 6), rgb(255,119,115) calc(var(--step) * 7)) 0% var(--bg-y)/200% 700% no-repeat",
    "--diagonal":
      "repeating-linear-gradient(128deg, #0e152e 0%, hsl(180,10%,60%) 3.8%, hsl(180,10%,60%) 4.5%, hsl(180,10%,60%) 5.2%, #0e152e 10%, #0e152e 12%) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade":
      "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,255,255,0.1) 12%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.25) 120%) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "hue, hue, hue, overlay",
  };

  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  return (
    <div
      style={containerStyle}
      className={cn(
        "cursor-pointer relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform h-full w-full",
        className
      )}
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = 0.4;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };

        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5) * rotateFactor;
        rotate.y = (delta.y / 2) * rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;

        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current.style.setProperty("--duration", "0s");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current.style.setProperty("--r-x", `0deg`);
          refElement.current.style.setProperty("--r-y", `0deg`);
        }
      }}
    >
      <div className="h-full w-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-slate-800 hover:[--opacity:0.6] hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden">
        <div className="w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className="h-full w-full bg-slate-950">{children}</div>
        </div>
        <div className="pointer-events-none w-full h-full grid [grid-area:1/1] mix-blend-soft-light [clip-path:inset(0_0_1px_0_round_var(--radius))] opacity-[var(--opacity)] transition-opacity transition-background duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-background [background:radial-gradient(farthest-corner_circle_at_var(--m-x)_var(--m-y),_rgba(255,255,255,0.8)_10%,_rgba(255,255,255,0.65)_20%,_rgba(255,255,255,0)_90%)]" />
        <div
          className="pointer-events-none w-full h-full grid [grid-area:1/1] mix-blend-color-dodge opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))] [background-blend-mode:hue_hue_hue_overlay] [background:var(--pattern),_var(--rainbow),_var(--diagonal),_var(--shade)]"
          style={backgroundStyle}
        />
      </div>
    </div>
  );
};

// Example usage component
export function GlareGrid() {
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
        threshold: 0.2,
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
  const cards = [
    {
      id: 1,
      title: "Curiosity",
      content: (
        <div>
          <h3 className="text-lg mt-4 max-w-lg font-semibold">
            Microbiome: The Ecosystem Inside You
          </h3>
          <h4 className="font-normal text-base max-w-lg italic">
            Nutrition and Dietetics, Lifestyle
          </h4>
          <p className="font-normal text-base my-2 max-w-lg text-neutral-200">
            This talk will explore the interconnectedness between our gut and
            brain, the potential of microbiome-based therapies, and the impact
            of modern lifestyles on this vital ecosystem.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: "/maze-elevated.jpg",
    },
    {
      id: 2,
      title: "Impasse",
      content: (
        <div>
          <h3 className="text-lg mt-4 max-w-lg font-semibold">
            Finding Purpose and Strength in Stillness and Grief
          </h3>
          <p className="font-normal text-base my-2 max-w-lg text-neutral-200">
            This talk explores how waiting, particularly in grief, can become a
            powerful tool for transformation, clarity, and resilience.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: "/stair-gap.jpg",
    },
    {
      id: 3,
      title: "Turning Point",
      content: (
        <div>
          <h3 className="text-lg mt-4 max-w-lg font-semibold">
            Artivism: The Power of Art in Activism
          </h3>
          <p className="font-normal text-base my-2 max-w-lg text-neutral-200">
            This topic explores how artists harness their creativity as a tool
            for activism, using storytelling, performance, and visual expression
            to address pressing societal challenges and advocate for meaningful
            change.
          </p>
        </div>
      ),
      className: "col-span-1",
      thumbnail: "/fork-road-ill.png",
    },
    {
      id: 4,
      title: "Transformation",
      content: (
        <div>
          <h3 className="text-lg mt-4 max-w-lg font-semibold">
            Digital Nomads: Work with Freedom and Fulfillment
          </h3>
          <p className="font-normal text-base my-2 max-w-lg text-neutral-200">
            The talk explores transformation, encouraging individuals to reflect
            on whether digital nomadism aligns with their personal and
            professional evolution, and how the shift in mindset and lifestyle
            can lead to a new way of thriving in a complex and interconnected
            world.
          </p>
        </div>
      ),
      className: "md:col-span-2",
      thumbnail: "/walking.jpg",
    },
  ];
  return (
    <div
      ref={contentRef}
      className={`min-h-screen w-full transition-all duration-1000 transform  ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0"
      }`}
    >
      <LayoutGrid cards={cards} />
    </div>
  );
}
