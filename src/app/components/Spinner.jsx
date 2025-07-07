"use client";
import { FaSpinner } from "react-icons/fa";

export default function Spinner() {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="absolute flex justify-center items-center h-screen inset-0 bg-[#A4A1AA33] backdrop-blur-xs">
        <FaSpinner className="animate-spin text-blue-400 text-3xl" />
      </div>
    </div>
  );
}
