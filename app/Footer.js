import React from "react";
import Link from 'next/link';
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Link href="/">
              <Image src="/logo-white.png" alt="TEDx" width={250} height={0} />
            </Link>
            <p className="text-gray-400 mt-2 ml-4">
              Independently organized TED event
            </p>
          </div>
          <div>
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
