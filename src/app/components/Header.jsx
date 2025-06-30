"use client";
import { useState, useEffect } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

import Link from "next/link";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";

export default function Header() {
  const navHandler = () => {
    setMenuOpen(false);
  };
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10); // adjust scroll distance if needed
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 lg:px-[1.5rem]  transition-colors duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 pt-5">
        <nav className="bg-transparent flex justify-between items-center py-3">
          <Link href="/">
            <Image
              src="/locka_files/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-10"
            />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-12">
            <li>
              <Link
                href="/"
                className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500 tracking-wider"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500 tracking-wide"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500 tracking-wide"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500 tracking-wide"
              >
                Company
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-sm font-semibold text-blueGray-600 hover:text-blueGray-500 tracking-wide"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex space-x-4">
            <Link href="/login" className="btn-accent hover-up-2">
              Log In
            </Link>
            <Link href="/register" className="btn-primary hover-up-2">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu */}
          <div
            className={`fixed top-0 left-0 h-full w-[80%] bg-white shadow-lg transition-transform duration-300 z-40 
    ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
          >
            <div className="flex px-4 justify-between mt-6">
              <Link href="/">
                <Image
                  src="/locka_files/logo.svg"
                  alt="Logo"
                  width={120}
                  height={40}
                  className="h-10"
                />
              </Link>

              <IoMdClose
                onClick={toggleMenu}
                size={26}
                className="text-blue-500"
              />
            </div>
            <ul className="p-6 flex flex-col gap-7 font-medium list-disc list-inside h-full overflow-y-scroll">
              <Link href="/">
                <li onClick={navHandler}>Home</li>
              </Link>
              <li
                onClick={() => {
                  setMenuOpen(false);
                  handleCategoryClick();
                }}
              >
                About Us
              </li>
              <li
                onClick={() => {
                  setMenuOpen(false);
                  handleProductClick();
                }}
              >
                Services
              </li>
              <Link href="/shop">
                <li onClick={navHandler}>Portfolio</li>
              </Link>
              <Link href="/customize">
                <li onClick={navHandler}>Pricing</li>
              </Link>

              <Link href="/review-order">
                <li onClick={navHandler}>Team</li>
              </Link>
              <Link href="/review-order">
                <li onClick={navHandler}>Blog</li>
              </Link>
              <Link href="/review-order">
                <li onClick={navHandler}>Faqs</li>
              </Link>
              <Link href="/review-order">
                <li onClick={navHandler}>Testimonial</li>
              </Link>
              <Link href="/review-order">
                <li onClick={navHandler}>Contact Us</li>
              </Link>

              <Link href="/login" className="btn-accent hover-up-2">
                Log In
              </Link>

              <Link href="/register" className="btn-primary hover-up-2">
                Sign Up
              </Link>
              <div>
                <p className="text-sm mt-8">
                  Get in touch{" "}
                  <span className="text-blue-600  cursor-pointer">
                    contact@assetlocka.com
                  </span>
                </p>
                <div className="flex gap-5 text-blue-400 text-lg mt-4 pb-20">
                  <FaFacebookF /> <FaInstagram />
                </div>
              </div>
            </ul>
          </div>

          {/* Optional background overlay */}
          {menuOpen && <></>}
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="navbar-burger flex items-center py-2 px-3 text-blue-500 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded"
            >
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
