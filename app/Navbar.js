"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const navRef = useRef(null);
  const aboutMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        aboutMenuRef.current &&
        !aboutMenuRef.current.contains(event.target)
      ) {
        setAboutDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-black/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        } p-4 sm:p-6`}
      >
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
              <div className="ml-10 flex items-baseline space-x-8 text-xl">
                <Link href="/">
                  <span className="text-gray-300 hover:text-[#eb0028] px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Home
                  </span>
                </Link>

                {/* About Dropdown */}
                <div
                  className="relative"
                  ref={aboutMenuRef}
                  onMouseEnter={() => setAboutDropdownOpen(true)}
                  onMouseLeave={() => setAboutDropdownOpen(false)}
                >
                  <div
                    className="text-gray-300 hover:text-[#eb0028] px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300 flex items-center gap-1"
                    onClick={() => setAboutDropdownOpen(!aboutDropdownOpen)}
                  >
                    <Link
                        href="/event-details"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        <span className="block px-4 py-3 text-gray-300 hover:text-[#eb0028] transition duration-300">
                          About
                        </span>
                      </Link>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 transition-transform duration-300 ${
                        aboutDropdownOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute left-0 pt-2 w-56 rounded-md shadow-lg bg-black/95 backdrop-blur-sm ring-1 ring-black ring-opacity-5 font-medium transition-all duration-300 ${
                      aboutDropdownOpen
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      <Link
                        href="/about"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        <span className="block px-4 py-3 text-gray-300 hover:text-[#eb0028] transition duration-300">
                          About TEDx
                        </span>
                      </Link>
                      <Link
                        href="/event-details"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        <span className="block px-4 py-3 text-gray-300 hover:text-[#eb0028] transition duration-300">
                          Event Details
                        </span>
                      </Link>
                      <Link
                        href="/core-team"
                        onClick={() => setAboutDropdownOpen(false)}
                      >
                        <span className="block px-4 py-3 text-gray-300 hover:text-[#eb0028] transition duration-300">
                          Our Story
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>

                <Link href="/shop">
                  <span className="text-gray-300 hover:text-[#eb0028] px-3 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Shop
                  </span>
                </Link>
                <Link href="/register">
                  <span className="bg-[#eb0028] text-white hover:bg-red-700 px-4 py-2 rounded-md font-medium cursor-pointer transition duration-300">
                    Register Now
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:hidden">
              <button
                className={`${
                  mobileMenuOpen ? "text-[#eb0028]" : "text-gray-300"
                } hover:text-[#eb0028] inline-flex items-center justify-center p-2 rounded-md transition-all duration-300`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="relative w-6 h-5">
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? "rotate-45 top-2" : "rotate-0 top-0"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? "opacity-0" : "opacity-100 top-2"
                    }`}
                  ></span>
                  <span
                    className={`absolute h-0.5 w-6 bg-current transform transition-all duration-300 ${
                      mobileMenuOpen ? "-rotate-45 top-2" : "rotate-0 top-4"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div
        className={`lg:hidden fixed inset-0 z-40 backdrop-blur-xl bg-black/95 transform transition-all duration-500 ease-in-out ${
          mobileMenuOpen
            ? "translate-y-0 opacity-100"
            : "translate-y-[-100%] opacity-0"
        }`}
        style={{ top: "0", height: "100vh" }}
      >
        <div className="flex flex-col h-full justify-center items-center space-y-8 pt-16">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span
              className={`text-gray-100 hover:text-[#eb0028] px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              Home
            </span>
          </Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>
            <span
              className={`text-gray-100 hover:text-[#eb0028] px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              About
            </span>
          </Link>
          <Link href="/event-details" onClick={() => setMobileMenuOpen(false)}>
            <span
              className={`text-gray-100 hover:text-[#eb0028] px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "250ms" }}
            >
              Event Details
            </span>
          </Link>
          <Link href="/core-team" onClick={() => setMobileMenuOpen(false)}>
            <span
              className={`text-gray-100 hover:text-[#eb0028] px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              Our Story
            </span>
          </Link>
          <Link href="/shop" onClick={() => setMobileMenuOpen(false)}>
            <span
              className={`text-gray-100 hover:text-[#eb0028] px-3 py-4 text-2xl font-light tracking-wider cursor-pointer transition-all duration-500 hover:pl-6 transform ${
                mobileMenuOpen
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              Shop
            </span>
          </Link>
          <div
            className={`pt-8 transition-all duration-700 transform ${
              mobileMenuOpen
                ? "translate-y-0 opacity-100 scale-100"
                : "translate-y-4 opacity-0 scale-95"
            }`}
            style={{ transitionDelay: "500ms" }}
          >
            <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
              <span className="bg-[#eb0028] text-white hover:bg-red-600 px-8 py-3 rounded-md text-xl font-medium cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-red-500/20 relative overflow-hidden group">
                <span className="relative z-10">Register Now</span>
                <span className="absolute bottom-0 left-0 w-full h-0 bg-red-700 transition-all duration-300 group-hover:h-full -z-0"></span>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
