import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";
export default function DashboardHeader() {
  return (
    <header
      className="fixed top-0 left-0 md:left-[16rem] right-0 h-16
             bg-white border-b border-slate-200 z-20
             flex items-center justify-end lg:px-12 px-9"
    >
      <div className="flex gap-3 px-7  ">
        <FaCircleUser className="text-4xl text-blue-400" />
        <p className="font-extrabold text-gray-500 mt-2">Hi, Wahab</p>
      </div>
    </header>
  );
}
