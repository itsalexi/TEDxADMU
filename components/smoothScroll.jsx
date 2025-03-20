import Lenis from "@studio-freight/lenis";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
    <div>
      <Hero />
    </div>
  );
};

const SECTION_HEIGHT = 5500;

const Hero = () => {
  return (
    <div
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <ParallaxImages />
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
      className="sticky top-0 h-screen w-full -z-1"
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

const ParallaxImages = () => {
  return (
    <div className="px-4 2xl:pr-40 pt-[200px]">
      <ParallaxImg
        src="/shirt-light-back.png"
        alt="And example of a space launch"
        start={-200}
        end={200}
        text="Navigating complexity."
        className="ml-1 w-1/2"
      />
      <ParallaxImg
        src="/shirt-light-front.png"
        alt="An example of a space launch"
        start={200}
        end={-250}
        text="Unlocking paths."
        className="mx-auto w-1/2"
      />
      <ParallaxImg
        src="/shirt-dark-front.png"
        alt="Orbiting satellite"
        start={-200}
        end={200}
        text="Inspiring change."
        className="ml-auto w-1/2"
      />
      <ParallaxImg
        src="/shirt-dark-back.png"
        alt="Orbiting satellite"
        start={0}
        end={-500}
        text="Out of the Labyrinthe."
        className="ml-24 w-1/2"
      />
    </div>
  );
};

const ParallaxImg = ({ className, alt, src, start, end, text }) => {
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
      className="flex items-center justify-between w-full"
      ref={ref}
      style={{ transform, opacity }}
    >
      <Image
        src={src}
        alt={alt}
        className={`${className} transition-transform duration-500 hover:scale-105`}
        height={100}
        width={100}
      />
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-white z-50">{text}</h2>
    </motion.div>
  );
};

const ParallaxCards = () => {
  return (
    <div className="mx-auto grid md:grid-cols-2 gap-6 px-4 pt-[100px]">
      <ParallaxCard
        product={productData[0]}
        start={-200}
        end={200}
        className=""
      />
      <ParallaxCard
        product={productData[1]}
        start={-200}
        end={200}
        className=""
      />
      <ParallaxCard
        product={productData[2]}
        start={-200}
        end={200}
        className=""
      />
      <ParallaxCard
        product={productData[3]}
        start={-200}
        end={200}
        className=""
      />
    </div>
  );
};

const ParallaxCard = ({ product, start, end }) => {
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
      className={`bg-zinc-800 bg-opacity-40 rounded-xl overflow-hidden shadow-lg mb-32 flex items-center justify-between`}
    >
      <div className="max-w-[40%] overflow-hidden">
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
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-bold text-white">{product.price}</span>
          <Link
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white max-lg:text-sm font-bold py-1 lg:py-2 lg:px-4 px-2 rounded transition-all duration-300 hover:scale-105"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
