import DashboardLayout from "../components/DashboardLayout";
import { HiOutlineTrash } from "react-icons/hi2";
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
        <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm">
          <p className="text-lg text-blue-400 font-semibold">6</p>
          <span className="font-medium">Listed Assets</span>
          <Link
            href="/login"
            className="btn-primary  hover-up-2 ml-auto  text-center h-10 flex justify-center items-center"
          >
            View
          </Link>
        </div>
        <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm">
          <p className="text-lg text-blue-400 font-semibold">2</p>
          <span className="font-medium">Beneficiaries</span>
          <Link
            href="/login"
            className="btn-primary  hover-up-2  ml-auto text-center h-10 flex justify-center items-center"
          >
            View
          </Link>
        </div>
        <div className="bg-white rounded-lg p-6 flex items-center gap-3 shadow-sm">
          <p className="text-lg text-blue-400 font-semibold">1</p>
          <span className="font-medium">Tracked Assets</span>
          <Link
            href="/login"
            className="btn-primary  hover-up-2  ml-auto text-center h-10 flex justify-center items-center"
          >
            View
          </Link>
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
