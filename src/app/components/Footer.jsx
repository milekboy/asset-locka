import Link from "next/link";
import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
export default function Footer() {
  return (
    <div className="w-[100%] lg:flex h-96 bg-gray-100 lg:bg-white py-5 lg:py-0">
      <div
        data-aos="fade-up"
        className="lg:w-[50%] lg:px-[2.5rem] px-[1rem] flex   items-center"
      >
        <div className="space-y-5">
          <div>
            {" "}
            <Link href="/">
              <Image
                src="/locka_files/logo.svg"
                alt="Logo"
                width={120}
                height={40}
                className="h-10"
              />
            </Link>
          </div>
          <div>
            <p className="text-sm">
              Subscribe and stay fully connected with product.s
            </p>
          </div>
          <div>
            <p>
              support@assetLocka.com
              <br />
              234-703-536-1770
            </p>
          </div>
          <div>
            <p>© 2025. All rights reserved.</p>
          </div>
          <div>
            {" "}
            <FaFacebookF className="text-blue-400 text-lg " />{" "}
          </div>
        </div>
      </div>
      <div className="lg:w-[50%] lg:px-[2.5rem] px-[1rem] lg:flex justify-center mt-5 lg:mt-0  bg-gray-100 items-center">
        <div className="lg:flex gap-14 ">
          <ul data-aos="fade-up" className="space-y-4 text-gray-400 leading-8">
            <li className="text-black font-bold text-lg">About</li>
            <li>About Us</li>
            <li>Portfolio</li>
            <li>Services</li>
            <li>Contact</li>
          </ul>
          <ul data-aos="fade-up" className="space-y-4 text-gray-400 leading-8">
            <li className="text-black font-bold text-lg">Quick Links</li>
            <li>Team</li>
            <li>Pricing</li>
            <li>Testimonials</li>
            <li>Faqs</li>
          </ul>
          <ul data-aos="fade-up" className="space-y-4 text-gray-400 leading-8 ">
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
