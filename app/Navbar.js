'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="top-0 w-full z-50 absolute p-10">
        <div className="container mx-auto">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 z-1">
              <Link href="/">
                <Image
                  src="/logo-white.png"
                  alt="TEDx"
                  width={300}
                  height={0}
                  className="w-auto h-16 md:h-20"
                />
              </Link>
            </div>
            <div className="hidden lg:block text-base">
              <div className="flex justify-evenly space-x-6 xl:text-xl">
                <Link href="/">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Home
                  </span>
                </Link>
                <Link href="/about">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    About TEDx
                  </span>
                </Link>
                <Link href="/core-team">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Get to Know the Team
                  </span>
                </Link>
                <Link href="/shop">
                  <span className="text-gray-300 hover:text-red-500 px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Shop
                  </span>
                </Link>
                <Link href="/register">
                  <span className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Register Now
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className="text-gray-300 hover:text-red-500 inline-flex items-center justify-center p-2 rounded-md transition duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 bg-black bg-opacity-95 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
       
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <span onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              About TEDx
            </span>
          </Link>
          <Link href="/core-team">
            <span onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Get to Know the Core Team
            </span>
          </Link>
          <Link href="/shop">
            <span onClick={() => setMobileMenuOpen(false)} className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Shop
            </span>
          </Link>
          <Link href="/register">
            <span onClick={() => setMobileMenuOpen(false)} className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Register Now
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
