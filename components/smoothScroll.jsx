import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";

export const SmoothScrollHero = () => {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.05, // Smoothness factor
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-zinc-950">
      <Hero />
    </div>
  );
};

const SECTION_HEIGHT = 5000;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxCards />
    </div>
  );
};

const CenterImage = () => {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["170%", "100%"]
  );
  const opacity = useTransform(
    scrollY,
    [SECTION_HEIGHT, SECTION_HEIGHT + 500],
    [1, 0]
  );

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        opacity,
        backgroundImage: "url(/maze-bg.jpg)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    />
  );
};

// Sample product data
const productData = [
  {
    id: 1,
    title: "Light T-Shirt (Back)",
    description: "Premium cotton TEDxAteneodeManilaU t-shirt in light color",
    price: "$29.99",
    image: "/shirt-light-back.png",
    alt: "TEDxAteneodeManilaU T-shirt Light back view",
  },
  {
    id: 2,
    title: "Light T-Shirt (Front)",
    description: "Official TEDx design on soft, breathable fabric",
    price: "$29.99",
    image: "/shirt-light-front.png",
    alt: "TEDxAteneodeManilaU T-shirt Light front view",
  },
  {
    id: 3,
    title: "Dark T-Shirt (Front)",
    description: "Bold TEDx design stands out on this premium dark shirt",
    price: "$32.99",
    image: "/shirt-dark-front.png",
    alt: "TEDxAteneodeManilaU T-shirt dark front view",
  },
  {
    id: 4,
    title: "Dark T-Shirt (Back)",
    description: "Stylish back design on our signature dark t-shirt",
    price: "$32.99",
    image: "/shirt-dark-back.png",
    alt: "TEDxAteneodeManilaU T-shirt dark back view",
  },
];

const ParallaxCards = () => {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-[200px]">
      <ParallaxCard
        product={productData[0]}
        start={-200}
        end={200}
        className="w-full"
      />
      <ParallaxCard
        product={productData[1]}
        start={200}
        end={-250}
        className="mx-auto w-full"
      />
      <ParallaxCard
        product={productData[2]}
        start={-200}
        end={200}
        className="ml-auto w-full"
      />
      <ParallaxCard
        product={productData[3]}
        start={0}
        end={-200}
        className="ml-24 w-full"
      />
    </div>
  );
};

const ParallaxCard = ({ className, product, start, end }) => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`${start}px end`, `end ${end * -1}px`],
  });

  const opacity = useTransform(scrollYProgress, [0.75, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0.75, 1], [1, 0.85]);

  const y = useTransform(scrollYProgress, [0, 1], [start, end]);
  const transform = useMotionTemplate`translateY(${y}px) scale(${scale})`;

  return (
    <motion.div
      ref={ref}
      style={{ transform, opacity }}
      className={`${className} bg-zinc-800 bg-opacity-0 rounded-xl overflow-hidden shadow-lg mb-32 flex items-center`}
    >
      <div className="overflow-hidden">
        <motion.img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover object-center"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{product.title}</h3>
        <p className="text-zinc-300 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-white">{product.price}</span>
          <Link
            href="https://google.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-all duration-300"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};