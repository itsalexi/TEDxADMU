import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-black to-gray-900 text-white py-14 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo and Tagline */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/">
              <Image src="/logo-white.png" alt="TEDx" width={250} height={0} />
            </Link>
            <p className="text-gray-400 mt-2">
              Independently organized TED event
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col space-y-4 text-xl font-bold">
            <Link
              href="/"
              className="text-gray-300  hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-300  hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              About TEDx
            </Link>
            <Link
              href="/event-details"
              className="text-gray-300  hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              Event Details
            </Link>
            <Link
              href="/core-team"
              className="text-gray-300  hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              Our Story
            </Link>
            <Link
              href="/shop"
              className="text-gray-300  hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              Shop
            </Link>
            <Link
              href="/register"
              className="text-gray-300 hover:text-[#eb0028] transition-transform transform hover:scale-105"
            >
              Register Now
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mt-8 md:mt-0">
            <Link
              href="https://www.instagram.com/tedxateneodemanilau?igsh=a21xN2xqMzc1NGh6"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-400 hover:text-[#eb0028] transition-transform transform hover:scale-125 text-2xl" />
            </Link>
            <Link
              href="https://www.facebook.com/share/1DENrPZB5y/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-400 hover:text-[#eb0028] transition-transform transform hover:scale-125 text-2xl" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/tedxateneodemanilau/posts/?feedView=all"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-gray-400 hover:text-[#eb0028] transition-transform transform hover:scale-125 text-2xl" />
            </Link>
          </div>

          {/* Copyright Notice */}
          <div className="text-center md:text-right mt-8 md:mt-0">
            <p className="text-gray-400">
              © 2025 TEDxAteneodeManilaU. All rights reserved.
            </p>
            <p className="text-gray-400 mt-2">
              This independent TEDx event is operated under license from TED.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
