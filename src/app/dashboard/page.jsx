import DashboardLayout from "../components/DashboardLayout";
import { HiOutlineTrash } from "react-icons/hi2";
import { FcDocument } from "react-icons/fc";
import { FaSearchLocation } from "react-icons/fa";
import { FaPerson } from "react-icons/fa6";

import Link from "next/link";
import { IoIosWarning } from "react-icons/io";
export default function DashboardHome() {
  const rows = [
    { property: "2016 Toyota Corolla", assigned: "Bose Tomilade" },
    { property: "2-Bedroom Flat · Lekki", assigned: "Wahab Tijani" },
    { property: "Land Plot · Abuja (400 sqm)", assigned: "Tosin Adeyemi" },
  ];

  return (
    <DashboardLayout>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-10 lg:mt-0">
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FcDocument /> <p className="font-medium">Listed Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">6</p>
            <Link
              href="/login"
              className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FaPerson className="text-blue-400" />{" "}
            <p className="font-medium">Beneficiaries</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">2</p>
            <Link
              href="/login"
              className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6  items-center  shadow-sm">
          <div className="flex gap-3">
            <FaSearchLocation className="text-blue-400 " />
            <p className="font-medium">Searched Assets</p>
          </div>

          <div className="flex gap-3">
            <p className="text-lg text-blue-400 font-semibold mt-2">1</p>
            <Link
              href="/login"
              className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
            >
              View
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm mt-16">
        <div>
          <p>
            <IoIosWarning className="text-red-500" /> Email Verification
            required
          </p>
          <p>
            Please verify your email address to access all features.{" "}
            <span className="underline cursor-pointer">
              Click here to resend verification email
            </span>
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg p-6 flex flex-col shadow-sm mt-16">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-100 text-left text-xs font-semibold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-3 px-4">Property</th>
                <th className="py-3 px-4">Assigned&nbsp;to</th>
                <th className="py-3 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {rows.map(({ property, assigned }, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4">{property}</td>
                  <td className="py-3 px-4">{assigned}</td>
                  <td className="py-3 px-4 text-center">
                    <button
                      className="text-red-500 hover:text-red-600 cursor-pointer"
                      title="Delete"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
