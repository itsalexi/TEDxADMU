'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <nav 
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-transparent'
        } p-4 sm:p-6`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="w-32 xs:w-40 sm:w-48 relative">
                  <Image
                    src="/logo-white.png"
                    alt="TEDx"
                    width={300}
                    height={100}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </Link>
            </div>
            <div className="hidden lg:block">
              <div className="ml-10 flex items-baseline xl:space-x-8 xl:text-xl text-base space-x-6">
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
                className={`${mobileMenuOpen ? 'text-red-500' : 'text-gray-300'} hover:text-red-500 inline-flex items-center justify-center p-2 rounded-md transition-all duration-300`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5">
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'rotate-45 top-2' : 'rotate-0 top-0'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0' : 'opacity-100 top-2'
                  }`}></span>
                  <span className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    mobileMenuOpen ? '-rotate-45 top-2' : 'rotate-0 top-4'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`lg:hidden fixed inset-0 z-40 backdrop-blur-xl bg-black/95 transform transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'
      }`} style={{ top: '0', height: '100vh' }}>
        <div className="flex flex-col h-full justify-center items-center space-y-8 pt-16">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span className={`text-gray-100 hover:text-red-500 px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`} style={{ transitionDelay: '100ms' }}>
              Home
            </span>
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            <span className={`text-gray-100 hover:text-red-500 px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`} style={{ transitionDelay: '200ms' }}>
              About
            </span>
          </Link>
          <Link href="/core-team" onClick={() => setMobileMenuOpen(false)}>
            <span className={`text-gray-100 hover:text-red-500 px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`} style={{ transitionDelay: '300ms' }}>
              Get to Know the Team
            </span>
          </Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
            <span className={`text-gray-100 hover:text-red-500 px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
              mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`} style={{ transitionDelay: '400ms' }}>
              Shop
            </span>
          </Link>
          <div className={`pt-8 transition-all duration-700 transform ${
            mobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-4 opacity-0 scale-95'
          }`} style={{ transitionDelay: '500ms' }}>
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <span className="bg-red-600 text-white hover:bg-red-700 px-8 py-3 rounded-md text-xl font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group">
                <span className="relative z-10">Register Now</span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-red-800 transition-all duration-300 group-hover:h-full -z-0"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}