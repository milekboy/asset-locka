"use client";
import { useState } from "react";
import Link from "next/link";
import {
  HiOutlineMenu,
  HiX,
  HiUserAdd,
  HiOutlinePlusCircle,
  HiOutlineSearch,
} from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";

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

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* mobile hamburger */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 text-2xl text-blue-500"
        onClick={() => setOpen(true)}
      >
        <HiOutlineMenu />
      </button>

      {/* overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed  z-40 h-full w-64 bg-white shadow-lg md:shadow-none
                    transition-transform duration-300 ease-in-out
                    ${
                      open
                        ? "translate-x-0"
                        : "-translate-x-full md:translate-x-0"
                    }`}
      >
        {/* mobile close-bar */}
        <div className="flex items-center justify-between md:hidden p-4">
          <span className="font-semibold text-xl">Menu</span>
          <button onClick={() => setOpen(false)} className="text-2xl">
            <HiX />
          </button>
        </div>

        {/* nav links */}
        <div className="flex gap-3 px-7 mt-6 ">
          <FaCircleUser className="text-4xl text-blue-400" />
          <p className="font-extrabold text-gray-500">Hi, Wahab</p>
        </div>
        <nav className="mt-2 flex flex-col gap-2 px-4">
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
