"use client";
import { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import Image from "next/image";
import Link from "next/link";
import { HiX, HiOutlineSearch } from "react-icons/hi";
import { FaBuilding } from "react-icons/fa";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaMedal } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
const links = [
  { href: "/dashboard", label: "Home", icon: FaHome },
  {
    href: "/my-beneficiaries",
    label: "My Beneficiaries",
    icon: FaArrowsDownToPeople,
  },
  { href: "/my-assets", label: "My Assets", icon: FaBuilding },
  {
    href: "/my-searches",
    label: "My Searches",
    icon: HiOutlineSearch,
  },
  {
    href: "/kyc-verification",
    label: "Kyc Verification",
    icon: MdOutlineVerifiedUser,
  },
];

export default function Sidebar({ open, setOpen }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed border-r-2 border-gray-200 z-40 h-full top-0 w-64 bg-white shadow-lg
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

        {/* logo */}
        <Image
          src="/locka_files/logo.svg"
          alt="Logo"
          width={100}
          height={40}
          className={`h-10 w-auto px-7 lg:mt-14 ${
            scrolled ? "mt-5" : "lg:mt-14"
          }`}
        />

        {/* nav links */}
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

        {/* bronze plan badge */}
        {user?.plan && (
          <div className="mt-6 px-4">
            <div className="flex items-center gap-2 bg-[#cd7f32]/20 p-2 rounded-md">
              <FaMedal className="text-[#cd7f32] text-xl" />
              <span className="font-semibold text-[#cd7f32] capitalize">
                {user.plan} plan
              </span>
            </div>
          </div>
        )}

        {/* logout button */}
        <div className="mt-auto px-4 pb-6">
          <button
            onClick={handleLogout}
            className="w-52 flex items-center gap-2 bottom-0 absolute mb-16 text-red-500 cursor-pointer hover:bg-red-100 px-3 py-2 rounded-md transition"
          >
            <HiOutlineLogout className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
