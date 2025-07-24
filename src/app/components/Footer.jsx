// components/Footer.jsx
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#274D7C] lg:h-[261px] text-white">
      {/* top links */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row md:justify-between md:items-start space-y-12 md:space-y-0">
        {/* logo */}
        <div className="flex-shrink-0">
          <Image
            src="/locka_files/logo2.png"
            alt="AssetLocka logo"
            width={200}
            height={40}
          />
        </div>

        {/* link sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10 ms-5">
          {/* About */}
          <div>
            <h3 className="font-semibold mb-3 underline">About</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  About AssetLocka
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Assets
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3 underline">Contact</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href="mailto:support@assetlocka.com"
                  className="hover:underline"
                >
                  Email us
                </Link>
              </li>
              <li>
                <Link href="tel:+2347035361770" className="hover:underline">
                  Call us
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-3 underline">Services</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:support@assetlocka.com"
                  className="hover:underline"
                >
                  Email us
                </Link>
              </li>
              <li>
                <Link href="tel:+2347035361770" className="hover:underline">
                  Call us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-3 underline">Legal</h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link href="#" className="hover:underline">
                  Code of ethics
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  Insurance
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:underline">
                  SLAs
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* newsletter signup */}
        <div className="w-full sm:w-1/2 md:w-auto">
          <h3 className="font-semibold mb-3">
            Want to keep hearing <br /> from us?
          </h3>
          <form className="flex items-center">
            {/* Input */}
            <input
              type="email"
              placeholder="Enter your email"
              className="
              flex-1
              px-4 py-3
              rounded-l-full
              bg-[#D8D8DD]/20
              placeholder-white/80
              text-white
              focus:outline-none focus:ring-2 focus:ring-transparent
            "
            />

            {/* Button */}
            <button
              type="submit"
              className="-ms-5
              px-6 py-3
              rounded-full
              bg-[#489AFF]
              text-white font-semibold
              transition
            "
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* bottom bar */}
      <div className="bg-[#489AFF] lg:h-[51px] flex justify-center items-center">
        <div className="max-w-7xl mx-auto gap-10  px-4 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-black space-y-4 md:space-y-0">
          {/* social icons */}
          <div className="flex gap-4 text-lg">
            <Link href="https://facebook.com">
              <FaFacebookF className="hover:text-gray-200" />
            </Link>
            <Link href="https://instagram.com">
              <FaInstagram className="hover:text-gray-200" />
            </Link>
            <Link href="https://twitter.com">
              <FaTwitter className="hover:text-gray-200" />
            </Link>
            <Link href="https://linkedin.com">
              <FaLinkedinIn className="hover:text-gray-200" />
            </Link>
          </div>

          {/* footer legal links */}
          <div className="flex flex-wrap items-center gap-6">
            <span>@ AssetLocka 2025</span>
            <Link href="#" className="hover:underline">
              Cookie Policy
            </Link>
            <Link href="#" className="hover:underline">
              map
            </Link>
            <Link href="#" className="hover:underline">
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
