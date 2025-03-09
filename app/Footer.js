import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Logo and Tagline */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <Link href="/">
              <Image src="/logo-white.png" alt="TEDx" width={250} height={0} />
            </Link>
            <p className="text-gray-400 mt-2">
              Independently organized TED event
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex space-x-6 mb-8 md:mb-0">
            <div className="text-gray-400">Follow us on: </div>
            <Link
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-gray-400 hover:text-red-500 transition text-2xl" />
            </Link>
            <Link
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="text-gray-400 hover:text-red-500 transition text-2xl" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXTwitter className="text-gray-400 hover:text-red-500 transition text-2xl" />
            </Link>
          </div>

          {/* Copyright Notice */}
          <div className="text-center md:text-right">
            <p className="text-gray-400">
              © 2025 TEDxAteneoDeManilaU. All rights reserved.
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
