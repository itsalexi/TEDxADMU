"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import Link from "next/link";

import Floating, { FloatingElement } from "./parallax-floating";

const images = [
  {
    url: "/stickers/2.png",
  },
  {
    url: "/stickers/3.png",
  },
  {
    url: "/stickers/4.png",
  },
  {
    url: "/stickers/5.png",
  },
  {
    url: "/stickers/6.png",
  },
  {
    url: "/stickers/7.png",
  },
  {
    url: "/stickers/8.png",
  },
  {
    url: "/stickers/9.png",
  },
  {
    url: "/shirts/Design 1 Black Back.png",
  },
  {
    url: "/shirts/Design 1 Black Front.png",
  },
  {
    url: "/shirts/Design 2 Cream Back.png",
  },
  {
    url: "/shirts/Design 2 Cream Front.png",
  },
];

const ShopHero = () => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "img",
      { opacity: [0, 1] },
      { duration: 0.5, delay: stagger(0.15) }
    );
  }, []);

  return (
    <div
      className="flex w-full h-full min-h-[750px] justify-center items-center bg-black overflow-hidden"
      ref={scope}
    >
      <motion.div
        className="z-10 text-center space-y-4 items-center flex flex-col"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.88, delay: 1.5 }}
      >
        <p className="text-5xl md:text-7xl text-white font-calendas italic">
          Labyrinthine
        </p>
        <Link
          href="https://google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:scale-110 transition-transform bg-red-600 rounded-full py-2 w-20 cursor-pointer"
        >
          Buy Now
        </Link>
      </motion.div>

      <Floating sensitivity={-1} className="overflow-hidden">
        <FloatingElement depth={0.5} className="top-[36rem] left-[23%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[6].url}
            className="w-24 h-24 md:w-36 md:h-36 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-slate-400 shadow-md"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[27rem] left-[32%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[1].url}
            className="w-28 h-20 md:w-36 md:h-28 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[15rem] left-[60%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[2].url}
            className="w-40 h-32 md:w-52 md:h-40 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={1} className="top-[36rem] left-[83%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[3].url}
            className="w-40 h-24 md:w-44 md:h-32 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={1} className="top-[12rem] left-[25%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[4].url}
            className="w-32 h-32 md:w-44 md:h-44 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={2} className="top-[20rem] left-[77%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[5].url}
            className="w-28 h-28 md:w-48 md:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>

        <FloatingElement depth={4} className="top-[19rem] left-[19%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[10].url}
            className="w-64 md:w-64 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
        <FloatingElement depth={4} className="top-[30rem] left-[60%]">
          <motion.img
            initial={{ opacity: 0 }}
            src={images[8].url}
            className="w-64 md:w-64 h-full object-cover hover:scale-105 duration-200 cursor-pointer transition-transform"
          />
        </FloatingElement>
       
      </Floating>
    </div>
  );
};

export { ShopHero };
