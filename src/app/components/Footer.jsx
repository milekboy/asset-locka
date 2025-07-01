"use client";
import Link from "next/link";
import useHasMounted from "./hooks/useHasMounted";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";

export default function Footer() {
  const hasMounted = useHasMounted();

  return (
    <div
      // {...(hasMounted ? { "data-aos": "fade-up" } : {})}
      className="w-full lg:flex h-96 bg-gray-100 lg:bg-white py-5 lg:py-0"
    >
      <div className="lg:w-1/2 lg:px-[2.5rem] px-[1rem] flex items-center">
        <div className="space-y-5">
          <Link href="/">
            <Image
              src="/locka_files/logo.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-10"
            />
          </Link>
          <p className="text-sm">
            Subscribe and stay fully connected with products.
          </p>
          <p>
            support@assetLocka.com
            <br />
            234-703-536-1770
          </p>
          <p>© 2025. All rights reserved.</p>
          <FaFacebookF className="text-blue-400 text-lg" />
        </div>
      </div>
      <div className="lg:w-1/2 lg:px-[2.5rem] px-[1rem] lg:flex justify-center mt-5 lg:mt-0 bg-gray-100 items-center">
        <div className="lg:flex gap-14">
          <ul className="space-y-4 text-gray-400 leading-8">
            <li className="text-black font-bold text-lg">About</li>
            <li>About Us</li>
            <li>Portfolio</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
          <ul className="space-y-4 text-gray-400 leading-8">
            <li className="text-black font-bold text-lg">Quick Links</li>
            <li>Team</li>
            <li>Pricing</li>
            <li>Testimonials</li>
            <li>Faqs</li>
          </ul>
          <ul className="space-y-4 text-gray-400 leading-8">
            <li className="text-black font-bold text-lg">Blog</li>
            <li>Business</li>
            <li>Marketing</li>
            <li>Single</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
