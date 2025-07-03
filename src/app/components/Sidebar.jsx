"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HiOutlineMenu,
  HiX,
  HiUserAdd,
  HiOutlinePlusCircle,
  HiOutlineSearch,
} from "react-icons/hi";

const links = [
  { href: "/dashboard/beneficiary", label: "Add Beneficiary", icon: HiUserAdd },
  {
    href: "/dashboard/assets/new",
    label: "Add Assets",
    icon: HiOutlinePlusCircle,
  },
  {
    href: "/dashboard/assets/find",
    label: "Find Assets",
    icon: HiOutlineSearch,
  },
];

export default function Sidebar({ open, setOpen }) {
  // const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed  z-40 h-full top-0  w-64 bg-white shadow-lg md:shadow-none
                    transition-transform duration-300 ease-in-out
                    ${
                      open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
      >
        {/* mobile close-bar */}
        <div className="flex items-center justify-between md:hidden p-4 mt-11">
          <span className="font-semibold text-xl">Menu</span>
          <button onClick={() => setOpen(false)}>
            <HiX className="text-2xl" />
          </button>
        </div>

        {/* nav links */}

        <Image
          src="/locka_files/logo.svg"
          alt="Logo"
          width={100}
          height={40}
          className={`h-10 w-auto px-7  lg:mt-14 ${
            scrolled ? "mt-5" : "lg:mt-14"
          }`}
        />
        <nav className="mt-4 flex flex-col gap-2 px-4">
          {links.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-md px-3 py-2
                         text-gray-600 hover:bg-blue-100 hover:text-blue-600
                         transition-colors"
            >
              <Icon className="text-xl" />
              <span className="font-medium">{label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
