'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="top-0 w-full z-50 absolute p-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/logo-white.png"
                  alt="TEDx"
                  width={300}
                  height={0}
                />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8 text-xl">
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
            <div className="md:hidden">
              <button
                className="text-gray-300 hover:text-red-500 inline-flex items-center justify-center p-2 rounded-md transition duration-300"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6"
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
        className={`md:hidden fixed inset-0 z-40 bg-black bg-opacity-95 transform ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`}
        style={{ top: '64px' }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Home
            </span>
          </Link>
          <Link href="/about">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              About
            </span>
          </Link>
          <Link href="/shop">
            <span className="text-gray-300 hover:text-red-500 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Shop
            </span>
          </Link>
          <Link href="/apply">
            <span className="bg-red-600 text-white hover:bg-red-700 block px-3 py-2 rounded-md text-base font-medium cursor-pointer">
              Apply Now
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
