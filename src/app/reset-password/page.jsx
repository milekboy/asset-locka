"use client";
import Footer from "../components/Footer";
import HeadContact from "../components/HeadContact";
import Header from "../components/Header";

import { useState } from "react";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
export default function ResetPassword() {
  const [pwd, setPwd] = useState("");
  const [confirm, setConf] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO:  call /api/reset-password endpoint with token + new pwd
    console.log("new password →", pwd);
  };
  return (
    <>
      <HeadContact />
      <Header />
      <main className="min-h-screen flex items-center justify-center bg-gray-50 py-14 px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white shadow-md rounded-2xl px-8 md:px-16 py-12 space-y-8"
        >
          {/* Heading */}
          <header className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold">Reset Password</h1>
            <p className="text-gray-500 text-sm">
              Set a new password for your account
            </p>
          </header>

          {/* New password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              New password
            </label>
            <div className="relative">
              <input
                type={show1 ? "text" : "password"}
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow1(!show1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show1 ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={show2 ? "text" : "password"}
                value={confirm}
                onChange={(e) => setConf(e.target.value)}
                placeholder="Enter pass again"
                required
                className="w-full rounded-lg border border-gray-300 py-3 pl-4 pr-12
                         placeholder:text-sm focus:ring-2 focus:ring-[#489AFF] focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShow2(!show2)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {show2 ? (
                  <MdVisibilityOff size={20} />
                ) : (
                  <MdVisibility size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full cursor-pointer rounded-full bg-[#489AFF] hover:bg-[#3188e6]
                     py-3 font-semibold text-white transition"
          >
            Submit
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}
